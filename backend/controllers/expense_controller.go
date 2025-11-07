package controllers

import (
	"net/http"
	"time"

	"expense-tracker/database"
	"expense-tracker/models"

	"github.com/gin-gonic/gin"
)

func GetExpenses(c *gin.Context) {
	var expenses []models.Expense
	query := database.DB.Model(&models.Expense{})

	// Filter by category
	category := c.Query("category")
	if category != "" {
		query = query.Where("category = ?", category)
	}

	// Filter by start_date
	startDate := c.Query("start_date")
	if startDate != "" {
		start, err := time.Parse("2006-01-02", startDate)
		if err == nil {
			query = query.Where("date >= ?", start)
		}
	}

	// Filter by end_date
	endDate := c.Query("end_date")
	if endDate != "" {
		end, err := time.Parse("2006-01-02", endDate)
		if err == nil {
			// Add one day to include the entire end date
			end = end.Add(24 * time.Hour)
			query = query.Where("date < ?", end)
		}
	}

	if err := query.Order("date DESC").Find(&expenses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, expenses)
}

func GetExpense(c *gin.Context) {
	id := c.Param("id")
	var expense models.Expense

	if err := database.DB.First(&expense, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Expense not found"})
		return
	}

	c.JSON(http.StatusOK, expense)
}

func CreateExpense(c *gin.Context) {
	var expense models.Expense

	if err := c.ShouldBindJSON(&expense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&expense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, expense)
}

func UpdateExpense(c *gin.Context) {
	id := c.Param("id")
	var expense models.Expense

	if err := database.DB.First(&expense, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Expense not found"})
		return
	}

	if err := c.ShouldBindJSON(&expense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&expense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, expense)
}

func DeleteExpense(c *gin.Context) {
	id := c.Param("id")
	var expense models.Expense

	if err := database.DB.First(&expense, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Expense not found"})
		return
	}

	if err := database.DB.Delete(&expense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense deleted successfully"})
}

func GetSummary(c *gin.Context) {
	type SummaryResult struct {
		Total float64 `json:"total"`
		Count int64   `json:"count"`
	}

	var result SummaryResult
	query := database.DB.Model(&models.Expense{})

	// Filter by start_date
	startDate := c.Query("start_date")
	if startDate != "" {
		start, err := time.Parse("2006-01-02", startDate)
		if err == nil {
			query = query.Where("date >= ?", start)
		}
	}

	// Filter by end_date
	endDate := c.Query("end_date")
	if endDate != "" {
		end, err := time.Parse("2006-01-02", endDate)
		if err == nil {
			// Add one day to include the entire end date
			end = end.Add(24 * time.Hour)
			query = query.Where("date < ?", end)
		}
	}

	if err := query.Select("SUM(amount) as total, COUNT(*) as count").Scan(&result).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}


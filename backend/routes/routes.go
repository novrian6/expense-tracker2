package routes

import (
	"expense-tracker/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	// CORS middleware
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	r.Use(cors.New(config))

	// API routes
	api := r.Group("/api")
	{
		expenses := api.Group("/expenses")
		{
			expenses.GET("", controllers.GetExpenses)
			expenses.GET("/:id", controllers.GetExpense)
			expenses.POST("", controllers.CreateExpense)
			expenses.PUT("/:id", controllers.UpdateExpense)
			expenses.DELETE("/:id", controllers.DeleteExpense)
			expenses.GET("/summary", controllers.GetSummary)
		}
	}

	return r
}


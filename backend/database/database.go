package database

import (
	"expense-tracker/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDatabase() error {
	var err error
	DB, err = gorm.Open(sqlite.Open("expenses.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	// Auto migrate
	err = DB.AutoMigrate(&models.Expense{})
	if err != nil {
		return err
	}

	return nil
}


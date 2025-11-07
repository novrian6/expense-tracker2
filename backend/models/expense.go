package models

import (
	"time"

	"gorm.io/gorm"
)

type Expense struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Amount      float64   `json:"amount" gorm:"not null"`
	Description string    `json:"description" gorm:"type:text"`
	Category    string    `json:"category" gorm:"type:text;not null"`
	Date        time.Time `json:"date" gorm:"not null"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}


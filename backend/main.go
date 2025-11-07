package main

import (
	"expense-tracker/database"
	"expense-tracker/routes"
	"log"
)

func main() {
	// Initialize database
	if err := database.InitDatabase(); err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Setup routes
	r := routes.SetupRoutes()

	// Start server
	log.Println("Server starting on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}


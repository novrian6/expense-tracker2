# Backend - Expense Tracker

Backend API untuk Expense Tracker menggunakan Go, Gin, dan GORM.

## Setup

1. Pastikan Go 1.21+ sudah terinstall

2. Install dependencies:
```bash
go mod download
```

3. Run server:
```bash
go run main.go
```

Server akan berjalan di port `8080`

## Struktur Project

```
backend/
├── main.go                 # Entry point
├── models/
│   └── expense.go         # Expense model
├── controllers/
│   └── expense_controller.go  # CRUD controllers
├── database/
│   └── database.go        # Database connection & migration
└── routes/
    └── routes.go          # API routes setup
```

## API Endpoints

### Expenses

- `GET /api/expenses` - Get all expenses
  - Query params: `category`, `start_date`, `end_date`
  
- `GET /api/expenses/:id` - Get single expense

- `POST /api/expenses` - Create expense
  - Body: `{ "amount": 10000, "description": "Lunch", "category": "makanan", "date": "2024-01-15T00:00:00Z" }`

- `PUT /api/expenses/:id` - Update expense

- `DELETE /api/expenses/:id` - Delete expense

- `GET /api/expenses/summary` - Get summary
  - Query params: `start_date`, `end_date`
  - Returns: `{ "total": 100000, "count": 10 }`

## Database

SQLite database akan dibuat otomatis dengan nama `expenses.db` saat pertama kali menjalankan aplikasi.


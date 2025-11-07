# Expense Tracker

Aplikasi sederhana untuk tracking pengeluaran dengan backend Go (Gin + GORM) dan frontend Next.js (TypeScript + Tailwind CSS).

## Tech Stack

### Backend
- Go 1.21+
- Gin Web Framework
- GORM (ORM)
- SQLite Database

### Frontend
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- date-fns

## Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
go mod download
```

3. Run the server:
```bash
go run main.go
```

Server akan berjalan di `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Fitur

- ✅ CRUD expenses (Create, Read, Update, Delete)
- ✅ Kategori expense (makanan, transport, belanja, hiburan, lainnya)
- ✅ Filter berdasarkan kategori dan date range
- ✅ Summary total expenses
- ✅ Mobile responsive design
- ✅ Modern UI dengan Tailwind CSS

## API Endpoints

- `GET /api/expenses` - Get all expenses (query: ?category=&start_date=&end_date=)
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/summary` - Get summary (query: ?start_date=&end_date=)

## Database

Database SQLite akan dibuat otomatis di folder `backend` dengan nama `expenses.db` saat pertama kali menjalankan aplikasi.


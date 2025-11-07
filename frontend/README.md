# Frontend - Expense Tracker

Frontend aplikasi Expense Tracker menggunakan Next.js, TypeScript, dan Tailwind CSS.

## Setup

1. Pastikan Node.js 18+ sudah terinstall

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Environment Variables

Buat file `.env.local` jika ingin mengubah API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Default: `http://localhost:8080/api`

## Struktur Project

```
frontend/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   ├── globals.css        # Global styles
│   └── components/
│       ├── ExpenseForm.tsx      # Form untuk add/edit expense
│       ├── ExpenseList.tsx      # List semua expenses
│       ├── ExpenseItem.tsx      # Item card untuk expense
│       ├── ExpenseSummary.tsx   # Summary card
│       └── FilterBar.tsx        # Filter component
├── lib/
│   ├── api.ts            # API client functions
│   └── utils.ts          # Utility functions
└── types/
    └── expense.ts        # TypeScript types
```

## Features

- Mobile responsive design
- Dark mode support
- Real-time filtering
- Form validation
- Error handling

## Build

Untuk production build:

```bash
npm run build
npm start
```


export interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseSummary {
  total: number;
  count: number;
}

export const CATEGORIES = [
  'makanan',
  'transport',
  'belanja',
  'hiburan',
  'lainnya'
] as const;

export type Category = typeof CATEGORIES[number];


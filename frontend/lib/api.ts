import { Expense, ExpenseSummary } from '@/types/expense';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function getExpenses(filters?: {
  category?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Expense[]> {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.startDate) params.append('start_date', filters.startDate);
  if (filters?.endDate) params.append('end_date', filters.endDate);

  const url = `${API_BASE_URL}/expenses${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
  }
  
  return response.json();
}

export async function getExpense(id: number): Promise<Expense> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch expense');
  }
  
  return response.json();
}

export async function createExpense(expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>): Promise<Expense> {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create expense');
  }
  
  return response.json();
}

export async function updateExpense(id: number, expense: Partial<Expense>): Promise<Expense> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update expense');
  }
  
  return response.json();
}

export async function deleteExpense(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete expense');
  }
}

export async function getSummary(filters?: {
  startDate?: string;
  endDate?: string;
}): Promise<ExpenseSummary> {
  const params = new URLSearchParams();
  if (filters?.startDate) params.append('start_date', filters.startDate);
  if (filters?.endDate) params.append('end_date', filters.endDate);

  const url = `${API_BASE_URL}/expenses/summary${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch summary');
  }
  
  return response.json();
}


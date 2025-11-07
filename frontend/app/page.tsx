'use client';

import { useState, useEffect } from 'react';
import { Expense, ExpenseSummary } from '@/types/expense';
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} from '@/lib/api';
import ExpenseSummaryComponent from './components/ExpenseSummary';
import FilterBar from './components/FilterBar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary>({ total: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();

  // Filter states
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const filters: { category?: string; startDate?: string; endDate?: string } = {};
      if (category) filters.category = category;
      if (startDate) filters.startDate = startDate;
      if (endDate) filters.endDate = endDate;

      const [expensesData, summaryData] = await Promise.all([
        getExpenses(filters),
        getSummary({ startDate, endDate }),
      ]);

      setExpenses(expensesData);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      alert('Failed to load expenses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [category, startDate, endDate]);

  const handleCreateExpense = async (
    expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>
  ) => {
    await createExpense(expense);
    await fetchExpenses();
  };

  const handleUpdateExpense = async (
    expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>
  ) => {
    if (!editingExpense) return;
    await updateExpense(editingExpense.id, expense);
    setEditingExpense(undefined);
    await fetchExpenses();
  };

  const handleDeleteExpense = async (id: number) => {
    await deleteExpense(id);
    await fetchExpenses();
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(undefined);
  };

  const handleClearFilters = () => {
    setCategory('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Expense Tracker
        </h1>

        <ExpenseSummaryComponent summary={summary} />

        <FilterBar
          category={category}
          startDate={startDate}
          endDate={endDate}
          onCategoryChange={setCategory}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClearFilters={handleClearFilters}
        />

        {editingExpense ? (
          <ExpenseForm
            expense={editingExpense}
            onSubmit={handleUpdateExpense}
            onCancel={handleCancelEdit}
          />
        ) : (
          <ExpenseForm onSubmit={handleCreateExpense} />
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Expenses
          </h2>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            </div>
          ) : (
            <ExpenseList
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          )}
        </div>
      </div>
    </main>
  );
}


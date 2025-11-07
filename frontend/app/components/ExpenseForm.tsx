'use client';

import { useState } from 'react';
import { Expense, CATEGORIES } from '@/types/expense';

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel?: () => void;
}

export default function ExpenseForm({ expense, onSubmit, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    amount: expense?.amount.toString() || '',
    description: expense?.description || '',
    category: expense?.category || CATEGORIES[0],
    date: expense?.date ? expense.date.split('T')[0] : new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        date: new Date(formData.date).toISOString(),
      });
      
      if (!expense) {
        // Reset form if creating new expense
        setFormData({
          amount: '',
          description: '',
          category: CATEGORIES[0],
          date: new Date().toISOString().split('T')[0],
        });
      }
    } catch (error) {
      console.error('Error submitting expense:', error);
      alert('Failed to save expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        {expense ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            rows={3}
            placeholder="Enter expense description..."
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors duration-200 font-medium"
          >
            {isSubmitting ? 'Saving...' : expense ? 'Update' : 'Add Expense'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}


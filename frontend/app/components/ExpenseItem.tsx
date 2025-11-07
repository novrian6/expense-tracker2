'use client';

import { useState } from 'react';
import { Expense } from '@/types/expense';
import { formatCurrency, formatDate } from '@/lib/utils';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(expense.id);
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      makanan: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      transport: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      belanja: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      hiburan: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      lainnya: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return colors[category] || colors.lainnya;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(expense.category)}`}>
              {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {formatDate(expense.date)}
            </span>
          </div>
          {expense.description && (
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {expense.description}
            </p>
          )}
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(expense.amount)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-md transition-colors duration-200 text-sm font-medium"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}


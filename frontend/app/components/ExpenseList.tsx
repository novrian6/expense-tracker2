'use client';

import { Expense } from '@/types/expense';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No expenses found. Add your first expense above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}


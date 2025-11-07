'use client';

import { ExpenseSummary as SummaryType } from '@/types/expense';
import { formatCurrency } from '@/lib/utils';

interface ExpenseSummaryProps {
  summary: SummaryType;
}

export default function ExpenseSummary({ summary }: ExpenseSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(summary.total)}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {summary.count}
          </p>
        </div>
      </div>
    </div>
  );
}


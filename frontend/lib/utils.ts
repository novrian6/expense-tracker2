import { format, parseISO } from 'date-fns';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMM yyyy');
  } catch {
    return dateString;
  }
}


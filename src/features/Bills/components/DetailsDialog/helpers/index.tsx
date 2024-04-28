// src/helpers/index.tsx

import { Payment } from "../../../../Payments/types";


export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString();
}

export const transformPayments = (payments: Payment[] | undefined) => {
  if (!payments) return [];
  return payments.map(payment => {
    return {
      ...payment,
      date: formatDate(payment.date)
    };
  });
}

export const calculateTotalPaid = (payments: Payment[] | undefined) => {
  if (!payments) return 0;
  return payments.reduce((acc, payment) => {
    return acc + (payment.amount ?? 0);
  }, 0);
}
import { RecurringFrequency } from "../features/Bills/types/RecurringFrequency";
import { Payment } from "../features/Payments/types";

export interface Bill {
  id: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  name: string;
  category: string;
  lastPaidAt?: Date;
  payLink?: string;
  isRecurring?: boolean;
  recurringFrequency?: RecurringFrequency;
  payments?: Payment[];
}

import { Payment } from "../../Payments/types";

export interface Bill {
  _id?: string;
  name: string;
  amount: number;
  dueDate: string | Date;
  isPaid?: boolean;
  category: string;
  lastPaidAt?: Date;
  payLink?: string;
  isRecurring?: boolean;
  payments?: Payment[];
}

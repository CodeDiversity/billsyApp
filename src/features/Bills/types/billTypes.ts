export interface Bill {
  _id?: string;
  name: string;
  amount: number;
  dueDate: string;
  isPaid?: boolean;
  category: string;
  lastPaidAt?: Date;
  payLink?: string;
}

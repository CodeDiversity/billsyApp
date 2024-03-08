export interface Bill {
  name: string;
  amount: number;
  dueDate: string;
  isPaid?: boolean;
  category: string;
  lastPaidAt?: Date;
}

export interface Bill {
  name: string;
  amount: number;
  dueDate: Date;
  isPaid?: boolean;
  category: string;
  lastPaidAt?: Date;
}



export interface Payment {
  id?: string;
  userId?: string;
  bill?: string;
  amount?: number;
  date: Date | string;
  isRecurring?: boolean;
  paidAt?: Date;
  updatedAt?: Date;
  confirmationNumber?: string;
  note?: string;
}

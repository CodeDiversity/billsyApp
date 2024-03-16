

export interface Payment {
  userId?: string;
  bill?: string;
  amount?: number;
  date?: Date;
  isRecurring?: boolean;
  paidAt?: Date;
  updatedAt?: Date;
  confirmationNumber?: string;
  note?: string;
}

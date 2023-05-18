export interface Bill {
  user_id: string;
  id: string;
  type: string;
  month: string;
  payment_method: string;
  cost: Number;
  usage: Number;
  due_date: Number;
  due_amount: Number;
  status: string;
}

export interface Bill {
  bundle_id?: string;
  user_id?: string;
  month?: string;
  status?: string;
  production_date?: Date;
  Total_amount?: number;
  usage?: number;
  payment_method?: string;
  bill_type?: string;
}

export interface Order {
  id: string;

  customer_name: string;

  customer_email: string;

  customer_id: string | null;

  total: number;

  subtotal: number;

  tax: number;

  shipping: number;

  discount: number;

  status: string;

  payment_status: string;

  fulfillment_status: string;

  tracking_number: string | null;

  notes: string | null;

  stripe_payment_intent: string | null;

  created_at: string;

  updated_at: string;
}
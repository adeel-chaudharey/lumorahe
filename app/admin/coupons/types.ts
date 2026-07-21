export interface Coupon {
  id: string;

  code: string;
  description: string | null;

  discount_type: string;
  discount_value: number;

  minimum_order: number;

  maximum_discount: number | null;

  usage_limit: number | null;
  used_count: number;

  starts_at: string | null;
  expires_at: string | null;

  active: boolean;

  created_at: string;
}
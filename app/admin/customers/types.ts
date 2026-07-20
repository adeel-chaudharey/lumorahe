export interface Customer {
  id: string;

  full_name: string;

  email: string;

  phone: string | null;

  avatar_url: string | null;

  total_orders: number;

  total_spent: number;

  loyalty_points: number;

  email_verified: boolean;

  created_at: string;

  last_login: string | null;
}
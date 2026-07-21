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

  addresses: Address[];
}

export interface Address {
  id: string;
  full_name: string;
  phone: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string | null;
  postal_code: string | null;
  country: string;
  is_default: boolean;
}
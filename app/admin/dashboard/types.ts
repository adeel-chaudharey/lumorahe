export type DashboardOrder = {
  id: string;
  total: number;
  created_at: string;
  customer_name?: string | null;
  status?: string | null;
};

export type DashboardProduct = {
  id: string;
  name: string;
  price?: number | null;
  stock: number;
  image_url?: string | null;
  low_stock_alert?: number | null;
};
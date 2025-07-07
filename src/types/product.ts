
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  brand: string;
  stock_quantity: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  product_id: number;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  verified_purchase: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
  lightning_deal_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
}

export interface LightningDeal {
  id: number;
  product_id: number;
  original_price: number;
  deal_price: number;
  start_time: string;
  end_time: string;
  max_quantity: number;
  claimed_quantity: number;
  active: boolean;
  created_at: string;
}


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  image?: string; // For backward compatibility
  category: string;
  brand: string;
  stock_quantity: number;
  rating: number;
  inStock?: boolean; // Computed property
  storeAvailability?: string; // Additional property
  onlineAvailability?: string; // Additional property
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
  product?: Product; // Join with product data
  image?: string; // For cart display
  name?: string; // For cart display
  price?: number; // For cart display
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

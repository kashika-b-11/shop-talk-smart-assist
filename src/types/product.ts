
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
  rating: number;
  storeAvailability?: string;
  onlineAvailability?: string;
  description?: string;
  // Optional fields that may come from Supabase
  image_url?: string;
  brand?: string;
  stock_quantity?: number;
  created_at?: string;
  updated_at?: string;
}

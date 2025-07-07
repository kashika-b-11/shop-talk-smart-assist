
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
}

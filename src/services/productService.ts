
import { Product } from '@/types/product';

// Mock data for products with proper typing
const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Latest iPhone with titanium design and advanced camera system",
    price: 999.99,
    image_url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    category: "Electronics",
    brand: "Apple",
    stock_quantity: 50,
    rating: 4.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    inStock: true,
    storeAvailability: "Available at 5 stores nearby",
    onlineAvailability: "Ships in 1-2 days"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    description: "Flagship Android phone with AI features",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "Electronics",
    brand: "Samsung",
    stock_quantity: 30,
    rating: 4.6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    inStock: true,
    storeAvailability: "Available at 3 stores nearby",
    onlineAvailability: "Ships in 2-3 days"
  }
];

export const getAllProducts = async (): Promise<Product[]> => {
  // In a real app, this would fetch from Supabase
  return mockProducts;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return mockProducts.find(p => p.id === id) || null;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  return mockProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );
};

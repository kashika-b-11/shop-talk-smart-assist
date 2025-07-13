
import { Product } from '@/types/product';

interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface DummyJsonResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}

const mapDummyJsonToProduct = (dummyProduct: DummyJsonProduct): Product => ({
  id: dummyProduct.id,
  name: dummyProduct.title,
  category: dummyProduct.category,
  price: Math.round(dummyProduct.price * 80), // Convert to INR approximately
  image: dummyProduct.thumbnail,
  rating: Math.round(dummyProduct.rating * 10) / 10,
  inStock: dummyProduct.stock > 0,
  brand: dummyProduct.brand,
  storeAvailability: `Available at ${Math.floor(Math.random() * 25) + 5} nearby stores`,
  onlineAvailability: Math.random() > 0.5 ? 'Same-day delivery available' : 'Express delivery in 2-4 hours',
  description: dummyProduct.description,
  stock_quantity: dummyProduct.stock
});

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data: DummyJsonResponse = await response.json();
    return data.products.map(mapDummyJsonToProduct);
  } catch (error) {
    console.error('Error fetching products from DummyJSON:', error);
    return [];
  }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data: DummyJsonResponse = await response.json();
    return data.products.map(mapDummyJsonToProduct);
  } catch (error) {
    console.error('Error fetching products by category from DummyJSON:', error);
    return [];
  }
};

export const searchDummyJsonProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
    const data: DummyJsonResponse = await response.json();
    return data.products.map(mapDummyJsonToProduct);
  } catch (error) {
    console.error('Error searching products from DummyJSON:', error);
    return [];
  }
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const dummyProduct: DummyJsonProduct = await response.json();
    return mapDummyJsonToProduct(dummyProduct);
  } catch (error) {
    console.error('Error fetching product by ID from DummyJSON:', error);
    return null;
  }
};

export const getAvailableCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    const categories: string[] = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories from DummyJSON:', error);
    return [];
  }
};

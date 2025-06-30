
import { Product } from '@/types/product';

const API_BASE_URL = 'https://dummyjson.com';

const locations = [
  'MG Road Store, Bangalore',
  'Connaught Place, Delhi',
  'Marine Drive, Mumbai',
  'Park Street, Kolkata',
  'Anna Nagar, Chennai'
];

// Transform DummyJSON product to our Product type
const transformProduct = (apiProduct: any): Product => {
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.title,
    price: Math.round(apiProduct.price * 83), // Convert USD to INR approximately
    image: apiProduct.thumbnail,
    inStock: apiProduct.stock > 0,
    storeAvailability: locations[Math.floor(Math.random() * locations.length)],
    onlineAvailability: 'Delivery in 2-3 hours',
    rating: apiProduct.rating || 4.0,
    description: apiProduct.description
  };
};

export const generateRandomProducts = async (count: number = 8): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=${count}&skip=${Math.floor(Math.random() * 50)}`);
    const data = await response.json();
    return data.products.map(transformProduct);
  } catch (error) {
    console.error('Error fetching random products:', error);
    return [];
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=20`);
    const data = await response.json();
    return data.products.map(transformProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    // Map our categories to DummyJSON categories
    const categoryMap: { [key: string]: string } = {
      'Electronics': 'smartphones',
      'Fashion': 'womens-dresses',
      'Home & Kitchen': 'home-decoration',
      'Groceries': 'groceries',
      'Beauty': 'beauty',
      'Sports': 'sports-accessories',
      'Books': 'furniture', // DummyJSON doesn't have books, using furniture as fallback
      'Toys': 'furniture' // DummyJSON doesn't have toys, using furniture as fallback
    };

    const apiCategory = categoryMap[category] || 'smartphones';
    const response = await fetch(`${API_BASE_URL}/products/category/${apiCategory}`);
    const data = await response.json();
    return data.products.map(transformProduct);
  } catch (error) {
    console.error('Error fetching category products:', error);
    return [];
  }
};

// Get all available categories
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

import { Product } from '@/types/product';
import { 
  fetchAllProducts, 
  fetchProductsByCategory as fetchDummyJsonByCategory,
  searchDummyJsonProducts,
  fetchProductById as fetchDummyJsonById
} from './dummyJsonService';

// Keep the original deals data for the DealsSection
const dealsData: Product[] = [
  {
    id: 1001,
    name: "Samsung Galaxy M35 5G",
    category: "Electronics", 
    price: 18499,
    image: '/src/Assets/deals/samsungM35G.png',
    rating: 4.2,
    inStock: true,
    brand: 'Samsung',
    storeAvailability: "Available at 12 nearby stores",
    onlineAvailability: "Same-day delivery available",
    description: "Samsung Galaxy M35 5G with 8GB RAM, 128GB Storage"
  },
  {
    id: 1002,
    name: "ROG Zephyrus G14 (2025)",
    category: "Electronics",
    price: 279999,
    image: '/src/Assets/deals/ROGZeph.png',
    rating: 4.1,
    inStock: true,
    brand: 'ASUS',
    storeAvailability: "Available at 4 nearby stores",
    onlineAvailability: "Standard delivery in 2-3 days",
    description: "GA403WR- QS123WS, AMD Ryzen™ AI 9 HX 370 Processor, NVIDIA® GeForce RTX™ 5070 Ti"
  },
  {
    id: 1003,
    name: "Sony WH-1000XM6",
    category: "Electronics",
    price: 29490,
    image: '/src/Assets/deals/1000XM6.png',
    rating: 4.4,
    inStock: true,
    brand: 'Sony',
    storeAvailability: "Available at 8 nearby stores",
    onlineAvailability: "Express delivery in 2-3 hours",
    description: "Sony WH-1000XM6 Wireless Noise Canceling Headphones"
  },
  {
    id: 1004,
    name: "Apple Watch SE",
    category: "Electronics",
    price: 24999,
    image: '/src/Assets/deals/appleSE.png',
    rating: 4.5,
    inStock: true,
    brand: 'Apple',
    storeAvailability: "Available at 6 nearby stores",
    onlineAvailability: "Same-day delivery available",
    description: "Apple Watch SE (GPS, 40mm)"
  }
];

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const dummyJsonProducts = await fetchAllProducts();
    // Combine with deals data
    return [...dummyJsonProducts, ...dealsData];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return dealsData; // Fallback to deals data
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const dummyJsonProducts = await fetchDummyJsonByCategory(category.toLowerCase());
    // Filter deals by category too
    const categoryDeals = dealsData.filter(deal => 
      deal.category.toLowerCase() === category.toLowerCase()
    );
    return [...dummyJsonProducts, ...categoryDeals];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return dealsData.filter(deal => 
      deal.category.toLowerCase() === category.toLowerCase()
    );
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    if (!query || query.trim().length === 0) {
      return (await getAllProducts()).slice(0, 20);
    }

    const dummyJsonResults = await searchDummyJsonProducts(query);
    
    // Also search in deals data
    const dealsResults = dealsData.filter(product => {
      const searchText = `${product.name} ${product.category} ${product.brand || ''} ${product.description}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    return [...dummyJsonResults, ...dealsResults];
  } catch (error) {
    console.error('Error searching products:', error);
    return dealsData;
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    // Check if it's a deals product first
    const dealsProduct = dealsData.find(product => product.id === id);
    if (dealsProduct) {
      return dealsProduct;
    }

    // Otherwise fetch from DummyJSON
    return await fetchDummyJsonById(id);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const allProducts = await getAllProducts();
    return allProducts.filter(product => product.rating >= 4.0).slice(0, 8);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return dealsData.slice(0, 4);
  }
};

export const getProductsByPriceRange = async (minPrice: number, maxPrice: number): Promise<Product[]> => {
  try {
    const allProducts = await getAllProducts();
    return allProducts.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  } catch (error) {
    console.error('Error fetching products by price range:', error);
    return [];
  }
};

// Export deals data for DealsSection
export const getDealsData = (): Product[] => dealsData;

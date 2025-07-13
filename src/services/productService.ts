
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';

// Enhanced mock data with accurate product information
const mockProducts: Product[] = [
  // Electronics - Phones
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Electronics",
    price: 134900,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.8,
    brand: "Apple",
    description: "Latest iPhone with A17 Pro chip, 48MP camera system, and titanium build. Features ProRAW photography, 4K video recording, and all-day battery life.",
    storeAvailability: "Available at 12 nearby stores",
    onlineAvailability: "Free delivery in 1-2 days"
  },
  {
    id: 2,
    name: "Samsung Galaxy M35 5G",
    category: "Electronics",
    price: 19999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.3,
    brand: "Samsung",
    description: "6.6-inch Super AMOLED display, 50MP triple camera, 6000mAh battery, Exynos 1380 processor. Perfect for gaming and photography with 5G connectivity.",
    storeAvailability: "Available at 8 nearby stores",
    onlineAvailability: "Free delivery in 2-3 days"
  },
  {
    id: 3,
    name: "OnePlus Nord CE 3 Lite",
    category: "Electronics",
    price: 19999,
    image: "https://images.unsplash.com/photo-1592286002806-4f704f32bcf8?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.2,
    brand: "OnePlus",
    description: "Snapdragon 695 5G, 67W SUPERVOOC charging, 108MP triple camera. 6.72-inch 120Hz display with smooth performance for everyday use.",
    storeAvailability: "Available at 6 nearby stores",
    onlineAvailability: "Free delivery in 1-3 days"
  },
  {
    id: 4,
    name: "Redmi Note 13",
    category: "Electronics",
    price: 17999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.4,
    brand: "Xiaomi",
    description: "Snapdragon 685, 108MP camera with 3x zoom, 5000mAh battery, 33W fast charging. AMOLED display with excellent value for money.",
    storeAvailability: "Available at 15 nearby stores",
    onlineAvailability: "Free delivery in 1-2 days"
  },

  // Electronics - Laptops
  {
    id: 5,
    name: "MacBook Air M3",
    category: "Electronics",
    price: 114900,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.9,
    brand: "Apple",
    description: "13.6-inch Liquid Retina display, M3 chip, 8GB RAM, 256GB SSD. Up to 18 hours battery life, perfect for professionals and students.",
    storeAvailability: "Available at 5 nearby stores",
    onlineAvailability: "Free delivery in 2-3 days"
  },

  // Fashion - Men
  {
    id: 6,
    name: "Cotton Casual Shirt",
    category: "Fashion",
    price: 1299,
    image: "https://images.unsplash.com/photo-1602810318383-e5cd4e2c7344?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.1,
    brand: "Peter England",
    description: "100% cotton, regular fit, available in multiple colors. Perfect for casual and semi-formal occasions with easy care fabric.",
    storeAvailability: "Available at 20 nearby stores",
    onlineAvailability: "Free delivery in 2-4 days"
  },
  {
    id: 7,
    name: "Denim Jeans",
    category: "Fashion",
    price: 2499,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.3,
    brand: "Levi's",
    description: "Classic straight fit, premium denim, fade-resistant. Comfortable for all-day wear with durable construction.",
    storeAvailability: "Available at 18 nearby stores",
    onlineAvailability: "Free delivery in 3-5 days"
  },

  // Fashion - Ethnic
  {
    id: 8,
    name: "Cotton Kurta Set",
    category: "Fashion",
    price: 1899,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.4,
    brand: "Fabindia",
    description: "Handwoven cotton kurta with matching churidar, traditional Indian wear for festivals and occasions. Comfortable and elegant design.",
    storeAvailability: "Available at 10 nearby stores",
    onlineAvailability: "Free delivery in 2-3 days"
  },

  // Groceries
  {
    id: 9,
    name: "Basmati Rice 5kg",
    category: "Groceries",
    price: 649,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.6,
    brand: "India Gate",
    description: "Premium aged basmati rice, extra long grain, aromatic and fluffy when cooked. Perfect for biryanis and daily meals.",
    storeAvailability: "Available at 25 nearby stores",
    onlineAvailability: "Free delivery in 1-2 days"
  },
  {
    id: 10,
    name: "Toor Dal 1kg",
    category: "Groceries",
    price: 145,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.5,
    brand: "Fortune",
    description: "High-quality toor dal, rich in protein and nutrients. Essential for Indian cooking, cooks evenly and tastes great.",
    storeAvailability: "Available at 30 nearby stores",
    onlineAvailability: "Free delivery in 1-2 days"
  },

  // Beauty
  {
    id: 11,
    name: "Herbal Shampoo 400ml",
    category: "Beauty",
    price: 299,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    inStock: true,
    rating: 4.2,
    brand: "Himalaya",
    description: "Natural ingredients, suitable for all hair types. Strengthens hair, reduces hair fall, and adds natural shine.",
    storeAvailability: "Available at 22 nearby stores",
    onlineAvailability: "Free delivery in 2-3 days"
  }
];

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.log('Supabase error, using mock data:', error);
      return mockProducts;
    }

    if (!data || data.length === 0) {
      console.log('No data from Supabase, using mock data');
      return mockProducts;
    }

    return data.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category || 'General',
      price: Number(product.price),
      image: product.image_url || `https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop`,
      inStock: (product.stock_quantity || 0) > 0,
      rating: Number(product.rating) || 4.0,
      brand: product.brand,
      description: product.description || 'High-quality product with excellent features.',
      storeAvailability: 'Available at nearby stores',
      onlineAvailability: 'Free delivery in 2-3 days'
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return mockProducts;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const allProducts = await getAllProducts();
  const searchTerm = query.toLowerCase();

  return allProducts.filter(product => {
    const searchText = `${product.name} ${product.category} ${product.brand || ''}`.toLowerCase();
    
    // Check for direct matches
    if (searchText.includes(searchTerm)) return true;
    
    // Check individual words
    const queryWords = searchTerm.split(' ').filter(word => word.length > 2);
    return queryWords.some(word => searchText.includes(word));
  });
};

export const getProductsByCategory = async (category: string, page: number = 1, limit: number = 8): Promise<Product[]> => {
  const allProducts = await getAllProducts();
  const categoryLower = category.toLowerCase();
  
  // Handle category mappings
  const categoryMappings: { [key: string]: string } = {
    'home-and-kitchen': 'home & kitchen',
    'electronics': 'electronics',
    'fashion': 'fashion',
    'groceries': 'groceries',
    'beauty': 'beauty'
  };
  
  const targetCategory = categoryMappings[categoryLower] || categoryLower;
  
  const categoryProducts = allProducts.filter(product => 
    product.category.toLowerCase().includes(targetCategory)
  );
  
  const startIndex = (page - 1) * limit;
  return categoryProducts.slice(startIndex, startIndex + limit);
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const allProducts = await getAllProducts();
  return allProducts.find(product => product.id === id) || null;
};

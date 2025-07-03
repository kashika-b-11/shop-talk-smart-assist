import { Product } from '@/types/product';

const API_BASE_URL = 'https://dummyjson.com';

const locations = [
  'MG Road Store, Bangalore',
  'Connaught Place, Delhi',
  'Marine Drive, Mumbai',
  'Park Street, Kolkata',
  'Anna Nagar, Chennai'
];

const productImages = {
  // Electronics
  'samsung galaxy m34': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  'hp laptop 15s': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
  'sony wh-ch720n': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'bajaj ceiling fan': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  'lg refrigerator': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
  'whirlpool washing machine': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop',
  'panasonic microwave': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop',
  'voltas air cooler': 'https://images.unsplash.com/photo-1631700611307-37dbcb89ef7e?w=400&h=400&fit=crop',
  'luminous inverter': 'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=400&h=400&fit=crop',
  'boat smartwatch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  'iphone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  'redmi note': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
  'oneplus': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop',
  'laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
  'headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'fan': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  'television': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
  'smartphone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  
  // Fashion
  'cotton kurta set': 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop',
  'denim jeans': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
  'silk saree': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
  'sports shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
  'formal shirt': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
  'leather handbag': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  'ethnic dress': 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop',
  'casual sandals': 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=400&fit=crop',
  'kurta': 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop',
  'jeans': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
  'saree': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
  'shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
  'shirt': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
  'dress': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
  
  // Groceries  
  'basmati rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  'toor dal': 'https://images.unsplash.com/photo-1599909905244-b7e2c08b4135?w=400&h=400&fit=crop',
  'sunflower oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
  'garam masala': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
  'organic honey': 'https://images.unsplash.com/photo-1558642891-54be180ea339?w=400&h=400&fit=crop',
  'green tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
  'instant noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
  'whole wheat flour': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop',
  'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  'dal': 'https://images.unsplash.com/photo-1599909905244-b7e2c08b4135?w=400&h=400&fit=crop',
  'oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
  'masala': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
  'honey': 'https://images.unsplash.com/photo-1558642891-54be180ea339?w=400&h=400&fit=crop',
  'tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
  'bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
  'milk': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop'
};

// Helper function to get image for product
const getProductImage = (productName: string): string => {
  const lowerName = productName.toLowerCase();
  
  // Try exact match first
  if (productImages[lowerName]) {
    return productImages[lowerName];
  }
  
  // Try partial matches - check if any keyword from product name matches image keys
  for (const [key, image] of Object.entries(productImages)) {
    const productWords = lowerName.split(' ');
    const keyWords = key.split(' ');
    
    // Check if any word from product name matches any word in image key
    if (productWords.some(word => keyWords.includes(word)) || 
        keyWords.some(word => productWords.includes(word))) {
      return image;
    }
  }
  
  // Category-based fallback
  if (lowerName.includes('phone') || lowerName.includes('mobile') || lowerName.includes('smartphone')) {
    return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop';
  }
  if (lowerName.includes('laptop') || lowerName.includes('computer')) {
    return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop';
  }
  if (lowerName.includes('kurta') || lowerName.includes('ethnic')) {
    return 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop';
  }
  if (lowerName.includes('rice') || lowerName.includes('grain')) {
    return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop';
  }
  
  // Default fallback
  return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center';
};

// Enhanced Indian market products with diverse images
const indianMarketProducts = {
  Electronics: [
    { 
      name: 'Bajaj Ceiling Fan 1200mm', 
      price: 2499, 
      rating: 4.3, 
      description: 'High speed ceiling fan with 3 years warranty',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
    },
    { 
      name: 'Luminous Inverter 850VA', 
      price: 4999, 
      rating: 4.5, 
      description: 'Pure sine wave inverter for home backup',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop'
    },
    { 
      name: 'Symphony Air Cooler 45L', 
      price: 7999, 
      rating: 4.2, 
      description: 'Desert air cooler with honeycomb pads',
      image: 'https://images.unsplash.com/photo-1606152421802-db97b6c7bc85?w=400&h=400&fit=crop'
    },
    { 
      name: 'OnePlus Nord CE 3 Lite', 
      price: 19999, 
      rating: 4.4, 
      description: '8GB RAM, 128GB Storage, 108MP Camera',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
    },
    { 
      name: 'Mi Smart Band 7', 
      price: 2799, 
      rating: 4.3, 
      description: 'Fitness tracker with 12-day battery life',
      image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=400&h=400&fit=crop'
    },
    { 
      name: 'Prestige Induction Cooktop', 
      price: 2899, 
      rating: 4.1, 
      description: '2000W induction cooktop with preset menu',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
    },
    { 
      name: 'LG Microwave Oven 20L', 
      price: 6999, 
      rating: 4.2, 
      description: 'Solo microwave with 6 power levels',
      image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop'
    },
    { 
      name: 'Crompton Water Heater 15L', 
      price: 8999, 
      rating: 4.0, 
      description: 'Storage water heater with 5-star rating',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop'
    }
  ],
  Fashion: [
    { 
      name: 'Ethnic Cotton Kurta Set', 
      price: 1299, 
      rating: 4.3, 
      description: 'Traditional kurta with matching bottom',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400&h=400&fit=crop'
    },
    { 
      name: 'Levi\'s Mens Jeans', 
      price: 2999, 
      rating: 4.5, 
      description: 'Regular fit denim jeans',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'
    },
    { 
      name: 'Saree Silk Kanchipuram', 
      price: 4999, 
      rating: 4.6, 
      description: 'Traditional silk saree with zari work',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop'
    },
    { 
      name: 'Nike Running Shoes', 
      price: 4999, 
      rating: 4.4, 
      description: 'Lightweight running shoes for men',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
    },
    { 
      name: 'Ethnic Palazzo Set', 
      price: 899, 
      rating: 4.2, 
      description: 'Comfortable palazzo with kurti',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'
    },
    { 
      name: 'Formal Shirt Cotton', 
      price: 1499, 
      rating: 4.1, 
      description: 'Full sleeve formal shirt for office wear',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop'
    },
    { 
      name: 'Traditional Lehenga Choli', 
      price: 3999, 
      rating: 4.5, 
      description: 'Designer lehenga for festive occasions',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
    },
    { 
      name: 'Casual T-Shirt Pack of 3', 
      price: 999, 
      rating: 4.0, 
      description: 'Cotton t-shirts in assorted colors',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
    }
  ],
  Groceries: [
    { 
      name: 'Toor Dal 1kg', 
      price: 149, 
      rating: 4.4, 
      description: 'Premium quality arhar dal',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e26c?w=400&h=400&fit=crop'
    },
    { 
      name: 'Basmati Rice 5kg', 
      price: 599, 
      rating: 4.5, 
      description: 'Long grain basmati rice',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e26c?w=400&h=400&fit=crop'
    },
    { 
      name: 'MDH Garam Masala 100g', 
      price: 89, 
      rating: 4.6, 
      description: 'Authentic Indian spice blend',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop'
    },
    { 
      name: 'Amul Butter 500g', 
      price: 285, 
      rating: 4.7, 
      description: 'Fresh unsalted butter',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=400&fit=crop'
    },
    { 
      name: 'Britannia Good Day Cookies', 
      price: 45, 
      rating: 4.2, 
      description: 'Cashew and almond cookies',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop'
    },
    { 
      name: 'Maggi 2-Minute Noodles Pack', 
      price: 144, 
      rating: 4.3, 
      description: 'Pack of 12 masala noodles',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop'
    },
    { 
      name: 'Fortune Sunflower Oil 1L', 
      price: 165, 
      rating: 4.1, 
      description: 'Refined sunflower cooking oil',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop'
    },
    { 
      name: 'Tata Tea Premium 1kg', 
      price: 449, 
      rating: 4.4, 
      description: 'Strong and aromatic tea leaves',
      image: 'https://images.unsplash.com/photo-1594631661960-27d9eedd41b5?w=400&h=400&fit=crop'
    }
  ],
  Beauty: [
    { 
      name: 'Lakme Absolute Foundation', 
      price: 1299, 
      rating: 4.3, 
      description: 'Full coverage liquid foundation',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
    },
    { 
      name: 'Himalaya Neem Face Wash', 
      price: 149, 
      rating: 4.5, 
      description: 'Purifying neem face wash',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'
    },
    { 
      name: 'L\'Oreal Paris Shampoo', 
      price: 399, 
      rating: 4.2, 
      description: 'Total repair 5 shampoo 650ml',
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop'
    },
    { 
      name: 'Mamaearth Vitamin C Serum', 
      price: 599, 
      rating: 4.4, 
      description: 'Natural vitamin C face serum',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop'
    },
    { 
      name: 'Maybelline Kajal', 
      price: 199, 
      rating: 4.6, 
      description: 'Colossal kajal 24hr wear',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop'
    },
    { 
      name: 'Neutrogena Moisturizer', 
      price: 449, 
      rating: 4.3, 
      description: 'Oil-free moisture gel 50ml',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop'
    },
    { 
      name: 'Plum Body Lotion', 
      price: 349, 
      rating: 4.1, 
      description: 'Vanilla vibes body lotion',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'
    },
    { 
      name: 'Forest Essentials Face Pack', 
      price: 899, 
      rating: 4.5, 
      description: 'Ayurvedic ubtan face pack',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop'
    }
  ],
  Sports: [
    { 
      name: 'Decathlon Badminton Racket', 
      price: 1499, 
      rating: 4.3, 
      description: 'Lightweight graphite racket',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=400&fit=crop'
    },
    { 
      name: 'Nike Dri-FIT T-Shirt', 
      price: 1999, 
      rating: 4.5, 
      description: 'Moisture-wicking sports t-shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
    },
    { 
      name: 'Yonex Shuttlecock Feather', 
      price: 1299, 
      rating: 4.6, 
      description: 'Tournament grade shuttlecocks',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=400&fit=crop'
    },
    { 
      name: 'Adidas Football Size 5', 
      price: 1899, 
      rating: 4.4, 
      description: 'FIFA approved match football',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop'
    },
    { 
      name: 'Cosco Cricket Bat', 
      price: 2499, 
      rating: 4.2, 
      description: 'English willow cricket bat',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop'
    },
    { 
      name: 'Nivia Running Shoes', 
      price: 2999, 
      rating: 4.1, 
      description: 'Lightweight running shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
    },
    { 
      name: 'Gym Protein Shaker', 
      price: 299, 
      rating: 4.0, 
      description: 'BPA-free protein shaker bottle',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop'
    },
    { 
      name: 'Yoga Mat Anti-Slip', 
      price: 799, 
      rating: 4.3, 
      description: 'Premium NBR yoga mat 6mm',
      image: 'https://images.unsplash.com/photo-1506629905607-4b9f3c3a0f1d?w=400&h=400&fit=crop'
    }
  ]
};

// Transform DummyJSON product to our Product type
const transformProduct = (apiProduct: any): Product => {
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.title,
    price: Math.round(apiProduct.price * 83), // Convert USD to INR approximately
    image: getProductImage(apiProduct.title),
    inStock: apiProduct.stock > 0,
    storeAvailability: locations[Math.floor(Math.random() * locations.length)],
    onlineAvailability: 'Delivery in 2-3 hours',
    rating: apiProduct.rating || 4.0,
    description: apiProduct.description
  };
};

// Transform local product data to Product type
const transformLocalProduct = (product: any): Product => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: product.name,
    price: product.price,
    image: product.image,
    inStock: true,
    storeAvailability: locations[Math.floor(Math.random() * locations.length)],
    onlineAvailability: 'Delivery in 2-3 hours',
    rating: product.rating,
    description: product.description
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
    // First try to search in our local Indian products
    const localResults = searchLocalProducts(query);
    if (localResults.length > 0) {
      return localResults;
    }

    // Fallback to API search
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=20`);
    const data = await response.json();
    return data.products.map(transformProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

const searchLocalProducts = (query: string): Product[] => {
  const searchQuery = query.toLowerCase();
  const results: Product[] = [];

  // Search through all categories
  Object.entries(indianMarketProducts).forEach(([category, products]) => {
    products.forEach(product => {
      if (product.name.toLowerCase().includes(searchQuery) || 
          product.description.toLowerCase().includes(searchQuery)) {
        results.push(transformLocalProduct(product));
      }
    });
  });

  return results;
};

export const getProductsByCategory = async (category: string, page: number = 1, limit: number = 8): Promise<Product[]> => {
  try {
    // Map URL category to our category names
    const categoryMap: { [key: string]: string } = {
      'electronics': 'Electronics',
      'fashion': 'Fashion', 
      'groceries': 'Groceries',
      'beauty': 'Beauty',
      'sports': 'Sports'
    };
    
    const mappedCategory = categoryMap[category.toLowerCase()] || 'Electronics';
    const categoryProducts = indianMarketProducts[mappedCategory] || indianMarketProducts.Electronics;
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Create additional products if we need more for pagination
    let allProducts = [...categoryProducts];
    if (allProducts.length < endIndex) {
      // Duplicate products with slight variations for infinite scroll demo
      const duplicates = categoryProducts.map((product, index) => ({
        ...product,
        name: `${product.name} - Variant ${Math.floor(startIndex / categoryProducts.length) + 1}`,
        price: product.price + (index * 10), // Slightly vary price
      }));
      allProducts = [...allProducts, ...duplicates, ...duplicates, ...duplicates];
    }
    
    return allProducts.slice(startIndex, endIndex).map(transformLocalProduct);
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

// Get all products for infinite scroll
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    // Combine local and API products
    const allLocalProducts: Product[] = [];
    
    // Add all local Indian products
    Object.entries(indianMarketProducts).forEach(([category, products]) => {
      products.forEach(product => {
        allLocalProducts.push(transformLocalProduct(product));
      });
    });

    // Add some API products for variety
    const response = await fetch(`${API_BASE_URL}/products?limit=50`);
    const data = await response.json();
    const apiProducts = data.products.map(transformProduct);
    
    return [...allLocalProducts, ...apiProducts];
  } catch (error) {
    console.error('Error fetching all products:', error);
    // Return local products as fallback
    const allLocalProducts: Product[] = [];
    Object.entries(indianMarketProducts).forEach(([category, products]) => {
      products.forEach(product => {
        allLocalProducts.push(transformLocalProduct(product));
      });
    });
    return allLocalProducts;
  }
};

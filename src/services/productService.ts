
import { Product } from '@/types/product';

const API_BASE_URL = 'https://dummyjson.com';

const locations = [
  'MG Road Store, Bangalore',
  'Connaught Place, Delhi',
  'Marine Drive, Mumbai',
  'Park Street, Kolkata',
  'Anna Nagar, Chennai'
];

// Enhanced Indian market products
const indianMarketProducts = {
  Electronics: [
    { name: 'Bajaj Ceiling Fan 1200mm', price: 2499, rating: 4.3, description: 'High speed ceiling fan with 3 years warranty' },
    { name: 'Luminous Inverter 850VA', price: 4999, rating: 4.5, description: 'Pure sine wave inverter for home backup' },
    { name: 'Symphony Air Cooler 45L', price: 7999, rating: 4.2, description: 'Desert air cooler with honeycomb pads' },
    { name: 'OnePlus Nord CE 3 Lite', price: 19999, rating: 4.4, description: '8GB RAM, 128GB Storage, 108MP Camera' },
    { name: 'Mi Smart Band 7', price: 2799, rating: 4.3, description: 'Fitness tracker with 12-day battery life' },
    { name: 'Prestige Induction Cooktop', price: 2899, rating: 4.1, description: '2000W induction cooktop with preset menu' },
    { name: 'LG Microwave Oven 20L', price: 6999, rating: 4.2, description: 'Solo microwave with 6 power levels' },
    { name: 'Crompton Water Heater 15L', price: 8999, rating: 4.0, description: 'Storage water heater with 5-star rating' }
  ],
  Fashion: [
    { name: 'Ethnic Cotton Kurta Set', price: 1299, rating: 4.3, description: 'Traditional kurta with matching bottom' },
    { name: 'Levi\'s Mens Jeans', price: 2999, rating: 4.5, description: 'Regular fit denim jeans' },
    { name: 'Saree Silk Kanchipuram', price: 4999, rating: 4.6, description: 'Traditional silk saree with zari work' },
    { name: 'Nike Running Shoes', price: 4999, rating: 4.4, description: 'Lightweight running shoes for men' },
    { name: 'Ethnic Palazzo Set', price: 899, rating: 4.2, description: 'Comfortable palazzo with kurti' },
    { name: 'Formal Shirt Cotton', price: 1499, rating: 4.1, description: 'Full sleeve formal shirt for office wear' },
    { name: 'Traditional Lehenga Choli', price: 3999, rating: 4.5, description: 'Designer lehenga for festive occasions' },
    { name: 'Casual T-Shirt Pack of 3', price: 999, rating: 4.0, description: 'Cotton t-shirts in assorted colors' }
  ],
  Groceries: [
    { name: 'Toor Dal 1kg', price: 149, rating: 4.4, description: 'Premium quality arhar dal' },
    { name: 'Basmati Rice 5kg', price: 599, rating: 4.5, description: 'Long grain basmati rice' },
    { name: 'MDH Garam Masala 100g', price: 89, rating: 4.6, description: 'Authentic Indian spice blend' },
    { name: 'Amul Butter 500g', price: 285, rating: 4.7, description: 'Fresh unsalted butter' },
    { name: 'Britannia Good Day Cookies', price: 45, rating: 4.2, description: 'Cashew and almond cookies' },
    { name: 'Maggi 2-Minute Noodles Pack', price: 144, rating: 4.3, description: 'Pack of 12 masala noodles' },
    { name: 'Fortune Sunflower Oil 1L', price: 165, rating: 4.1, description: 'Refined sunflower cooking oil' },
    { name: 'Tata Tea Premium 1kg', price: 449, rating: 4.4, description: 'Strong and aromatic tea leaves' }
  ],
  Beauty: [
    { name: 'Lakme Absolute Foundation', price: 1299, rating: 4.3, description: 'Full coverage liquid foundation' },
    { name: 'Himalaya Neem Face Wash', price: 149, rating: 4.5, description: 'Purifying neem face wash' },
    { name: 'L\'Oreal Paris Shampoo', price: 399, rating: 4.2, description: 'Total repair 5 shampoo 650ml' },
    { name: 'Mamaearth Vitamin C Serum', price: 599, rating: 4.4, description: 'Natural vitamin C face serum' },
    { name: 'Maybelline Kajal', price: 199, rating: 4.6, description: 'Colossal kajal 24hr wear' },
    { name: 'Neutrogena Moisturizer', price: 449, rating: 4.3, description: 'Oil-free moisture gel 50ml' },
    { name: 'Plum Body Lotion', price: 349, rating: 4.1, description: 'Vanilla vibes body lotion' },
    { name: 'Forest Essentials Face Pack', price: 899, rating: 4.5, description: 'Ayurvedic ubtan face pack' }
  ],
  Sports: [
    { name: 'Decathlon Badminton Racket', price: 1499, rating: 4.3, description: 'Lightweight graphite racket' },
    { name: 'Nike Dri-FIT T-Shirt', price: 1999, rating: 4.5, description: 'Moisture-wicking sports t-shirt' },
    { name: 'Yonex Shuttlecock Feather', price: 1299, rating: 4.6, description: 'Tournament grade shuttlecocks' },
    { name: 'Adidas Football Size 5', price: 1899, rating: 4.4, description: 'FIFA approved match football' },
    { name: 'Cosco Cricket Bat', price: 2499, rating: 4.2, description: 'English willow cricket bat' },
    { name: 'Nivia Running Shoes', price: 2999, rating: 4.1, description: 'Lightweight running shoes' },
    { name: 'Gym Protein Shaker', price: 299, rating: 4.0, description: 'BPA-free protein shaker bottle' },
    { name: 'Yoga Mat Anti-Slip', price: 799, rating: 4.3, description: 'Premium NBR yoga mat 6mm' }
  ]
};

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

// Transform local product data to Product type
const transformLocalProduct = (product: any, categoryImage: string): Product => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: product.name,
    price: product.price,
    image: categoryImage,
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
  
  // Category images for local products
  const categoryImages = {
    Electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
    Fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    Groceries: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
    Beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    Sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
  };

  // Search through all categories
  Object.entries(indianMarketProducts).forEach(([category, products]) => {
    products.forEach(product => {
      if (product.name.toLowerCase().includes(searchQuery) || 
          product.description.toLowerCase().includes(searchQuery)) {
        results.push(transformLocalProduct(product, categoryImages[category as keyof typeof categoryImages]));
      }
    });
  });

  return results;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    // Check if we have local Indian products for this category
    const categoryKey = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    if (indianMarketProducts[categoryKey as keyof typeof indianMarketProducts]) {
      const categoryImage = {
        'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
        'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
        'Home & Kitchen': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
        'Groceries': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
        'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
        'Sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
      }[categoryKey] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop';

      const localProducts = indianMarketProducts[categoryKey as keyof typeof indianMarketProducts];
      return localProducts.map(product => transformLocalProduct(product, categoryImage));
    }

    // Fallback to API for other categories
    const categoryMap: { [key: string]: string } = {
      'Electronics': 'smartphones',
      'Fashion': 'womens-dresses',
      'Home & Kitchen': 'home-decoration',
      'Groceries': 'groceries',
      'Beauty': 'beauty',
      'Sports': 'sports-accessories',
      'Books': 'furniture',
      'Toys': 'furniture'
    };

    const apiCategory = categoryMap[categoryKey] || 'smartphones';
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

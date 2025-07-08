
// Enhanced placeholder image service without API dependencies
interface CategoryImageMap {
  [key: string]: string[];
}

// Multiple placeholder images for each category
const categoryImageMap: CategoryImageMap = {
  'electronics': [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop', // Electronics setup
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', // Smartphone
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', // Laptop
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', // Headphones
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', // Speaker
  ],
  'fashion': [
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop', // Fashion items
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop', // Shirt
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', // Jeans
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', // Shoes
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', // Dress
  ],
  'groceries': [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop', // Grocery items
    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=400&fit=crop', // Rice
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop', // Oil
    'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&h=400&fit=crop', // Honey
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop', // Tea
  ],
  'beauty': [
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', // Beauty products
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', // Shampoo
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop', // Lipstick
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', // Skincare
  ],
  'home & kitchen': [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', // Kitchen items
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=400&fit=crop', // Kettle
    'https://images.unsplash.com/photo-1585515656892-c6c6cd3b4b8b?w=400&h=400&fit=crop', // Appliances
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', // Home decor
  ],
  'sports': [
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop', // Sports equipment
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop', // Football
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', // Yoga mat
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop', // Basketball
  ],
  'books': [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', // Books
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', // Study books
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop', // Book stack
  ],
  'toys': [
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', // Toys
    'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=400&fit=crop', // Building blocks
    'https://images.unsplash.com/photo-1572021335469-31706a17aaeb?w=400&h=400&fit=crop', // Toy car
  ]
};

// Enhanced product-specific image mapping with more accurate matches
const productSpecificImages: { [key: string]: string } = {
  // Smartphones - iPhone variants
  'Apple iPhone 13': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
  'Apple iPhone 13 5': 'https://images.unsplash.com/photo-1632633173522-05f1b5b4d6f2?w=400&h=400&fit=crop',
  'iPhone 13': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
  'iPhone 13 Pro': 'https://images.unsplash.com/photo-1632633173522-05f1b5b4d6f2?w=400&h=400&fit=crop',
  'iPhone 12': 'https://images.unsplash.com/photo-1605236453806-b32cb923e6fc?w=400&h=400&fit=crop',
  'iPhone 14': 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=400&h=400&fit=crop',
  
  // Android phones
  'Samsung Galaxy M35 5G': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
  'OnePlus Nord CE3 Lite': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
  'OnePlus Nord CE3 Lite 3': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
  'Redmi Note 13 Pro': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  
  // Laptops
  'HP Pavilion Laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
  'Dell Inspiron 15': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
  
  // Audio devices
  'Sony WH-1000XM4 Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'JBL Flip 5 Speaker': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
  
  // Fashion
  'Cotton Casual Shirt': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
  'Denim Blue Jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
  'Running Shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
  
  // Kitchen appliances
  'Air Fryer 3L 30': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  'Air Fryer': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  'Non-Stick Cookware Set': 'https://images.unsplash.com/photo-1556909048-f4d6e1e17d84?w=400&h=400&fit=crop',
  
  // Groceries
  'Basmati Rice 5kg': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=400&fit=crop',
  'Cooking Oil 1L': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
  
  // Beauty
  'Anti-Aging Face Cream': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
  
  // Sports
  'Cricket Bat': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop',
  
  // Books
  'Programming Book': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
  
  // Toys
  'LEGO Building Set': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
};

// Enhanced keyword matching for better image selection
const getImageByKeywords = (productName: string): string | null => {
  const name = productName.toLowerCase();
  
  // iPhone variants
  if (name.includes('iphone')) {
    if (name.includes('13')) return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop';
    if (name.includes('12')) return 'https://images.unsplash.com/photo-1605236453806-b32cb923e6fc?w=400&h=400&fit=crop';
    if (name.includes('14')) return 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=400&h=400&fit=crop';
    return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop'; // Default iPhone
  }
  
  // Android phones
  if (name.includes('samsung') || name.includes('galaxy')) {
    return 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop';
  }
  if (name.includes('oneplus') || name.includes('nord')) {
    return 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop';
  }
  if (name.includes('redmi') || name.includes('xiaomi')) {
    return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop';
  }
  
  // Kitchen appliances
  if (name.includes('air fryer')) {
    return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop';
  }
  
  // Laptops
  if (name.includes('laptop') || name.includes('hp') || name.includes('dell')) {
    return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop';
  }
  
  // Audio devices
  if (name.includes('headphone') || name.includes('sony')) {
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
  }
  if (name.includes('speaker') || name.includes('jbl')) {
    return 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop';
  }
  
  return null;
};

// Hash function to create deterministic selection
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

export const fetchProductImage = async (
  productName: string,
  category?: string
): Promise<string> => {
  // Check for exact product-specific images first
  if (productSpecificImages[productName]) {
    return productSpecificImages[productName];
  }

  // Try keyword matching for better product-specific images
  const keywordImage = getImageByKeywords(productName);
  if (keywordImage) {
    return keywordImage;
  }

  // Use category-based selection
  const categoryKey = category?.toLowerCase() || 'electronics';
  const categoryImages = categoryImageMap[categoryKey] || categoryImageMap['electronics'];
  
  // Use product name hash to deterministically select an image
  const hash = hashString(productName);
  const imageIndex = hash % categoryImages.length;
  
  return categoryImages[imageIndex];
};

// Get a category-based fallback image
export const getCategoryFallbackImage = (category: string): string => {
  const categoryKey = category.toLowerCase();
  const categoryImages = categoryImageMap[categoryKey] || categoryImageMap['electronics'];
  return categoryImages[0]; // Return first image as fallback
};


import { Product } from '@/types/product';

const productCategories = {
  groceries: [
    'Basmati Rice', 'Wheat Flour (Atta)', 'Toor Dal', 'Chana Dal', 'Rajma',
    'Coconut Oil', 'Mustard Oil', 'Ghee', 'Paneer', 'Curd',
    'Onions', 'Tomatoes', 'Potatoes', 'Ginger', 'Chilies',
    'Turmeric Powder', 'Red Chili Powder', 'Garam Masala', 'Cumin Seeds', 'Coriander Seeds'
  ],
  snacks: [
    'Parle-G Biscuits', 'Maggi Noodles', 'Lays Chips', 'Haldiram\'s Namkeen', 'Britannia Cookies',
    'Amul Butter', 'Dairy Milk Chocolate', 'Kurkure', 'Hide & Seek Biscuits', 'Good Day Cookies'
  ],
  beverages: [
    'Tata Tea', 'Red Label Tea', 'Nescafe Coffee', 'Coca Cola', 'Pepsi',
    'Frooti Mango Drink', 'Real Fruit Juice', 'Bisleri Water', 'Kinley Water', 'Sprite'
  ],
  personal_care: [
    'Colgate Toothpaste', 'Pepsodent Toothbrush', 'Head & Shoulders Shampoo', 'Dove Soap', 'Dettol Soap',
    'Fair & Lovely Cream', 'Vaseline Petroleum Jelly', 'Parachute Coconut Oil', 'Vicks VapoRub', 'Dettol Handwash'
  ],
  household: [
    'Surf Excel Detergent', 'Ariel Washing Powder', 'Vim Dishwash', 'Harpic Toilet Cleaner', 'Colin Glass Cleaner',
    'All Out Mosquito Killer', 'Hit Spray', 'Scotch Brite Scrubber', 'Lizol Floor Cleaner', 'Comfort Fabric Softener'
  ]
};

const getRandomPrice = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomRating = () => {
  return +(Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
};

const generateProductImage = (category: string) => {
  const imageMap: { [key: string]: string } = {
    groceries: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center',
    snacks: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop&crop=center',
    beverages: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&crop=center',
    personal_care: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
    household: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center'
  };
  return imageMap[category] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center';
};

export const generateRandomProducts = (count: number = 6): Product[] => {
  const allCategories = Object.keys(productCategories);
  const products: Product[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)] as keyof typeof productCategories;
    const categoryProducts = productCategories[randomCategory];
    const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
    
    const isInStock = Math.random() > 0.2; // 80% chance of being in stock
    
    products.push({
      id: `product-${Date.now()}-${i}`,
      name: randomProduct,
      price: getRandomPrice(50, 500),
      image: generateProductImage(randomCategory),
      inStock: isInStock,
      storeAvailability: isInStock ? `In Stock - Aisle ${String.fromCharCode(65 + Math.floor(Math.random() * 10))}${Math.floor(Math.random() * 20) + 1}` : 'Out of Stock',
      onlineAvailability: Math.random() > 0.3 ? 'Available for Delivery' : 'Available for Pickup',
      rating: getRandomRating(),
      description: `High quality ${randomProduct.toLowerCase()} at best prices`
    });
  }
  
  return products;
};

export const searchProducts = (query: string): Product[] => {
  const searchTerms = query.toLowerCase().split(' ');
  const allProducts = Object.values(productCategories).flat();
  
  const matchingProducts = allProducts.filter(product => 
    searchTerms.some(term => product.toLowerCase().includes(term))
  );
  
  if (matchingProducts.length === 0) {
    return generateRandomProducts(6);
  }
  
  return matchingProducts.slice(0, 6).map((productName, index) => {
    const categoryKey = Object.keys(productCategories).find(key => 
      productCategories[key as keyof typeof productCategories].includes(productName)
    ) as keyof typeof productCategories;
    
    const isInStock = Math.random() > 0.2;
    
    return {
      id: `search-${Date.now()}-${index}`,
      name: productName,
      price: getRandomPrice(50, 500),
      image: generateProductImage(categoryKey),
      inStock: isInStock,
      storeAvailability: isInStock ? `In Stock - Aisle ${String.fromCharCode(65 + Math.floor(Math.random() * 10))}${Math.floor(Math.random() * 20) + 1}` : 'Out of Stock',
      onlineAvailability: Math.random() > 0.3 ? 'Available for Delivery' : 'Available for Pickup',
      rating: getRandomRating(),
      description: `High quality ${productName.toLowerCase()} at best prices`
    };
  });
};

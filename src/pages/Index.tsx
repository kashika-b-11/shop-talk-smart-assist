
import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import ProductGrid from '@/components/ProductGrid';
import VoiceInput from '@/components/VoiceInput';
import Header from '@/components/Header';
import { Product } from '@/types/product';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    console.log('Searching for:', query);
    
    // Simulate product search with mock data
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Sweet Baby Ray\'s Barbecue Sauce',
          price: 206, // Converted to Rupees (2.48 * 83)
          image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop',
          inStock: true,
          storeAvailability: 'In Stock - Aisle A12',
          onlineAvailability: 'Available for Pickup',
          rating: 4.5,
          description: 'Original barbecue sauce with sweet and tangy flavor'
        },
        {
          id: '2',
          name: 'Wonder Bread Hamburger Buns',
          price: 164, // Converted to Rupees (1.98 * 83)
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
          inStock: true,
          storeAvailability: 'In Stock - Bakery Section',
          onlineAvailability: 'Available for Delivery',
          rating: 4.2,
          description: 'Soft hamburger buns, pack of 8'
        },
        {
          id: '3',
          name: 'Heinz Ketchup',
          price: 269, // Converted to Rupees (3.24 * 83)
          image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop',
          inStock: false,
          storeAvailability: 'Out of Stock',
          onlineAvailability: 'Available for Shipping',
          rating: 4.7,
          description: 'Classic tomato ketchup, 32oz bottle'
        }
      ];
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Shop Smart with Voice & Chat
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find, compare, and buy products instantly using natural conversation. 
              Ask me anything like "I need barbecue sauce and buns for tonight's cookout"
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ChatInterface onSearch={handleSearch} isLoading={isLoading} />
              <VoiceInput onVoiceInput={handleSearch} />
            </div>
            
            <div>
              <ProductGrid products={products} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

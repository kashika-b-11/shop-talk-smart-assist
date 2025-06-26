
import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import ProductGrid from '@/components/ProductGrid';
import VoiceInput from '@/components/VoiceInput';
import Header from '@/components/Header';
import AIFeatures from '@/components/AIFeatures';
import { Product } from '@/types/product';
import { generateRandomProducts, searchProducts } from '@/services/productService';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate initial random products
  useEffect(() => {
    setProducts(generateRandomProducts(6));
  }, []);

  // Refresh products periodically to show different items
  useEffect(() => {
    const interval = setInterval(() => {
      if (products.length > 0) {
        setProducts(generateRandomProducts(6));
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [products.length]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    console.log('Searching for:', query);
    
    // Simulate search delay
    setTimeout(() => {
      const searchResults = searchProducts(query);
      setProducts(searchResults);
      setIsLoading(false);
    }, 1500);
  };

  const handleRefreshProducts = () => {
    setProducts(generateRandomProducts(6));
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
              Ask me anything like "I need ingredients for Indian dinner tonight"
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ChatInterface onSearch={handleSearch} isLoading={isLoading} />
              <VoiceInput onVoiceInput={handleSearch} />
            </div>
            
            <div>
              <ProductGrid 
                products={products} 
                isLoading={isLoading}
                onRefresh={handleRefreshProducts}
              />
            </div>
          </div>

          <AIFeatures />
        </div>
      </div>
    </div>
  );
};

export default Index;

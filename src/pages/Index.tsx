
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Truck, ShieldCheck } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import ProductGrid from '@/components/ProductGrid';
import VoiceInput from '@/components/VoiceInput';
import Header from '@/components/Header';
import AIFeatures from '@/components/AIFeatures';
import HeroBanner from '@/components/HeroBanner';
import CategoryGrid from '@/components/CategoryGrid';
import DealsSection from '@/components/DealsSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/product';
import { generateRandomProducts, searchProducts, getProductsByCategory } from '@/services/productService';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial random products
  useEffect(() => {
    const loadInitialProducts = async () => {
      setIsLoading(true);
      try {
        const initialProducts = await generateRandomProducts(8);
        setProducts(initialProducts);
      } catch (error) {
        console.error('Error loading initial products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialProducts();
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    console.log('Searching for:', query);
    
    try {
      const searchResults = await searchProducts(query);
      setProducts(searchResults);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = async (category: string) => {
    setIsLoading(true);
    setSearchQuery(`${category} products`);
    console.log('Category selected:', category);
    
    try {
      const categoryProducts = await getProductsByCategory(category);
      setProducts(categoryProducts);
    } catch (error) {
      console.error('Error loading category products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshProducts = async () => {
    setIsLoading(true);
    try {
      const refreshedProducts = await generateRandomProducts(8);
      setProducts(refreshedProducts);
    } catch (error) {
      console.error('Error refreshing products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Banner Section */}
      <HeroBanner />
      
      {/* Quick Actions Bar */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-4 h-4 text-[#0071CE]" />
                <span>Free Delivery on orders above ₹499</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Easy Returns & Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Shopping Assistant Section */}
          <Card className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your AI Shopping Assistant
              </h2>
              <p className="text-gray-600">
                Chat or use voice to find exactly what you need. Try: "I need a smartphone under 30000"
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChatInterface onSearch={handleSearch} isLoading={isLoading} />
              </div>
              <div className="lg:col-span-1">
                <VoiceInput onVoiceInput={handleSearch} />
              </div>
            </div>
          </Card>

          {/* Categories Section */}
          <CategoryGrid onCategorySelect={handleCategorySelect} />

          {/* Deals Section */}
          <DealsSection />

          {/* Search Results */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Results for "${searchQuery}"` : 'Featured Products'}
              </h2>
              {!isLoading && (
                <span className="text-sm text-gray-600">
                  {products.length > 0 ? `Found ${products.length} products` : 'No products found'}
                </span>
              )}
            </div>
            <ProductGrid 
              products={products} 
              isLoading={isLoading}
              onRefresh={handleRefreshProducts}
              gridLayout="compact"
            />
          </div>

          {/* AI Features */}
          <AIFeatures />
        </div>
      </div>
    </div>
  );
};

export default Index;

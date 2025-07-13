
import { ChevronLeft, ChevronRight, Star, Truck, ShieldCheck } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import VoiceInput from '@/components/VoiceInput';
import Header from '@/components/Header';
import AIFeatures from '@/components/AIFeatures';
import HeroBanner from '@/components/HeroBanner';
import CategoryGrid from '@/components/CategoryGrid';
import DealsSection from '@/components/DealsSection';
import InfiniteProductGrid from '@/components/InfiniteProductGrid';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getAllProducts } from '@/services/productService';

const Index = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const handleSearch = async (query: string) => {
    console.log('Searching for:', query);
    // Don't navigate, let the chat interface handle the search
  };

  // Load initial 50+ products
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getAllProducts();
        setFeaturedProducts(products.slice(0, 50)); // Initial 50 products
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  // Load more products for infinite scroll (20 at a time)
  const loadMoreProducts = async (page: number): Promise<Product[]> => {
    try {
      const allProducts = await getAllProducts();
      const startIndex = (page - 1) * 20;
      const endIndex = startIndex + 20;
      return allProducts.slice(startIndex, endIndex);
    } catch (error) {
      console.error('Error loading more products:', error);
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Services Bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Truck className="w-5 h-5 text-[#0071CE]" />
              <span>Free Delivery on orders above ₹499</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span>Easy Returns & Exchange</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* AI Assistant Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#0071CE] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">AI</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Walmart AI Assistant</h2>
                    <p className="text-gray-600">Ask me anything about products, get recommendations, and more!</p>
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <ChatInterface onSearch={handleSearch} isLoading={false} />
                <VoiceInput onVoiceInput={handleSearch} />
              </div>
            </div>

            <CategoryGrid />
            <DealsSection />
            
            {/* Featured Products */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <div className="flex space-x-2">
                  <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              
              <InfiniteProductGrid
                initialProducts={featuredProducts}
                loadMoreProducts={loadMoreProducts}
                hasMore={true}
                gridLayout="large"
              />
            </div>
            
            <AIFeatures />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

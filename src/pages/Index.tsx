
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
    const searchQuery = encodeURIComponent(query);
    navigate(`/search?q=${searchQuery}`);
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
      
      {/* Hero Section with gradient background like Walmart */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  SALE
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Smart Shopping<br />
                  <span className="text-yellow-300">Assistant</span>
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  Limited time offer - AI-powered shopping experience
                </p>
                <div className="text-2xl font-bold">
                  From <span className="text-yellow-300">₹1,34,900</span>
                  <span className="text-lg text-blue-200 line-through ml-3">₹1,59,900</span>
                </div>
              </div>

              {/* AI Assistant Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#0071CE] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Walmart AI Assistant</h3>
                      <p className="text-sm text-gray-600">Online now</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm">
                    Hello! I'm your Walmart shopping assistant. I can help you find products, manage your cart, and answer questions. Try asking me anything!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ChatInterface onSearch={handleSearch} isLoading={false} compact={true} />
                  <VoiceInput onVoiceInput={handleSearch} compact={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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


import { ChevronLeft, ChevronRight, Star, Truck, ShieldCheck } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import VoiceInput from '@/components/VoiceInput';
import Header from '@/components/Header';
import AIFeatures from '@/components/AIFeatures';
import HeroBanner from '@/components/HeroBanner';
import CategoryGrid from '@/components/CategoryGrid';
import DealsSection from '@/components/DealsSection';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    console.log('Searching for:', query);
    const searchQuery = encodeURIComponent(query);
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <HeroBanner />
      
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
          
          <Card className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50" data-chat-interface>
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
                <ChatInterface onSearch={handleSearch} isLoading={false} />
              </div>
              <div className="lg:col-span-1">
                <VoiceInput onVoiceInput={handleSearch} />
              </div>
            </div>
          </Card>

          <CategoryGrid />
          <DealsSection />
          <AIFeatures />
        </div>
      </div>
    </div>
  );
};

export default Index;

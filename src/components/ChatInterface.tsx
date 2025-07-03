
import { useState } from 'react';
import { Send, MessageCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { shopTalkService } from '@/services/shoptalkService';
import { useNavigate } from 'react-router-dom';
import ProductCards from './ProductCards';
import { Product } from '@/types/product';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  products?: Product[];
}

interface ChatInterfaceProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const ChatInterface = ({ onSearch, isLoading }: ChatInterfaceProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm ShopTalk, your AI shopping assistant. 🛒\n\nI can help you:\n• Find products: 'Find iPhone under 30000' or 'Show me kurtas'\n• Add to cart: 'Add rice to cart'\n• Check cart: 'Show my cart'\n• Complete orders: 'Checkout'\n\nI understand both text and voice commands! What are you looking for today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Process message with ShopTalk service
      const result = await shopTalkService.processMessage(inputValue);
      
      // Handle navigation if needed
      if (result.shouldNavigate && result.navigationPath) {
        navigate(result.navigationPath);
      } else if (result.type === 'search' && result.products) {
        onSearch(inputValue);
      }

      // Add assistant response with voice-like confirmation
      setTimeout(() => {
        let responseText = result.response;
        
        // Add voice-like confirmation for voice queries
        if (inputValue.toLowerCase().includes('find') || inputValue.toLowerCase().includes('search')) {
          responseText = `🎯 ${responseText}`;
        }

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: new Date(),
          products: result.products
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsProcessing(false);
      }, 800);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble processing your request right now. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsProcessing(false);
    }

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-96 flex flex-col">
      <div className="p-4 border-b bg-[#0071CE] text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <ShoppingCart size={20} />
          <h3 className="font-semibold">ShopTalk Assistant</h3>
          <div className="ml-auto">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="space-y-3">
            <div
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-[#0071CE] text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            {/* Display products if available */}
            {!message.isUser && message.products && message.products.length > 0 && (
              <div className="ml-2">
                <ProductCards products={message.products.slice(0, 6)} layout="list" />
                {message.products.length > 6 && (
                  <p className="text-xs text-gray-500 mt-2 ml-2">
                    Showing first 6 results. Search for more specific terms for better results.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
        {(isLoading || isProcessing) && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Try: 'Find Redmi Note 13 under 15k' or 'Show me ethnic kurtas'"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!inputValue.trim() || isLoading || isProcessing}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;

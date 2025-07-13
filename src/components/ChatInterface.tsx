
import { useState } from 'react';
import { Send, MessageCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { shopTalkService } from '@/services/shoptalkService';
import { useNavigate } from 'react-router-dom';
import ProductCards from './ProductCards';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

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
  const { items: cartItems, getTotalItems, getTotalPrice } = useCart();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm ShopTalk, your AI shopping assistant. 🛒\n\nI can help you:\n• Find products: 'Find diabetic snacks under ₹500' or 'Show me wheelchairs'\n• Manage cart: 'Add rice to cart' or 'Remove iPhone from cart'\n• Cart info: 'Show my cart' or 'What's in my cart?'\n• Product questions: 'Is this wheelchair covered by insurance?'\n\nI understand both text and voice commands! What are you looking for today?",
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
      // Handle cart-specific queries
      if (inputValue.toLowerCase().includes('show cart') || 
          inputValue.toLowerCase().includes('my cart') ||
          inputValue.toLowerCase().includes('cart items')) {
        
        let cartResponse = '';
        if (cartItems.length === 0) {
          cartResponse = "🛒 Your cart is empty. Browse products and add items to get started! Try searching for items like 'Find iPhone' or 'Show me rice options'.";
        } else {
          const cartSummary = cartItems.map((item, index) => 
            `${index + 1}. ${item.name} - ₹${item.price.toLocaleString()} x ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
          ).join('\n');
          
          cartResponse = `🛒 Your Cart (${getTotalItems()} items):\n\n${cartSummary}\n\n💰 Total: ₹${getTotalPrice().toLocaleString()}\n\nSay "checkout" to proceed to payment or ask me to remove specific items.`;
        }

        setTimeout(() => {
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: cartResponse,
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsProcessing(false);
        }, 500);
        
        setInputValue('');
        return;
      }

      // Handle product questions
      if (inputValue.toLowerCase().includes('insurance') || 
          inputValue.toLowerCase().includes('warranty') ||
          inputValue.toLowerCase().includes('return policy') ||
          inputValue.toLowerCase().includes('shipping')) {
        
        let questionResponse = '';
        if (inputValue.toLowerCase().includes('insurance')) {
          questionResponse = "Medical equipment like wheelchairs may be covered by insurance depending on your policy. I recommend:\n• Check with your insurance provider\n• Get a prescription from your doctor\n• Look for products marked as 'Insurance Eligible'\n• Contact our customer service for assistance with insurance claims.";
        } else if (inputValue.toLowerCase().includes('warranty')) {
          questionResponse = "Most products come with manufacturer warranty:\n• Electronics: 1-2 years\n• Appliances: 1-5 years depending on brand\n• Fashion items: 30-day exchange\n• Check individual product pages for specific warranty details.";
        } else if (inputValue.toLowerCase().includes('return')) {
          questionResponse = "Our return policy:\n• 30-day return window\n• Products must be unused and in original packaging\n• Free returns for orders above ₹499\n• Refund processed within 5-7 business days.";
        } else if (inputValue.toLowerCase().includes('shipping')) {
          questionResponse = "Shipping information:\n• Free delivery on orders above ₹499\n• Standard delivery: 2-5 business days\n• Express delivery: 1-2 business days (additional charges)\n• Same-day delivery available in select cities.";
        }

        setTimeout(() => {
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: questionResponse,
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsProcessing(false);
        }, 800);
        
        setInputValue('');
        return;
      }

      // Use the existing shopTalkService for other queries
      const result = await shopTalkService.processMessage(inputValue);
      
      if (result.shouldNavigate && result.navigationPath) {
        navigate(result.navigationPath);
      } else if (result.type === 'search' && result.products && result.products.length > 0) {
        onSearch(inputValue);
      }

      setTimeout(() => {
        let responseText = result.response;
        
        if (inputValue.toLowerCase().includes('find') || inputValue.toLowerCase().includes('search')) {
          responseText = `🎯 ${responseText}`;
        }

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: new Date(),
          products: result.products && result.products.length > 0 ? result.products : undefined
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsProcessing(false);
      }, 800);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble processing your request right now. Please try again with a different search term or question.",
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
            placeholder="Try: 'Find diabetic snacks under ₹500' or 'Show my cart'"
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

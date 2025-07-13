import { useState } from 'react';
import { Send, MessageCircle, ShoppingCart, GitCompare } from 'lucide-react';
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
  type?: 'product_info' | 'comparison' | 'general' | 'cart';
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
      text: "Hi! I'm your Walmart Shopping Assistant! 🛒✨\n\nI can help you with:\n🔍 Product Search: 'Find diabetic snacks under ₹500'\n🛒 Cart Management: 'Add rice to cart' or 'Remove iPhone'\n📊 Product Comparison: 'Compare iPhone 13 vs Samsung Galaxy'\n💡 Product Questions: 'What are the specifications of OnePlus Nord?'\n📦 Order Info: 'Track my order' or 'Return policy'\n💰 Deals & Offers: 'Show me today's deals'\n🚚 Delivery Info: 'Delivery options to my area'\n\nWhat would you like to know today?",
      isUser: false,
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getEnhancedProductResponse = (query: string, products: Product[]) => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('specification') || queryLower.includes('features') || queryLower.includes('details')) {
      return `📱 Here are the detailed specifications and features for your search:\n\n✅ Found ${products.length} products matching your criteria`;
    }
    
    if (queryLower.includes('compare')) {
      return `🔍 Product Comparison Results:\n\nI found ${products.length} products for comparison. You can compare features, prices, and specifications side by side.`;
    }
    
    if (queryLower.includes('deal') || queryLower.includes('offer') || queryLower.includes('discount')) {
      return `🎯 Special Deals & Offers Found:\n\n💰 ${products.length} products with great discounts available!`;
    }
    
    return `🎯 Search Results:\n\nFound ${products.length} relevant products matching "${query}". All items include detailed descriptions, accurate images, and current pricing.`;
  };

  const handleAdvancedQueries = (query: string): string | null => {
    const queryLower = query.toLowerCase();
    
    // Product specification queries
    if (queryLower.includes('specification') || queryLower.includes('specs') || queryLower.includes('features')) {
      if (queryLower.includes('iphone') || queryLower.includes('phone')) {
        return "📱 iPhone Specifications:\n• Display: 6.1-inch Liquid Retina\n• Chip: A15 Bionic\n• Camera: 12MP dual system\n• Battery: All-day battery life\n• Storage: 128GB, 256GB, 512GB\n• Colors: Multiple options available\n• Water resistance: IP68\n• 5G connectivity enabled";
      }
      
      if (queryLower.includes('laptop') || queryLower.includes('computer')) {
        return "💻 Laptop Specifications:\n• Processor: Intel Core i5/i7 or AMD Ryzen\n• RAM: 8GB-32GB options\n• Storage: SSD 256GB-1TB\n• Display: 13-17 inch options\n• Graphics: Integrated or dedicated\n• Battery: 6-12 hours\n• Ports: USB-C, USB-A, HDMI\n• Operating System: Windows 11 or macOS";
      }
    }
    
    // Comparison queries
    if (queryLower.includes('compare') || queryLower.includes('vs') || queryLower.includes('difference')) {
      return "🔍 Product Comparison Guide:\n\n✅ I can help you compare:\n• Price differences across brands\n• Feature specifications\n• Customer ratings & reviews\n• Warranty & support options\n• Delivery timeframes\n• Return policies\n\n💡 Try: 'Compare iPhone 13 vs Samsung Galaxy' or 'OnePlus vs Redmi phones'";
    }
    
    // Delivery and shipping queries
    if (queryLower.includes('delivery') || queryLower.includes('shipping') || queryLower.includes('when will')) {
      return "🚚 Delivery Information:\n\n📦 Standard Delivery: 2-5 business days\n⚡ Express Delivery: 1-2 business days\n🏃 Same-day: Available in select metro cities\n💸 Free delivery on orders ₹499+\n📍 Delivery available across India\n📞 Real-time tracking provided\n\n🕐 Order before 6 PM for next-day delivery (express)";
    }
    
    // Return and warranty queries
    if (queryLower.includes('return') || queryLower.includes('exchange') || queryLower.includes('warranty')) {
      return "🔄 Return & Warranty Policy:\n\n↩️ Easy Returns:\n• 30-day return window\n• No questions asked policy\n• Free pickup from your location\n• Instant refund processing\n\n🛡️ Warranty Coverage:\n• Electronics: 1-2 years manufacturer warranty\n• Appliances: 1-5 years based on product\n• Fashion: 30-day exchange\n• Extended warranty options available";
    }
    
    // Payment and offers
    if (queryLower.includes('payment') || queryLower.includes('offers') || queryLower.includes('cashback')) {
      return "💳 Payment & Offers:\n\n💰 Payment Options:\n• Credit/Debit Cards\n• UPI (PhonePe, GPay, Paytm)\n• Net Banking\n• Cash on Delivery\n• EMI options available\n\n🎁 Current Offers:\n• 10% cashback on HDFC cards\n• No-cost EMI on orders ₹10,000+\n• Extra 5% off on app purchases\n• Buy 2 Get 1 offers on select items";
    }
    
    // Insurance and coverage
    if (queryLower.includes('insurance') || queryLower.includes('cover')) {
      return "🛡️ Insurance & Protection:\n\n📱 Device Protection:\n• Accidental damage coverage\n• Liquid damage protection\n• Theft protection available\n• Extended warranty plans\n\n🏥 Health Products:\n• Many items eligible for insurance claims\n• HSA/FSA accepted for medical equipment\n• Prescription required for certain items\n• Consult your insurance provider for coverage details";
    }
    
    return null;
  };

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
      // Check for advanced queries first
      const advancedResponse = handleAdvancedQueries(inputValue);
      if (advancedResponse) {
        setTimeout(() => {
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: advancedResponse,
            isUser: false,
            timestamp: new Date(),
            type: 'general'
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsProcessing(false);
        }, 800);
        setInputValue('');
        return;
      }

      // Handle cart queries
      if (inputValue.toLowerCase().includes('show cart') || 
          inputValue.toLowerCase().includes('my cart') ||
          inputValue.toLowerCase().includes('cart items')) {
        
        let cartResponse = '';
        if (cartItems.length === 0) {
          cartResponse = "🛒 Your cart is empty.\n\n💡 Start shopping by searching for items like:\n• 'Find iPhone under ₹30000'\n• 'Show me rice options'\n• 'Latest deals on electronics'\n\n🎯 I can help you find exactly what you need!";
        } else {
          const cartSummary = cartItems.map((item, index) => 
            `${index + 1}. ${item.name}\n   ₹${item.price.toLocaleString()} x ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
          ).join('\n\n');
          
          cartResponse = `🛒 Your Shopping Cart (${getTotalItems()} items):\n\n${cartSummary}\n\n💰 Total Amount: ₹${getTotalPrice().toLocaleString()}\n\n✅ Ready to checkout? Say "proceed to checkout"\n🔄 Want to modify? Say "remove [item name]"`;
        }

        setTimeout(() => {
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: cartResponse,
            isUser: false,
            timestamp: new Date(),
            type: 'cart'
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsProcessing(false);
        }, 500);
        
        setInputValue('');
        return;
      }

      // Use existing shopTalkService for other queries
      const result = await shopTalkService.processMessage(inputValue);
      
      if (result.shouldNavigate && result.navigationPath) {
        navigate(result.navigationPath);
      } else if (result.type === 'search' && result.products && result.products.length > 0) {
        onSearch(inputValue);
      }

      setTimeout(() => {
        let responseText = result.response;
        let messageType: ChatMessage['type'] = 'general';
        
        if (result.products && result.products.length > 0) {
          responseText = getEnhancedProductResponse(inputValue, result.products);
          messageType = inputValue.toLowerCase().includes('compare') ? 'comparison' : 'product_info';
        }

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: new Date(),
          products: result.products && result.products.length > 0 ? result.products : undefined,
          type: messageType
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsProcessing(false);
      }, 800);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request right now. Please try again or rephrase your question. I'm here to help with:\n\n• Product searches\n• Cart management\n• Product comparisons\n• Specifications & details\n• Delivery information\n• Return policies",
        isUser: false,
        timestamp: new Date(),
        type: 'general'
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
          <h3 className="font-semibold">Walmart Shopping Assistant</h3>
          <div className="ml-auto flex items-center space-x-2">
            <GitCompare size={16} />
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
                    Showing first 6 results. Ask for more specific terms for additional results.
                  </p>
                )}
                {message.type === 'comparison' && (
                  <div className="mt-2 ml-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/compare?products=${message.products?.slice(0, 3).map(p => p.id).join(',')}`)}
                      className="text-[#0071CE] border-[#0071CE]"
                    >
                      <GitCompare className="w-4 h-4 mr-1" />
                      Compare Selected Products
                    </Button>
                  </div>
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
            placeholder="Try: 'Compare iPhone vs Samsung' or 'Specifications of OnePlus Nord'"
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

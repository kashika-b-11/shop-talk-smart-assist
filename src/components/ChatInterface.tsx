
import { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, ShoppingCart, Package, Loader2, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { getAllProducts } from '@/services/productService';
import { Product } from '@/types/product';
import ProductImage from './ProductImage';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
  timestamp: Date;
}

interface ChatInterfaceProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  compact?: boolean;
}

const ChatInterface = ({ onSearch, isLoading, compact = false }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Walmart AI shopping assistant. I can help you find products, answer questions, and provide recommendations. What can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      const allProducts = await getAllProducts();
      const searchTerm = query.toLowerCase();
      
      return allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      ).slice(0, 6); // Limit to 6 products for chat display
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  };

  const generateResponse = async (userMessage: string): Promise<{ content: string; products?: Product[] }> => {
    const message = userMessage.toLowerCase();
    
    // Product search queries
    if (message.includes('find') || message.includes('search') || message.includes('show') || 
        message.includes('looking for') || message.includes('need') || message.includes('want')) {
      
      const products = await searchProducts(userMessage);
      
      if (products.length > 0) {
        return {
          content: `I found ${products.length} products that match your search. Here are some great options:`,
          products
        };
      } else {
        return {
          content: "I couldn't find any products matching your search. Try being more specific or browse our categories!"
        };
      }
    }
    
    // Category-based responses
    if (message.includes('electronics')) {
      const products = await searchProducts('electronics');
      return {
        content: "Here are some popular electronics from our store:",
        products
      };
    }
    
    if (message.includes('fashion') || message.includes('clothes') || message.includes('clothing')) {
      const products = await searchProducts('fashion');
      return {
        content: "Check out these fashion items:",
        products
      };
    }
    
    if (message.includes('home') || message.includes('kitchen')) {
      const products = await searchProducts('home');
      return {
        content: "Here are some great home and kitchen products:",
        products
      };
    }
    
    if (message.includes('groceries') || message.includes('food')) {
      const products = await searchProducts('groceries');
      return {
        content: "Fresh groceries and food items for you:",
        products
      };
    }
    
    // General questions
    if (message.includes('help') || message.includes('how')) {
      return {
        content: "I'm here to help! I can assist you with:\n• Finding products by name or category\n• Getting product recommendations\n• Answering questions about our store\n• Managing your shopping cart\n\nJust ask me anything!"
      };
    }
    
    if (message.includes('delivery') || message.includes('shipping')) {
      return {
        content: "We offer free delivery on orders above ₹499! Standard delivery takes 2-3 business days, and we also have same-day delivery available in select areas."
      };
    }
    
    if (message.includes('return') || message.includes('exchange')) {
      return {
        content: "We have a hassle-free return and exchange policy! You can return items within 30 days of purchase. Items should be in original condition with tags intact."
      };
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('cheap') || message.includes('affordable')) {
      const products = await searchProducts(userMessage);
      return {
        content: "Here are some great value products that might interest you:",
        products: products.sort((a, b) => a.price - b.price)
      };
    }
    
    // Default response
    return {
      content: "I'd be happy to help you with that! Could you be more specific about what you're looking for? I can help you find products, answer questions about delivery, returns, or anything else related to shopping."
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateResponse(userMessage);
      
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.content,
          products: response.products,
          timestamp: new Date()
        };
        
        setChatHistory(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again!",
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const quickActions = [
    { label: 'Electronics', icon: Package },
    { label: 'Fashion', icon: Package },
    { label: 'Home & Kitchen', icon: Package },
    { label: 'Groceries', icon: ShoppingCart }
  ];

  if (compact) {
    return (
      <div className="space-y-3">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 text-sm"
            disabled={isLoading || isTyping}
          />
          <Button type="submit" size="sm" disabled={isLoading || !input.trim() || isTyping}>
            <Send size={14} />
          </Button>
        </form>
        
        <div className="grid grid-cols-2 gap-2">
          {quickActions.slice(0, 4).map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => setInput(action.label)}
              className="text-xs"
            >
              <action.icon size={12} className="mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <div className="p-4 border-b bg-[#0071CE] text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">Walmart AI Assistant</h3>
            <p className="text-sm opacity-90">Online • Ready to help</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {chatHistory.map((message, index) => (
          <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' ? 'bg-gray-600' : 'bg-[#0071CE]'
              }`}>
                {message.role === 'user' ? 
                  <User className="w-4 h-4 text-white" /> : 
                  <Bot className="w-4 h-4 text-white" />
                }
              </div>
              
              <div className="space-y-2">
                <div className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-gray-600 text-white ml-auto' 
                    : 'bg-white text-gray-900 shadow-sm border'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
                
                {message.products && message.products.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {message.products.map((product) => (
                      <Card key={product.id} className="p-3 hover:shadow-md transition-shadow">
                        <div className="space-y-2">
                          <ProductImage
                            productName={product.name}
                            category={product.category}
                            className="w-full h-24 object-cover rounded"
                            alt={product.name}
                            fallbackImage={product.image}
                          />
                          <h4 className="font-medium text-xs line-clamp-2">{product.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#0071CE] text-sm">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs">⭐</span>
                              <span className="text-xs">{product.rating?.toFixed(1) || '4.0'}</span>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full text-xs bg-[#0071CE] hover:bg-blue-700"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-[#0071CE] flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white space-y-3">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => setInput(action.label)}
              className="text-xs"
            >
              <action.icon size={12} className="mr-1" />
              {action.label}
            </Button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about products..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={!input.trim() || isTyping}>
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;

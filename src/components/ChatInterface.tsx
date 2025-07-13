import { useState } from 'react';
import { Send, MessageSquare, ShoppingCart, Package, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  compact?: boolean;
}

const ChatInterface = ({ onSearch, isLoading, compact = false }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: `I'll help you find "${userMessage}". Let me search our products for you.` 
      }]);
    }, 500);

    onSearch(userMessage);
    setInput('');
  };

  const quickActions = [
    { label: 'Electronics', icon: Package },
    { label: 'Groceries', icon: ShoppingCart },
    { label: 'Fashion', icon: Package },
    { label: 'Home', icon: Package }
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
            disabled={isLoading}
          />
          <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
            <Send size={14} />
          </Button>
        </form>
        
        <div className="grid grid-cols-2 gap-2">
          {quickActions.slice(0, 4).map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => onSearch(action.label)}
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
    <Card className="h-96 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-[#0071CE]" />
          <h3 className="font-semibold">AI Shopping Assistant</h3>
          <Badge variant="secondary" className="text-xs">Online</Badge>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Start a conversation with your AI assistant</p>
            <p className="text-xs text-gray-400 mt-1">Try: "Find wireless headphones under ₹5000"</p>
          </div>
        ) : (
          chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                message.role === 'user' 
                  ? 'bg-[#0071CE] text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.content}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t space-y-3">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => onSearch(action.label)}
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
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;

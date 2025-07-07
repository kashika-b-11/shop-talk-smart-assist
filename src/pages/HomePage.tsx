
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/ProductCard';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { AuthModal } from '@/components/auth/AuthModal';
import { AIShoppingAssistant } from '@/components/ai/AIShoppingAssistant';
import { productService, cartService } from '@/services/supabaseService';
import { useAuth } from '@/hooks/useAuth';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (user) {
      loadCartCount();
    }
  }, [user]);

  const loadProducts = async () => {
    try {
      const productsData = await productService.getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCartCount = async () => {
    if (!user) return;
    
    try {
      const cartItems = await cartService.getCartItems(user.id);
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemCount(totalItems);
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }

    setLoading(true);
    try {
      const searchResults = await productService.searchProducts(searchQuery);
      setProducts(searchResults);
    } catch (error) {
      console.error('Error searching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to search products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAuthRequired = () => {
    setAuthModalOpen(true);
  };

  const handleAINavigation = (path: string) => {
    navigate(path);
  };

  const handleProductRecommendation = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0071CE] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Walmart AI</h1>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search products..."
                  className="flex-1 bg-white text-black"
                />
                <Button onClick={handleSearch} variant="secondary">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setCartOpen(true)}
                className="relative text-white hover:bg-blue-700"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
              
              {user ? (
                <Button
                  variant="ghost"
                  onClick={() => navigate('/profile')}
                  className="text-white hover:bg-blue-700"
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => setAuthModalOpen(true)}
                  className="text-white hover:bg-blue-700"
                >
                  <User className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
          <h2 className="text-4xl font-bold mb-4">Smart Shopping with AI</h2>
          <p className="text-xl mb-6">
            Discover amazing products with our AI-powered shopping assistant. 
            Get personalized recommendations and smart price analysis.
          </p>
          <div className="flex gap-4">
            <Button size="lg" variant="secondary">
              Explore Products
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800">
              Try AI Assistant
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
            </h2>
            <p className="text-gray-600">{products.length} products found</p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAuthRequired={handleAuthRequired}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Sidebar and Modals */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <AIShoppingAssistant
        onNavigate={handleAINavigation}
        onProductRecommendation={handleProductRecommendation}
      />
    </div>
  );
};

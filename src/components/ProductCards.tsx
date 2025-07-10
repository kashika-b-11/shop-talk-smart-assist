
import { Star, MapPin, Truck, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ProductImage from './ProductImage';

interface ProductCardsProps {
  products: Product[];
  layout?: 'grid' | 'list';
  openInNewTab?: boolean;
}

const ProductCards = ({ products, layout = 'grid', openInNewTab = false }: ProductCardsProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleProductClick = (productId: number, e?: React.MouseEvent) => {
    if (openInNewTab && e) {
      // Check if user is holding Ctrl/Cmd key or middle-clicking
      const shouldOpenInNewTab = e.ctrlKey || e.metaKey || e.button === 1;
      if (shouldOpenInNewTab) {
        window.open(`/product/${productId}`, '_blank');
        return;
      }
    }
    navigate(`/product/${productId}`);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, productId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProductClick(productId);
    }
  };

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer focus:ring-2 focus:ring-[#0071CE] focus:outline-none"
            onClick={(e) => handleProductClick(product.id, e)}
            onKeyDown={(e) => handleCardKeyDown(e, product.id)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${product.name}`}
          >
            <div className="relative">
              <ProductImage
                productName={product.name}
                category={product.category}
                className="w-full h-32 group-hover:scale-105 transition-transform duration-200"
                alt={product.name}
                fallbackImage={product.image}
              />
              {product.inStock && (
                <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                  In Stock
                </Badge>
              )}
            </div>
            
            <div className="p-3 space-y-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div>
                <div className="text-lg font-bold text-[#0071CE]">
                  ₹{product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>
              
              <Button 
                size="sm"
                className="w-full bg-[#0071CE] hover:bg-blue-700 text-xs transition-colors duration-200"
                disabled={!product.inStock}
                onClick={(e) => handleAddToCart(e, product)}
                tabIndex={-1}
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-[#0071CE] focus:outline-none"
          onClick={(e) => handleProductClick(product.id, e)}
          onKeyDown={(e) => handleCardKeyDown(e, product.id)}
          tabIndex={0}
          role="button"
          aria-label={`View details for ${product.name}`}
        >
          <div className="p-3">
            <div className="flex space-x-3">
              <ProductImage
                productName={product.name}
                category={product.category}
                className="w-16 h-16 rounded-lg"
                alt={product.name}
                fallbackImage={product.image}
              />
              
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900 line-clamp-1 text-sm">
                    {product.name}
                  </h3>
                  <div className="text-lg font-bold text-[#0071CE]">
                    ₹{product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                  {product.inStock && (
                    <Badge className="bg-green-100 text-green-800 text-xs">In Stock</Badge>
                  )}
                </div>
                
                <Button 
                  size="sm"
                  className="bg-[#0071CE] hover:bg-blue-700 text-xs transition-colors duration-200"
                  disabled={!product.inStock}
                  onClick={(e) => handleAddToCart(e, product)}
                  tabIndex={-1}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductCards;

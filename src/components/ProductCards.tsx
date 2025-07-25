
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
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleProductClick = (productId: number, e?: React.MouseEvent) => {
    if (openInNewTab && e) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                alt={product.name}
                fallbackImage={product.image}
              />
              <Badge 
                className={`absolute top-2 left-2 ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
            
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-5 min-h-[2.5rem]">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating?.toFixed(1) || '4.0'}</span>
                </div>
              </div>
              
              <div className="text-xl font-bold text-[#0071CE]">
                ₹{product.price.toLocaleString('en-IN', { 
                  minimumFractionDigits: 0, 
                  maximumFractionDigits: 0 
                })}
              </div>
              
              <Button 
                size="sm"
                className="w-full bg-[#0071CE] hover:bg-blue-700 text-sm transition-colors duration-200"
                disabled={!product.inStock}
                onClick={(e) => handleAddToCart(e, product)}
                tabIndex={-1}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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
          <div className="p-4">
            <div className="flex space-x-4">
              <ProductImage
                productName={product.name}
                category={product.category}
                className="w-20 h-20 rounded-lg object-cover"
                alt={product.name}
                fallbackImage={product.image}
              />
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
                    {product.name}
                  </h3>
                  <div className="text-lg font-bold text-[#0071CE] ml-4">
                    ₹{product.price.toLocaleString('en-IN', { 
                      minimumFractionDigits: 0, 
                      maximumFractionDigits: 0 
                    })}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{product.rating?.toFixed(1) || '4.0'}</span>
                  </div>
                  <Badge 
                    className={`text-xs ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
                
                <Button 
                  size="sm"
                  className="bg-[#0071CE] hover:bg-blue-700 text-xs transition-colors duration-200"
                  disabled={!product.inStock}
                  onClick={(e) => handleAddToCart(e, product)}
                  tabIndex={-1}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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

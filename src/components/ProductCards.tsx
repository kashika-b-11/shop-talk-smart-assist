import { Star, MapPin, Truck, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProductImage from './ProductImage';

interface ProductCardsProps {
  products: Product[];
  layout?: 'grid' | 'list';
}

const ProductCards = ({ products, layout = 'grid' }: ProductCardsProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <ProductImage
                productName={product.name}
                category={product.category}
                className="w-full h-32 group-hover:scale-105 transition-transform"
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
                className="w-full bg-[#0071CE] hover:bg-blue-700 text-xs"
                disabled={!product.inStock}
                onClick={() => handleAddToCart(product)}
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
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                  className="bg-[#0071CE] hover:bg-blue-700 text-xs"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
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

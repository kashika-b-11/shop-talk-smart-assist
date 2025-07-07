
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import { Product, LightningDeal } from '@/types/product';
import { useAuth } from '@/hooks/useAuth';
import { cartService, lightningDealService } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ProductImage from '@/components/ProductImage';

interface ProductCardProps {
  product: Product;
  onAuthRequired: () => void;
}

export const ProductCard = ({ product, onAuthRequired }: ProductCardProps) => {
  const [lightningDeal, setLightningDeal] = useState<LightningDeal | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    setLoading(true);
    try {
      await cartService.addToCart(user.id, product.id, 1, lightningDeal?.id);
      toast({
        title: 'Added to cart!',
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const currentPrice = lightningDeal ? lightningDeal.deal_price : product.price;
  const originalPrice = lightningDeal ? lightningDeal.original_price : product.price;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div onClick={handleProductClick}>
        <div className="relative">
          <ProductImage
            productName={product.name}
            category={product.category}
            className="w-full h-48"
            alt={product.name}
            fallbackImage={product.image_url}
          />
          {lightningDeal && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              <Zap className="w-3 h-3 mr-1" />
              Lightning Deal
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.rating})</span>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-green-600">
              ${currentPrice.toFixed(2)}
            </span>
            {lightningDeal && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
        </CardContent>
      </div>
      
      <div className="px-4 pb-4">
        <Button
          onClick={handleAddToCart}
          disabled={loading || product.stock_quantity === 0}
          className="w-full bg-[#0071CE] hover:bg-blue-700"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {loading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </div>
    </Card>
  );
};

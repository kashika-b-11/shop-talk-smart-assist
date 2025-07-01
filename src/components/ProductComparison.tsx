
import { useState } from 'react';
import { X, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductComparisonProps {
  products: Product[];
  onClose: () => void;
}

const ProductComparison = ({ products, onClose }: ProductComparisonProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Product Comparison</h2>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 space-y-4">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center';
                    }}
                  />
                  {product.inStock && (
                    <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                      In Stock
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Price</span>
                      <span className="text-xl font-bold text-[#0071CE]">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Availability</span>
                      <span className="text-sm text-green-600">
                        {product.onlineAvailability}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-sm text-gray-600">Store</span>
                      <p className="text-sm text-gray-800 mt-1">{product.storeAvailability}</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button 
                      className="w-full bg-[#0071CE] hover:bg-blue-700"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length < 2 && (
            <div className="text-center py-8">
              <p className="text-gray-600">Select at least 2 products to compare them side by side.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductComparison;

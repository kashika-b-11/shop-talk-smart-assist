
import { useState } from 'react';
import { X, Star, ShoppingCart, Eye, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface ProductComparisonProps {
  products: Product[];
  onClose: () => void;
}

const ProductComparison = ({ products, onClose }: ProductComparisonProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const getComparisonSpecs = (product: Product) => {
    if (product.category === 'Electronics') {
      if (product.name.toLowerCase().includes('phone')) {
        return {
          'Display': '6.1" Super Retina',
          'Processor': 'A15 Bionic',
          'Camera': '12MP Dual',
          'Battery': '3240mAh',
          'Storage': '128GB',
          '5G': 'Yes'
        };
      } else if (product.name.toLowerCase().includes('laptop')) {
        return {
          'Processor': 'Intel Core i5',
          'RAM': '8GB DDR4',
          'Storage': '512GB SSD',
          'Display': '15.6" FHD',
          'Graphics': 'Intel Iris Xe',
          'Battery': '8 hours'
        };
      }
    }
    
    return {
      'Brand': product.brand || 'Premium',
      'Rating': `${product.rating}/5`,
      'Warranty': '1 Year',
      'Return': '30 Days',
      'Stock': product.inStock ? 'Available' : 'Out of Stock',
      'Delivery': 'Express'
    };
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Product Comparison</h2>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>

          {products.length < 2 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Add More Products to Compare</h3>
              <p className="text-gray-600 mb-4">
                Select at least 2 products to see a detailed side-by-side comparison.
              </p>
              <Button onClick={onClose} className="bg-[#0071CE] hover:bg-blue-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b font-semibold">Feature</th>
                    {products.map((product) => (
                      <th key={product.id} className="text-center p-4 border-b min-w-[280px]">
                        <div className="space-y-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg mx-auto"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center';
                            }}
                          />
                          <div>
                            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                              {product.name}
                            </h3>
                            <div className="text-xl font-bold text-[#0071CE]">
                              ₹{product.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price Comparison */}
                  <tr className="border-b">
                    <td className="p-4 font-medium">Price</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="text-2xl font-bold text-[#0071CE]">
                          ₹{product.price.toLocaleString()}
                        </div>
                        {product === products.reduce((min, p) => p.price < min.price ? p : min, products[0]) && (
                          <Badge className="bg-green-100 text-green-800 mt-1">Best Price</Badge>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Rating Comparison */}
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">Customer Rating</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{product.rating.toFixed(1)}</span>
                        </div>
                        {product === products.reduce((max, p) => p.rating > max.rating ? p : max, products[0]) && (
                          <Badge className="bg-yellow-100 text-yellow-800">Highest Rated</Badge>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Availability */}
                  <tr className="border-b">
                    <td className="p-4 font-medium">Availability</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <Badge className={product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                        </Badge>
                      </td>
                    ))}
                  </tr>

                  {/* Specifications */}
                  {Object.keys(getComparisonSpecs(products[0])).map((spec, index) => (
                    <tr key={spec} className={index % 2 === 0 ? "border-b bg-gray-50" : "border-b"}>
                      <td className="p-4 font-medium">{spec}</td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          {getComparisonSpecs(product)[spec]}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Store Availability */}
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">Store Availability</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center text-sm">
                        {product.storeAvailability}
                      </td>
                    ))}
                  </tr>

                  {/* Delivery Options */}
                  <tr className="border-b">
                    <td className="p-4 font-medium">Delivery</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center text-sm">
                        {product.onlineAvailability}
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-4 font-medium">Actions</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-[#0071CE] hover:bg-blue-700"
                            disabled={!product.inStock}
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Comparison Summary */}
          {products.length >= 2 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-[#0071CE] mb-2">🎯 Comparison Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">💰 Best Price: </span>
                  {products.reduce((min, p) => p.price < min.price ? p : min, products[0]).name.split(' ').slice(0, 3).join(' ')}
                </div>
                <div>
                  <span className="font-medium">⭐ Highest Rated: </span>
                  {products.reduce((max, p) => p.rating > max.rating ? p : max, products[0]).name.split(' ').slice(0, 3).join(' ')}
                </div>
                <div>
                  <span className="font-medium">✅ Best Availability: </span>
                  {products.filter(p => p.inStock).length > 0 ? 
                    products.filter(p => p.inStock)[0].name.split(' ').slice(0, 3).join(' ') : 
                    'Check availability'}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductComparison;

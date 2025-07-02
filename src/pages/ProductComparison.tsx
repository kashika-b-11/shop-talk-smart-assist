
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Eye } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductComparison = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get product IDs from URL params
    const productIds = searchParams.get('products')?.split(',') || [];
    
    // In a real app, you would fetch products by IDs
    // For now, we'll use mock data
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'OnePlus Nord CE 3 Lite',
        price: 19999,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        rating: 4.4,
        inStock: true,
        storeAvailability: 'MG Road Store, Bangalore',
        onlineAvailability: 'Delivery in 2-3 hours',
        description: '8GB RAM, 128GB Storage, 108MP Camera'
      },
      {
        id: '2',
        name: 'Samsung Galaxy M34',
        price: 16999,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        rating: 4.2,
        inStock: true,
        storeAvailability: 'Brigade Road Store, Bangalore',
        onlineAvailability: 'Delivery in 2-3 hours',
        description: '6GB RAM, 128GB Storage, 50MP Camera'
      }
    ];

    setProducts(mockProducts);
  }, [searchParams]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-4 flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Product Comparison
            </h1>
            <p className="text-gray-600">
              Compare products side by side to make the best choice
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Products to Compare</h2>
              <p className="text-gray-600">
                Select products from any category to compare them here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
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

                  <div className="p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {product.name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Price</span>
                        <span className="text-2xl font-bold text-[#0071CE]">
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

                      <div className="pt-2">
                        <span className="text-sm text-gray-600">Description</span>
                        <p className="text-sm text-gray-800 mt-1">{product.description}</p>
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
                </Card>
              ))}
            </div>
          )}

          {products.length < 2 && products.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">Select at least 2 products to compare them effectively.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;

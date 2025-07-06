import { useState } from 'react';
import { Star, MapPin, Truck, ShoppingCart, Eye, RefreshCw, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProductComparison from './ProductComparison';
import ProductImage from './ProductImage';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onRefresh?: () => void;
  gridLayout?: 'compact' | 'large';
}

const ProductGrid = ({ products, isLoading, onRefresh, gridLayout = 'compact' }: ProductGridProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleProductSelect = (product: Product, checked: boolean) => {
    if (checked) {
      if (selectedProducts.length < 4) {
        setSelectedProducts(prev => [...prev, product]);
      } else {
        toast({
          title: "Maximum selection reached",
          description: "You can compare up to 4 products at once.",
          variant: "destructive"
        });
      }
    } else {
      setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
    }
  };

  const handleCompare = () => {
    if (selectedProducts.length < 2) {
      toast({
        title: "Select more products",
        description: "Please select at least 2 products to compare.",
        variant: "destructive"
      });
      return;
    }
    setShowComparison(true);
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Searching products...</h2>
        <div className={`grid gap-4 ${
          gridLayout === 'large' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className={gridLayout === 'large' ? 'space-y-4' : 'flex space-x-4'}>
                <div className={`bg-gray-200 rounded-lg ${
                  gridLayout === 'large' ? 'w-full h-48' : 'w-20 h-20'
                }`}></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Start Shopping</h2>
        <p className="text-gray-600">
          Ask me what you're looking for and I'll find the best products for you!
        </p>
      </div>
    );
  }

  if (gridLayout === 'large') {
    return (
      <>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Found {products.length} products
            </h2>
            <div className="flex items-center space-x-4">
              {selectedProducts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {selectedProducts.length} selected
                  </Badge>
                  <Button
                    size="sm"
                    onClick={handleCompare}
                    className="bg-[#0071CE] hover:bg-blue-700"
                  >
                    <GitCompare size={16} className="mr-1" />
                    Compare
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={clearSelection}
                  >
                    Clear
                  </Button>
                </div>
              )}
              {onRefresh && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefresh}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw size={16} />
                  <span>Refresh</span>
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group relative">
                <div className="absolute top-2 right-2 z-10">
                  <Checkbox
                    checked={selectedProducts.some(p => p.id === product.id)}
                    onCheckedChange={(checked) => handleProductSelect(product, checked as boolean)}
                    className="bg-white"
                  />
                </div>
                
                <div className="relative">
                  <ProductImage
                    productName={product.name}
                    category={product.category}
                    className="w-full h-48 group-hover:scale-105 transition-transform"
                    alt={product.name}
                    fallbackImage={product.image}
                  />
                  {product.inStock && (
                    <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                      In Stock
                    </Badge>
                  )}
                </div>
                
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-[#0071CE]">
                    ₹{product.price.toLocaleString()}
                  </div>
                  
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{product.storeAvailability}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="w-3 h-3" />
                      <span>{product.onlineAvailability}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-[#0071CE] hover:bg-blue-700 text-sm"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {showComparison && (
          <ProductComparison
            products={selectedProducts}
            onClose={() => setShowComparison(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Found {products.length} products
          </h2>
          <div className="flex items-center space-x-4">
            {selectedProducts.length > 0 && (
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  {selectedProducts.length} selected
                </Badge>
                <Button
                  size="sm"
                  onClick={handleCompare}
                  className="bg-[#0071CE] hover:bg-blue-700"
                >
                  <GitCompare size={16} className="mr-1" />
                  Compare
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearSelection}
                >
                  Clear
                </Button>
              </div>
            )}
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                className="flex items-center space-x-2"
              >
                <RefreshCw size={16} />
                <span>Refresh</span>
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
              <div className="p-4">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <Checkbox
                      checked={selectedProducts.some(p => p.id === product.id)}
                      onCheckedChange={(checked) => handleProductSelect(product, checked as boolean)}
                    />
                  </div>
                  
                  <ProductImage
                    productName={product.name}
                    category={product.category}
                    className="w-24 h-24 rounded-lg"
                    alt={product.name}
                    fallbackImage={product.image}
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#0071CE]">
                          ₹{product.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{product.storeAvailability}</span>
                        {product.inStock && (
                          <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{product.onlineAvailability}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        className="flex-1 bg-[#0071CE] hover:bg-blue-700"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {showComparison && (
        <ProductComparison
          products={selectedProducts}
          onClose={() => setShowComparison(false)}
        />
      )}
    </>
  );
};

export default ProductGrid;

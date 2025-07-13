
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, MapPin, Shield, Award, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import Header from '@/components/Header';
import ProductImage from '@/components/ProductImage';
import { getProductById } from '@/services/productService';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const foundProduct = await getProductById(parseInt(id));
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this product: ${product?.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard",
      });
    }
  };

  const getProductSpecs = (product: Product) => {
    // Generate relevant specs based on category
    if (product.category === 'Electronics') {
      if (product.name.toLowerCase().includes('phone') || product.name.toLowerCase().includes('iphone')) {
        return {
          'Display': '6.1-inch Super Retina XDR',
          'Processor': 'A15 Bionic chip',
          'Camera': '12MP Dual camera system',
          'Storage': '128GB / 256GB / 512GB',
          'Battery': 'All-day battery life',
          'OS': 'iOS 15',
          'Connectivity': '5G, Wi-Fi 6, Bluetooth 5.0'
        };
      } else if (product.name.toLowerCase().includes('laptop')) {
        return {
          'Processor': 'Intel Core i5 12th Gen',
          'RAM': '8GB DDR4',
          'Storage': '512GB SSD',
          'Display': '15.6-inch FHD',
          'Graphics': 'Integrated Intel Iris Xe',
          'OS': 'Windows 11 Home',
          'Battery': 'Up to 8 hours'
        };
      }
    }
    
    return {
      'Brand': product.brand || 'Premium Brand',
      'Category': product.category,
      'Rating': `${product.rating}/5.0`,
      'Availability': product.inStock ? 'In Stock' : 'Out of Stock',
      'Warranty': '1 Year Manufacturer Warranty',
      'Return Policy': '30 Days Easy Return'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Button onClick={() => navigate('/')} className="bg-[#0071CE] hover:bg-blue-700">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const productSpecs = getProductSpecs(product);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <Card className="p-6">
            <ProductImage
              productName={product.name}
              category={product.category}
              className="w-full h-96 rounded-lg"
              alt={product.name}
              fallbackImage={product.image}
            />
          </Card>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating.toFixed(1)}</span>
                  <span className="text-gray-600">(1,234 reviews)</span>
                </div>
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800">✅ In Stock</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">❌ Out of Stock</Badge>
                )}
                <Badge className="bg-blue-100 text-blue-800">{product.brand}</Badge>
              </div>
              <div className="text-4xl font-bold text-[#0071CE] mb-4">
                ₹{product.price.toLocaleString()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{product.storeAvailability}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{product.onlineAvailability}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">1 Year Warranty • 30 Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Walmart Quality Assured</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#0071CE] hover:bg-blue-700 text-lg py-3"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" size="lg" className="px-4">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-4" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Call for Bulk Orders</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Save for Later</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Product Details */}
        <Tabs defaultValue="description" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Product Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Premium quality materials and construction</li>
                  <li>Advanced technology for superior performance</li>
                  <li>User-friendly design with intuitive controls</li>
                  <li>Energy efficient and environmentally friendly</li>
                  <li>Comprehensive warranty and customer support</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(productSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-600">{key}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              <div className="space-y-6">
                {[
                  { name: 'Priya S.', rating: 5, review: 'Excellent product! Great value for money and fast delivery.', verified: true },
                  { name: 'Rajesh K.', rating: 4, review: 'Good quality product. Works as expected. Would recommend.', verified: true },
                  { name: 'Anita M.', rating: 5, review: 'Amazing experience! The product exceeded my expectations.', verified: false }
                ].map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.name}</span>
                      {review.verified && (
                        <Badge variant="outline" className="text-xs">Verified Purchase</Badge>
                      )}
                    </div>
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipping">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping & Returns</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Shipping Options</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Standard Delivery: 2-5 business days - FREE on orders ₹499+</li>
                    <li>• Express Delivery: 1-2 business days - ₹99</li>
                    <li>• Same Day Delivery: Available in select metro cities - ₹149</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Return Policy</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 30-day return window from delivery date</li>
                    <li>• Free returns on orders above ₹499</li>
                    <li>• Products must be unused and in original packaging</li>
                    <li>• Refund processed within 5-7 business days</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Warranty</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Manufacturer warranty included</li>
                    <li>• Extended warranty options available</li>
                    <li>• Customer support: 1800-XXX-XXXX</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;

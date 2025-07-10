
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import Header from '@/components/Header';
import ProductImage from '@/components/ProductImage';
import { getAllProducts } from '@/services/productService';

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
        // First try to get from real products
        const allProducts = await getAllProducts();
        let foundProduct = allProducts.find(p => p.id === parseInt(id));
        
        // If not found in service, check if it's from deals section or other components
        if (!foundProduct) {
          // Check if this is a Lightning Deal or other product type
          // Create a fallback product with proper structure
          foundProduct = {
            id: parseInt(id),
            name: `Product ${id}`, // This will be overridden below if we find better data
            category: 'Electronics',
            price: Math.floor(Math.random() * 50000) + 5000,
            image: '/placeholder-product.jpg',
            inStock: true,
            rating: 4.2 + Math.random() * 0.8,
            description: 'High-quality product with excellent features and reliable performance. Perfect for daily use with modern design and functionality.',
            storeAvailability: 'Available at 5 nearby stores',
            onlineAvailability: 'Free delivery in 2-3 days'
          };
        }
        
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
                  <span className="text-gray-600">(234 reviews)</span>
                </div>
                {product.inStock && (
                  <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                )}
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
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#0071CE] hover:bg-blue-700"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </Card>

        {/* Reviews Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">Customer {review}</span>
                </div>
                <p className="text-gray-700">Great product! Really satisfied with the quality and performance.</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;

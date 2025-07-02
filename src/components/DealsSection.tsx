
import { Star, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

const DealsSection = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const deals: Product[] = [
    {
      id: 'deal1',
      name: "Samsung Galaxy M34",
      price: 16999,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      rating: 4.2,
      inStock: true,
      storeAvailability: "MG Road Store, Bangalore",
      onlineAvailability: "Delivery in 2-3 hours",
      description: "Samsung Galaxy M34 with 6GB RAM, 128GB Storage"
    },
    {
      id: 'deal2',
      name: "HP Laptop 15s",
      price: 32990,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      rating: 4.1,
      inStock: true,
      storeAvailability: "Brigade Road Store, Bangalore",
      onlineAvailability: "Delivery in 2-3 hours",
      description: "HP Laptop 15s with Intel Core i3, 8GB RAM"
    },
    {
      id: 'deal3',
      name: "Sony WH-CH720N",
      price: 6990,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.4,
      inStock: true,
      storeAvailability: "Koramangala Store, Bangalore",
      onlineAvailability: "Delivery in 2-3 hours",
      description: "Sony WH-CH720N Wireless Noise Canceling Headphones"
    },
    {
      id: 'deal4',
      name: "Instant Pot Duo",
      price: 4999,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
      rating: 4.3,
      inStock: true,
      storeAvailability: "Indiranagar Store, Bangalore",
      onlineAvailability: "Delivery in 2-3 hours",
      description: "Instant Pot Duo 7-in-1 Electric Pressure Cooker"
    }
  ];

  const dealDetails = [
    { originalPrice: 24999, discount: 32, timeLeft: "2h 30m" },
    { originalPrice: 45990, discount: 28, timeLeft: "5h 15m" },
    { originalPrice: 9990, discount: 30, timeLeft: "1h 45m" },
    { originalPrice: 7999, discount: 37, timeLeft: "3h 20m" }
  ];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleProductClick = (product: Product) => {
    // Create a simple product details modal or navigate to product page
    toast({
      title: product.name,
      description: product.description,
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Lightning Deals</h2>
        <Button variant="outline">View All Deals</Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal, index) => (
          <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative" onClick={() => handleProductClick(deal)}>
              <img
                src={deal.image}
                alt={deal.name}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-2 left-2 bg-red-500">
                {dealDetails[index].discount}% OFF
              </Badge>
              <div className="absolute top-2 right-2 bg-white/90 rounded px-2 py-1 text-xs font-semibold text-red-600 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {dealDetails[index].timeLeft}
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2 cursor-pointer" onClick={() => handleProductClick(deal)}>
                {deal.name}
              </h3>
              
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{deal.rating}</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-[#0071CE]">
                    ₹{deal.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="line-through">₹{dealDetails[index].originalPrice.toLocaleString()}</span>
                  <span className="text-green-600 font-medium">
                    Save ₹{(dealDetails[index].originalPrice - deal.price).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-[#0071CE] hover:bg-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(deal);
                }}
              >
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DealsSection;


import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { getDealsData } from '@/services/productService';

const DealsSection = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const allDeals = getDealsData();
  const allDealDetails = [
    { originalPrice: 25999.00, discount: 29 },
    { originalPrice: 299999.00, discount: 7 },
    { originalPrice: 34990.00, discount: 16 },
    { originalPrice: 29999.00, discount: 17 }
  ];

  const deals = showAll ? allDeals : allDeals.slice(0, 4);
  const dealDetails = showAll ? allDealDetails : allDealDetails.slice(0, 4);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleProductClick = (product: any, e?: React.MouseEvent) => {
    if (e && (e.ctrlKey || e.metaKey)) {
      window.open(`/product/${product.id}`, '_blank');
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, product: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProductClick(product);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Lightning Deals</h2>
        <Button variant="outline" onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "Show Less" : "View All Deals"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal, index) => (
          <Card 
            key={deal.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-[#0071CE] focus:outline-none"
            onClick={(e) => handleProductClick(deal, e)}
            onKeyDown={(e) => handleCardKeyDown(e, deal)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${deal.name}`}
          >
            <div className="relative">
              <img
                src={deal.image}
                alt={deal.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center';
                }}
              />
              <Badge className="absolute top-2 left-2 bg-red-500">
                {dealDetails[index]?.discount || 20}% OFF
              </Badge>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {deal.name}
              </h3>

              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{deal.rating}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-[#0071CE]">
                    ₹{Number(deal.price).toLocaleString()}
                  </span>
                </div>
                {dealDetails[index] && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="line-through">
                      ₹{Number(dealDetails[index].originalPrice).toLocaleString()}
                    </span>
                    <span className="text-green-600 font-medium">
                      Save ₹{(dealDetails[index].originalPrice - deal.price).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <Button
                className="w-full bg-[#0071CE] hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(deal);
                }}
                tabIndex={-1}
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

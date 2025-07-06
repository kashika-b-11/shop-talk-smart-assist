import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

import SamsungImg from '../Assets/deals/samsungM35G.png';
import rogImg from '../Assets/deals/ROGZeph.png';
import sonyImg from '../Assets/deals/1000XM6.png';
import applewatchImg from '../Assets/deals/appleSE.png';
import potImg from '../Assets/deals/potduo.png';
import flipImg from '../Assets/deals/flip5.png';
import echoImg from '../Assets/deals/echodot.png';
import airfryerImg from '../Assets/deals/airfryer.png';
import canondslrImg from '../Assets/deals/canon.png';
import fitbitImg from '../Assets/deals/fitbit.png';
import prestigetopImg from '../Assets/deals/prestige.png';
import superlightImg from '../Assets/deals/proxsuperlight.png';


const allDeals: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy M35 5G",
    category: "Electronics",
    price: 18499.00,
    image: SamsungImg,
    rating: 4.2,
    inStock: true,
    storeAvailability: "MG Road Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "Samsung Galaxy M35 5G with 8GB RAM, 128GB Storage"
  },
  {
    id: 2,
    name: "ROG Zephyrus G14 (2025)",
    category: "Electronics",
    price: 279999.00,
    image: rogImg,
    rating: 4.1,
    inStock: true,
    storeAvailability: "Brigade Road Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "GA403WR- QS123WS, AMD Ryzen™ AI 9 HX 370 Processor, NVIDIA® GeForce RTX™ 5070 Ti"
  },
  {
    id: 3,
    name: "Sony WH-1000XM6",
    category: "Electronics",
    price: 29490.00,
    image: sonyImg,
    rating: 4.4,
    inStock: true,
    storeAvailability: "Koramangala Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "Sony WH-1000XM6 Wireless Noise Canceling Headphones"
  },
  {
    id: 4,
    name: "Instant Pot Duo",
    category: "Home & Kitchen",
    price: 4999.00,
    image: potImg,
    rating: 4.3,
    inStock: true,
    storeAvailability: "Indiranagar Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "Instant Pot Duo 7-in-1 Electric Pressure Cooker"
  },
  {
    id: 5,
    name: "Apple Watch SE",
    category: "Electronics",
    price: 24999.00,
    image: applewatchImg,
    rating: 4.5,
    inStock: true,
    storeAvailability: "Jayanagar Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "Apple Watch SE (GPS, 40mm)"
  },
  {
    id: 6,
    name: "JBL Flip 5 Speaker",
    category: "Electronics",
    price: 7999.00,
    image: flipImg,
    rating: 4.6,
    inStock: true,
    storeAvailability: "Malleshwaram Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "JBL Flip 5 Waterproof Portable Bluetooth Speaker"
  },
  {
    id: 7,
    name: "Amazon Echo Dot (4th Gen)",
    category: "Electronics",
    price: 3499.00,
    image: echoImg,
    rating: 4.4,
    inStock: true,
    storeAvailability: "Whitefield Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "Amazon Echo Dot (4th Gen) Smart Speaker with Alexa"
  },
  {
    id: 8,
    name: "Philips Air Fryer",
    category: "Home & Kitchen",
    price: 8999.00,
    image: airfryerImg,
    rating: 4.5,
    inStock: true,
    storeAvailability: "HSR Layout Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "Philips Daily Collection HD9218 Air Fryer"
  },
  {
    id: 9,
    name: "Canon EOS 1500D DSLR",
    category: "Electronics",
    price: 31999.00,
    image: canondslrImg,
    rating: 4.6,
    inStock: true,
    storeAvailability: "Jayanagar Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "Canon EOS 1500D 24.1 Digital SLR Camera"
  },
  {
    id: 10,
    name: "FitBit Sense 2",
    category: "Electronics",
    price: 24999.00,
    image: fitbitImg,
    rating: 4.3,
    inStock: true,
    storeAvailability: "Koramangala Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "FitBit Sense 2 with 6+ day battery life, Blood oxygen (SpO2), ECG app"
  },
  {
    id: 11,
    name: "Prestige PIC 20.0",
    category: "Home & Kitchen",
    price: 2499.00,
    image: prestigetopImg,
    rating: 4.2,
    inStock: true,
    storeAvailability: "Indiranagar Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "Prestige PIC 20.0 Induction Cooktop 1600 W with Push Buttons (Black)"
  },
  {
    id: 12,
    name: "Logitech PRO X Superlight 2",
    category: "Electronics",
    price: 14995.00,
    image: superlightImg,
    rating: 4.4,
    inStock: true,
    storeAvailability: "Brigade Road Store, Bangalore",
    onlineAvailability: "Delivery in 2-3 hours",
    description: "LIGHTSPEED wireless technology, LIGHTFORCE Hybrid Switches, Onboard memory, No-additive PTFE Feet, 5 buttons, Resolution: 100 – 32,000 DPI"
  }
];

const allDealDetails = [
  { originalPrice: 25999.00, discount: 29 },
  { originalPrice: 299999.00, discount: 7 },
  { originalPrice: 34990.00, discount: 16 },
  { originalPrice: 7999.00, discount: 37 },
  { originalPrice: 29999.00, discount: 17 },
  { originalPrice: 9999.00, discount: 20 },
  { originalPrice: 4499.00, discount: 22 },
  { originalPrice: 11999.00, discount: 25 },
  { originalPrice: 39999.00, discount: 20 },
  { originalPrice: 35999.00, discount: 25 },
  { originalPrice: 3499.00, discount: 29 },
  { originalPrice: 16995.00, discount: 12 }
];

const DealsSection = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [showAll, setShowAll] = useState(false);

  const deals = showAll ? allDeals : allDeals.slice(0, 4);
  const dealDetails = showAll ? allDealDetails : allDealDetails.slice(0, 4);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleProductClick = (product: Product) => {
    toast({
      title: product.name,
      description: (
        <>
          {product.description}
          <br />
          Price: ₹{Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <br />
          Rating: {product.rating}⭐
          <br />
          Available at: {product.storeAvailability}
        </>
      ),
    });
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
                    ₹{Number(deal.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="line-through">
                    ₹{Number(dealDetails[index].originalPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-green-600 font-medium">
                    Save ₹{(dealDetails[index].originalPrice - deal.price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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

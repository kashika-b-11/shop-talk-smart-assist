
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Navigation, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const StoreLocator = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const stores = [
    {
      id: 'store1',
      name: 'Walmart MG Road',
      address: 'MG Road, Bangalore, Karnataka 560001',
      phone: '+91 80 2558 1234',
      distance: '0.5 km',
      rating: 4.5,
      hours: '8:00 AM - 11:00 PM',
      status: 'Open',
      features: ['Parking Available', 'Home Delivery', 'Express Checkout']
    },
    {
      id: 'store2',
      name: 'Walmart Brigade Road',
      address: 'Brigade Road, Bangalore, Karnataka 560001',
      phone: '+91 80 2558 5678',
      distance: '1.2 km',
      rating: 4.3,
      hours: '8:00 AM - 11:00 PM',
      status: 'Open',
      features: ['24/7 Pharmacy', 'Parking Available', 'Grocery Pickup']
    },
    {
      id: 'store3',
      name: 'Walmart Koramangala',
      address: 'Koramangala, Bangalore, Karnataka 560034',
      phone: '+91 80 2558 9012',
      distance: '2.8 km',
      rating: 4.6,
      hours: '8:00 AM - 11:00 PM',
      status: 'Open',
      features: ['Drive-through', 'Online Order Pickup', 'Curbside Service']
    },
    {
      id: 'store4',
      name: 'Walmart Indiranagar',
      address: 'Indiranagar, Bangalore, Karnataka 560038',
      phone: '+91 80 2558 3456',
      distance: '3.5 km',
      rating: 4.2,
      hours: '8:00 AM - 10:00 PM',
      status: 'Closes Soon',
      features: ['Fresh Produce', 'Bakery', 'Electronics Section']
    }
  ];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStore = (storeId: string) => {
    setSelectedStore(storeId);
  };

  const handleConfirmStore = () => {
    if (selectedStore) {
      navigate('/checkout', { 
        state: { 
          selectedStore: stores.find(s => s.id === selectedStore),
          deliveryOption: 'pickup'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/delivery-options')}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Select Pickup Store</h1>
          </div>

          {/* Search */}
          <Card className="p-4 mb-6">
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-400" size={20} />
              <Input
                placeholder="Search for stores by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                <Navigation size={16} />
                Use My Location
              </Button>
            </div>
          </Card>

          {/* Store List */}
          <div className="space-y-4 mb-6">
            {filteredStores.map((store) => (
              <Card 
                key={store.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedStore === store.id 
                    ? 'ring-2 ring-[#0071CE] border-[#0071CE]' 
                    : 'border-gray-200'
                }`}
                onClick={() => handleSelectStore(store.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{store.name}</h3>
                      <Badge 
                        variant={store.status === 'Open' ? 'default' : 'secondary'}
                        className={store.status === 'Open' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {store.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        <span>{store.address}</span>
                        <span className="font-medium text-[#0071CE]">({store.distance})</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone size={16} />
                        <span>{store.phone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{store.hours}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                        <span className="font-medium">{store.rating}</span>
                        <span className="text-gray-500">(4.2k reviews)</span>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {store.features.map((feature, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <input
                      type="radio"
                      name="store"
                      value={store.id}
                      checked={selectedStore === store.id}
                      onChange={() => handleSelectStore(store.id)}
                      className="text-[#0071CE]"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Selected Store Summary */}
          {selectedStore && (
            <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold mb-2">Selected Store</h3>
              <div className="text-sm">
                <p className="font-medium">
                  {stores.find(s => s.id === selectedStore)?.name}
                </p>
                <p className="text-gray-600">
                  {stores.find(s => s.id === selectedStore)?.address}
                </p>
                <p className="text-[#0071CE] font-medium mt-2">
                  Ready for pickup in 30 minutes
                </p>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleConfirmStore}
              disabled={!selectedStore}
              className="w-full bg-[#0071CE] hover:bg-blue-700 disabled:opacity-50"
            >
              Confirm Store Selection
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/delivery-options')}
            >
              Back to Delivery Options
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;

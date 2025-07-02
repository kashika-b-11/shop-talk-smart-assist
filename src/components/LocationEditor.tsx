
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useLocation } from '@/contexts/LocationContext';

interface Store {
  id: string;
  name: string;
  address: string;
  distance: string;
  timing: string;
}

const LocationEditor = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [nearbyStores, setNearbyStores] = useState<Store[]>([]);
  const { 
    currentLocation, 
    isLoadingLocation, 
    getCurrentLocation, 
    searchLocation: searchLocationContext,
    setCurrentLocation 
  } = useLocation();

  const mockStores: Store[] = [
    {
      id: '1',
      name: 'Walmart Store - MG Road',
      address: '145, MG Road, Bangalore, Karnataka 560001',
      distance: '0.5 km',
      timing: 'Open 24 hours'
    },
    {
      id: '2',
      name: 'Walmart Store - Brigade Road',
      address: '78, Brigade Road, Bangalore, Karnataka 560025',
      distance: '1.2 km',
      timing: '7:00 AM - 11:00 PM'
    },
    {
      id: '3',
      name: 'Walmart Store - Koramangala',
      address: '34, 80 Feet Road, Koramangala, Bangalore, Karnataka 560034',
      distance: '2.8 km',
      timing: '6:00 AM - 10:00 PM'
    },
    {
      id: '4',
      name: 'Walmart Store - Indiranagar',
      address: '23, 100 Feet Road, Indiranagar, Bangalore, Karnataka 560038',
      distance: '3.1 km',
      timing: '7:00 AM - 11:00 PM'
    }
  ];

  useEffect(() => {
    setNearbyStores(mockStores);
  }, []);

  const handleLocationSearch = async () => {
    if (searchLocation.trim()) {
      await searchLocationContext(searchLocation);
      setSearchLocation('');
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      await getCurrentLocation();
    } catch (error) {
      console.error('Failed to get current location:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Location */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Current Location</h3>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <MapPin className="text-[#0071CE]" size={20} />
            <span className="flex-1">{currentLocation}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleUseCurrentLocation}
              disabled={isLoadingLocation}
              className="flex items-center space-x-2"
            >
              <Navigation size={16} />
              <span>{isLoadingLocation ? 'Loading...' : 'Use Current'}</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Search New Location */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Change Location</h3>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter area, landmark, or pincode..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
          />
          <Button onClick={handleLocationSearch} className="bg-[#0071CE] hover:bg-blue-700">
            <Search size={16} />
          </Button>
        </div>
      </div>

      {/* Nearby Stores */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Nearby Walmart Stores</h3>
        <div className="space-y-3">
          {nearbyStores.map((store) => (
            <Card key={store.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-[#0071CE]">{store.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{store.address}</p>
                  <p className="text-sm text-gray-500 mt-1">{store.timing}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">{store.distance}</span>
                  <div className="mt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setCurrentLocation(store.address);
                      }}
                    >
                      Select Store
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationEditor;

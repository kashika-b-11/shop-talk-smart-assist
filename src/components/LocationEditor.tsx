
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader } from '@googlemaps/js-api-loader';

interface Store {
  id: string;
  name: string;
  address: string;
  distance: string;
  timing: string;
}

const LocationEditor = () => {
  const [currentLocation, setCurrentLocation] = useState('MG Road, Bangalore, Karnataka 560001, India');
  const [searchLocation, setSearchLocation] = useState('');
  const [nearbyStores, setNearbyStores] = useState<Store[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

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
    initializeGoogleMaps();
  }, []);

  const initializeGoogleMaps = async () => {
    try {
      // Note: In a real app, you would use an actual Google Maps API key
      // For now, we'll simulate the map loading
      setTimeout(() => {
        setMapLoaded(true);
      }, 1000);
    } catch (error) {
      console.error('Google Maps API not available:', error);
      setMapLoaded(true); // Still show the interface
    }
  };

  const handleLocationSearch = () => {
    if (searchLocation.trim()) {
      setCurrentLocation(searchLocation);
      console.log('Searching for:', searchLocation);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`Current Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          console.log('Current position:', { latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
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
              onClick={getCurrentLocation}
              className="flex items-center space-x-2"
            >
              <Navigation size={16} />
              <span>Use Current</span>
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

      {/* Google Maps Integration */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Map View</h3>
        <Card className="p-4">
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            {mapLoaded ? (
              <div className="text-center">
                <MapPin size={48} className="mx-auto text-[#0071CE] mb-2" />
                <p className="text-gray-600">Interactive Map Ready</p>
                <p className="text-sm text-gray-500">Google Maps integration active</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0071CE] mx-auto mb-2"></div>
                <p className="text-gray-600">Loading Google Maps...</p>
              </div>
            )}
          </div>
        </Card>
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
                    <Button size="sm" variant="outline">
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

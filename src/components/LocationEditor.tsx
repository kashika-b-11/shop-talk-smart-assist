
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

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
      setCurrentLocation(searchLocation);
      toast({
        title: "Location Updated",
        description: `Location changed to: ${searchLocation}`,
      });
      console.log('Searching for:', searchLocation);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use a reliable reverse geocoding service
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'Walmart-Shopping-App'
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data && data.display_name) {
              setCurrentLocation(data.display_name);
              toast({
                title: "Location Found",
                description: "Your current location has been set successfully.",
              });
            } else {
              // Fallback to coordinates with city format
              const coordsLocation = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
              setCurrentLocation(coordsLocation);
              toast({
                title: "Location Set",
                description: "Location coordinates have been set.",
              });
            }
          } else {
            const coordsLocation = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            setCurrentLocation(coordsLocation);
            toast({
              title: "Location Set",
              description: "Location coordinates have been set.",
            });
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          const coordsLocation = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          setCurrentLocation(coordsLocation);
          toast({
            title: "Location Set",
            description: "Location coordinates have been set.",
          });
        }
        
        setIsLoadingLocation(false);
        console.log('Current position:', { latitude, longitude });
      },
      (error) => {
        setIsLoadingLocation(false);
        let errorMessage = "Unable to retrieve your location.";
        
        switch (error.code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions in your browser.";
            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case GeolocationPositionError.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive"
        });
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
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
                        toast({
                          title: "Store Selected",
                          description: `Selected ${store.name}`,
                        });
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

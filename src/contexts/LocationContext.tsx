import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LocationContextType {
  currentLocation: string;
  coordinates: { lat: number; lng: number } | null;
  isLoadingLocation: boolean;
  setCurrentLocation: (location: string) => void;
  setCoordinates: (coords: { lat: number; lng: number } | null) => void;
  getCurrentLocation: () => Promise<void>;
  searchLocation: (query: string) => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocation, setCurrentLocation] = useState('Select your location');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  const formatAddress = (data: any): string => {
    // Extract meaningful location parts
    const city = data.address?.city || data.address?.town || data.address?.village;
    const state = data.address?.state;
    const country = data.address?.country;
    const pincode = data.address?.postcode;
    
    if (city && state && country) {
      return pincode ? `${city}, ${state} ${pincode}, ${country}` : `${city}, ${state}, ${country}`;
    }
    
    // Fallback to display_name but clean it up
    return data.display_name?.split(',').slice(0, 3).join(', ') || data.display_name;
  };

  const getCurrentLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingLocation(true);
    
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          
          try {
            console.log('Fetching location for:', { latitude, longitude });
            
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
              {
                headers: {
                  'User-Agent': 'Walmart-Shopping-App/1.0'
                }
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              console.log('Geocoding response:', data);
              
              if (data && data.display_name) {
                const formattedAddress = formatAddress(data);
                setCurrentLocation(formattedAddress);
                toast({
                  title: "Location Found",
                  description: `Set to: ${formattedAddress}`,
                });
              } else {
                throw new Error('No address data received');
              }
            } else {
              throw new Error('Geocoding API failed');
            }
          } catch (error) {
            console.error('Geocoding error:', error);
            // Fallback to coordinates
            const coordsLocation = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            setCurrentLocation(coordsLocation);
            toast({
              title: "Location Set",
              description: "Using coordinates as location address lookup failed.",
            });
          }
          
          setIsLoadingLocation(false);
          resolve();
        },
        (error) => {
          setIsLoadingLocation(false);
          let errorMessage = "Unable to retrieve your location.";
          
          switch (error.code) {
            case GeolocationPositionError.PERMISSION_DENIED:
              errorMessage = "Location access denied. Please enable location permissions and try again.";
              break;
            case GeolocationPositionError.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable. Please try again or enter manually.";
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
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  };

  const searchLocation = async (query: string): Promise<void> => {
    if (!query.trim()) return;
    
    setIsLoadingLocation(true);
    
    try {
      console.log('Searching for location:', query);
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'Walmart-Shopping-App/1.0'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Location search response:', data);
        
        if (data && data.length > 0) {
          const location = data[0];
          const formattedAddress = formatAddress(location);
          setCurrentLocation(formattedAddress);
          setCoordinates({ 
            lat: parseFloat(location.lat), 
            lng: parseFloat(location.lon) 
          });
          
          toast({
            title: "Location Updated",
            description: `Set to: ${formattedAddress}`,
          });
        } else {
          // If no results, just use the search query
          setCurrentLocation(query);
          toast({
            title: "Location Set",
            description: `Set to: ${query}`,
          });
        }
      } else {
        throw new Error('Location search failed');
      }
    } catch (error) {
      console.error('Location search error:', error);
      // Fallback to using the search query as location
      setCurrentLocation(query);
      toast({
        title: "Location Set",
        description: `Set to: ${query} (search failed, using manual entry)`,
      });
    }
    
    setIsLoadingLocation(false);
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        coordinates,
        isLoadingLocation,
        setCurrentLocation,
        setCoordinates,
        getCurrentLocation,
        searchLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Great Indian Festival",
      subtitle: "Up to 80% off on Electronics",
      description: "Shop the biggest deals of the year",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop",
      cta: "Shop Now",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-600"
    },
    {
      id: 2,
      title: "Smart Shopping Assistant",
      subtitle: "AI-Powered Shopping Experience",
      description: "Chat or speak to find products instantly",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      cta: "Try AI Assistant",
      bgColor: "bg-gradient-to-r from-blue-600 to-indigo-700"
    },
    {
      id: 3,
      title: "Fresh Groceries",
      subtitle: "Farm to Your Doorstep",
      description: "Get fresh vegetables and fruits delivered",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop",
      cta: "Order Fresh",
      bgColor: "bg-gradient-to-r from-green-500 to-emerald-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-96 overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`${banner.bgColor} h-full flex items-center`}>
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-white space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold">{banner.title}</h1>
                  <h2 className="text-2xl md:text-3xl font-semibold opacity-90">
                    {banner.subtitle}
                  </h2>
                  <p className="text-lg opacity-80">{banner.description}</p>
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
                  >
                    {banner.cta}
                  </Button>
                </div>
                <div className="hidden md:block">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="rounded-lg shadow-2xl max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="sm"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;

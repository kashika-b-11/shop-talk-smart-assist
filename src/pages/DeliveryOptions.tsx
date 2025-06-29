
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Truck, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const DeliveryOptions = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('express');

  const deliveryOptions = [
    {
      id: 'express',
      title: 'Express Delivery',
      subtitle: 'Fastest delivery option',
      time: '1-2 hours',
      price: 99,
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      badge: 'Popular',
      features: ['Priority handling', 'Real-time tracking', 'Contactless delivery']
    },
    {
      id: 'standard',
      title: 'Standard Delivery',
      subtitle: 'Regular delivery service',
      time: '2-4 hours',
      price: 49,
      icon: <Clock className="w-6 h-6 text-green-600" />,
      badge: null,
      features: ['Free delivery on orders above ₹499', 'SMS updates', 'Safe delivery']
    },
    {
      id: 'scheduled',
      title: 'Scheduled Delivery',
      subtitle: 'Choose your preferred time',
      time: 'Select slot',
      price: 29,
      icon: <Calendar className="w-6 h-6 text-purple-600" />,
      badge: 'Flexible',
      features: ['Choose delivery time', 'Morning/Evening slots', 'Advance booking']
    },
    {
      id: 'pickup',
      title: 'Store Pickup',
      subtitle: 'Collect from nearest store',
      time: 'Ready in 30 mins',
      price: 0,
      icon: <MapPin className="w-6 h-6 text-orange-600" />,
      badge: 'Free',
      features: ['No delivery charges', 'Quick collection', 'Store assistance']
    }
  ];

  const timeSlots = [
    { time: '9:00 AM - 11:00 AM', available: true },
    { time: '11:00 AM - 1:00 PM', available: true },
    { time: '1:00 PM - 3:00 PM', available: false },
    { time: '3:00 PM - 5:00 PM', available: true },
    { time: '5:00 PM - 7:00 PM', available: true },
    { time: '7:00 PM - 9:00 PM', available: true }
  ];

  const handleContinue = () => {
    if (selectedOption === 'pickup') {
      navigate('/store-locator');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/checkout')}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Choose Delivery Option</h1>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4 mb-6">
            {deliveryOptions.map((option) => (
              <Card 
                key={option.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedOption === option.id 
                    ? 'ring-2 ring-[#0071CE] border-[#0071CE]' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{option.title}</h3>
                        {option.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {option.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{option.subtitle}</p>
                      <p className="text-sm font-medium text-[#0071CE]">{option.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {option.price === 0 ? 'Free' : `₹${option.price}`}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => setSelectedOption(option.id)}
                        className="text-[#0071CE]"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {option.features.map((feature, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Time Slots for Scheduled Delivery */}
          {selectedOption === 'scheduled' && (
            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-4">Select Time Slot</h3>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      slot.available
                        ? 'border-gray-200 hover:border-[#0071CE] hover:bg-blue-50'
                        : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!slot.available}
                  >
                    {slot.time}
                    {!slot.available && (
                      <div className="text-xs text-red-500 mt-1">Not Available</div>
                    )}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Summary */}
          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-4">Delivery Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Selected Option</span>
                <span className="font-medium">
                  {deliveryOptions.find(opt => opt.id === selectedOption)?.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Time</span>
                <span className="font-medium">
                  {deliveryOptions.find(opt => opt.id === selectedOption)?.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="font-medium">
                  {deliveryOptions.find(opt => opt.id === selectedOption)?.price === 0 
                    ? 'Free' 
                    : `₹${deliveryOptions.find(opt => opt.id === selectedOption)?.price}`
                  }
                </span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleContinue}
              className="w-full bg-[#0071CE] hover:bg-blue-700"
            >
              Continue with Selected Option
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/checkout')}
            >
              Back to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;


import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, CheckCircle, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';

const DeliveryTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || `WM${Date.now().toString().slice(-6)}`;
  
  const [currentStep, setCurrentStep] = useState(2);
  
  const deliverySteps = [
    {
      id: 1,
      title: "Order Confirmed",
      description: "Your order has been confirmed and is being prepared",
      time: "2:30 PM",
      icon: CheckCircle,
      completed: true
    },
    {
      id: 2,
      title: "Order Packed",
      description: "Your items have been packed and ready for dispatch",
      time: "3:15 PM",
      icon: Package,
      completed: true
    },
    {
      id: 3,
      title: "Out for Delivery",
      description: "Your order is on the way to your delivery address",
      time: "Expected 4:00 PM",
      icon: Truck,
      completed: false,
      current: true
    },
    {
      id: 4,
      title: "Delivered",
      description: "Order delivered successfully to your address",
      time: "Expected 4:30 PM",
      icon: MapPin,
      completed: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      }
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/profile')}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Track Your Order</h1>
              <p className="text-gray-600">Order #{orderId}</p>
            </div>
          </div>

          {/* Delivery Progress */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Delivery Status</h2>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                In Transit
              </Badge>
            </div>
            
            <div className="space-y-6">
              {deliverySteps.map((step, index) => {
                const IconComponent = step.icon;
                const isCompleted = step.completed || currentStep > step.id;
                const isCurrent = currentStep === step.id;
                
                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-green-100 text-green-600' 
                          : isCurrent 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        <IconComponent size={20} />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${
                          isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </h3>
                        <span className={`text-sm ${
                          isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.time}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                      
                      {isCurrent && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2 text-sm text-blue-600">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            <span>Currently in progress</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {index < deliverySteps.length - 1 && (
                      <div className={`absolute left-9 mt-10 w-0.5 h-6 ${
                        currentStep > step.id ? 'bg-green-300' : 'bg-gray-200'
                      }`} style={{ marginLeft: '1.25rem' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Delivery Details */}
          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-4">Delivery Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium">Today, 4:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Address</span>
                <span className="font-medium text-right">MG Road, Bangalore, Karnataka 560001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Partner</span>
                <span className="font-medium">Walmart Express</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-[#0071CE] hover:bg-blue-700"
              onClick={() => navigate('/profile')}
            >
              View Order Details
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;

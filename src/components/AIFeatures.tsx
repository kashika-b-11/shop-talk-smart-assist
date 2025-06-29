
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  MapPin, 
  Zap, 
  Target, 
  Truck,
  Mic,
  Camera,
  Navigation
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIFeatures = () => {
  const { toast } = useToast();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const handleSmartShopping = () => {
    setActiveFeature('shopping');
    toast({
      title: "Smart Shopping Activated",
      description: "AI is now analyzing your shopping patterns and preferences.",
    });
    
    // Simulate voice recognition
    setTimeout(() => {
      toast({
        title: "Voice Command Ready",
        description: "Say 'Add milk and bread to my list' to get started!",
      });
      setActiveFeature(null);
    }, 2000);
  };

  const handleARNavigation = () => {
    setActiveFeature('ar');
    toast({
      title: "AR Navigation Starting",
      description: "Point your camera at any aisle to see product locations.",
    });
    
    // Simulate AR activation
    setTimeout(() => {
      toast({
        title: "AR Mode Active",
        description: "Camera overlay ready - look for blue highlights on products!",
      });
      setActiveFeature(null);
    }, 3000);
  };

  const handleIntelligentCheckout = () => {
    setActiveFeature('checkout');
    toast({
      title: "Smart Checkout Ready",
      description: "AI cart scanning activated. Add items to see instant price checks.",
    });
    
    setTimeout(() => {
      toast({
        title: "Price Check Active",
        description: "All cart items are being monitored for best prices!",
      });
      setActiveFeature(null);
    }, 2000);
  };

  const handlePersonalizedAssistant = () => {
    setActiveFeature('assistant');
    toast({
      title: "Personal Assistant Activated",
      description: "Learning your preferences across all shopping channels.",
    });
    
    setTimeout(() => {
      toast({
        title: "Preferences Updated",
        description: "AI now knows your dietary preferences and shopping habits!",
      });
      setActiveFeature(null);
    }, 2500);
  };

  const handleDeliveryIntelligence = () => {
    setActiveFeature('delivery');
    toast({
      title: "Delivery Optimization Started",
      description: "Analyzing traffic patterns and your schedule for best delivery time.",
    });
    
    setTimeout(() => {
      toast({
        title: "Optimal Delivery Window Found",
        description: "Best delivery time: Tomorrow 2-4 PM (avoiding traffic!)",
      });
      setActiveFeature(null);
    }, 3000);
  };

  const features = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-[#0071CE]" />,
      title: "Smart Shopping Companion",
      description: "AI suggests complete meal plans and optimizes your budget with natural language shopping lists.",
      badge: "Voice Enabled",
      action: handleSmartShopping,
      buttonText: "Start Voice Shopping",
      buttonIcon: <Mic className="w-4 h-4" />
    },
    {
      icon: <MapPin className="w-8 h-8 text-[#0071CE]" />,
      title: "AR Navigation & Product Finder",
      description: "Point your camera at any aisle to see AR overlays showing exact product locations.",
      badge: "AR Powered",
      action: handleARNavigation,
      buttonText: "Enable AR Mode",
      buttonIcon: <Camera className="w-4 h-4" />
    },
    {
      icon: <Zap className="w-8 h-8 text-[#0071CE]" />,
      title: "Intelligent Checkout",
      description: "AI-powered cart scanning with dynamic queue management and instant price checks.",
      badge: "Real-time",
      action: handleIntelligentCheckout,
      buttonText: "Activate Smart Scan",
      buttonIcon: <Zap className="w-4 h-4" />
    },
    {
      icon: <Target className="w-8 h-8 text-[#0071CE]" />,
      title: "Hyper-Personalized Assistant",
      description: "AI remembers your preferences across all channels and suggests smart substitutions.",
      badge: "Personalized",
      action: handlePersonalizedAssistant,
      buttonText: "Personalize Experience",
      buttonIcon: <Target className="w-4 h-4" />
    },
    {
      icon: <Truck className="w-8 h-8 text-[#0071CE]" />,
      title: "Omnichannel Delivery Intelligence",
      description: "AI-optimized delivery windows based on your schedule and traffic patterns.",
      badge: "Smart Delivery",
      action: handleDeliveryIntelligence,
      buttonText: "Optimize Delivery",
      buttonIcon: <Navigation className="w-4 h-4" />
    }
  ];

  return (
    <div className="mt-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI-Powered Shopping Features
        </h2>
        <p className="text-gray-600">
          Experience the future of retail with our innovative AI solutions
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {feature.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {feature.description}
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-[#0071CE] hover:bg-blue-700"
                  onClick={feature.action}
                  disabled={activeFeature === feature.title.toLowerCase().replace(/[^a-z]/g, '')}
                >
                  {feature.buttonIcon}
                  <span className="ml-2">{feature.buttonText}</span>
                  {activeFeature === feature.title.toLowerCase().replace(/[^a-z]/g, '') && (
                    <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIFeatures;


import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  MapPin, 
  Zap, 
  Target, 
  Truck 
} from 'lucide-react';

const AIFeatures = () => {
  const features = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-[#0071CE]" />,
      title: "Smart Shopping Companion",
      description: "AI suggests complete meal plans and optimizes your budget with natural language shopping lists.",
      badge: "Voice Enabled"
    },
    {
      icon: <MapPin className="w-8 h-8 text-[#0071CE]" />,
      title: "AR Navigation & Product Finder",
      description: "Point your camera at any aisle to see AR overlays showing exact product locations.",
      badge: "AR Powered"
    },
    {
      icon: <Zap className="w-8 h-8 text-[#0071CE]" />,
      title: "Intelligent Checkout",
      description: "AI-powered cart scanning with dynamic queue management and instant price checks.",
      badge: "Real-time"
    },
    {
      icon: <Target className="w-8 h-8 text-[#0071CE]" />,
      title: "Hyper-Personalized Assistant",
      description: "AI remembers your preferences across all channels and suggests smart substitutions.",
      badge: "Personalized"
    },
    {
      icon: <Truck className="w-8 h-8 text-[#0071CE]" />,
      title: "Omnichannel Delivery Intelligence",
      description: "AI-optimized delivery windows based on your schedule and traffic patterns.",
      badge: "Smart Delivery"
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
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIFeatures;


import React from 'react';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderId = `WM${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll send you tracking information shortly.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Package size={20} className="text-[#0071CE]" />
                <span className="font-semibold">Order #{orderId}</span>
              </div>
              <p className="text-sm text-gray-600">
                Estimated delivery: 2-3 hours
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/profile')}
                className="w-full bg-[#0071CE] hover:bg-blue-700"
              >
                Track Your Order
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft size={16} className="mr-2" />
                Continue Shopping
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

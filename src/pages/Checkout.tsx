
import React, { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Truck, Calendar, QrCode, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: user?.name || '',
    phone: '+91 9876543210',
    address: 'MG Road, Bangalore, Karnataka 560001',
    pincode: '560001'
  });

  const deliveryCharge = deliveryOption === 'delivery' ? 40 : 0;
  const totalAmount = getTotalPrice() + deliveryCharge;

  const handlePaymentProcess = () => {
    setShowPaymentDialog(true);
  };

  const processPayment = async () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
        toast({
          title: "Payment Error",
          description: "Please fill in all card details",
          variant: "destructive"
        });
        setIsProcessingPayment(false);
        return;
      }
    }
    
    // Process order
    console.log('Order placed:', {
      items,
      deliveryOption,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      paymentDetails: paymentMethod === 'card' ? paymentDetails : null
    });
    
    toast({
      title: "Payment Successful",
      description: "Your order has been placed successfully!"
    });
    
    clearCart();
    setIsProcessingPayment(false);
    setShowPaymentDialog(false);
    navigate('/order-confirmation');
  };

  const generateQRCode = () => {
    // In a real app, this would generate a UPI QR code
    return `upi://pay?pa=walmart@paytm&pn=Walmart&am=${totalAmount}&cu=INR&tn=Order Payment`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Button onClick={() => navigate('/')} className="bg-[#0071CE] hover:bg-blue-700">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Options */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="delivery"
                      checked={deliveryOption === 'delivery'}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="text-[#0071CE]"
                    />
                    <Truck size={20} />
                    <div>
                      <p className="font-medium">Home Delivery</p>
                      <p className="text-sm text-gray-600">Delivery in 2-3 hours • ₹40</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={deliveryOption === 'pickup'}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="text-[#0071CE]"
                    />
                    <MapPin size={20} />
                    <div>
                      <p className="font-medium">Store Pickup</p>
                      <p className="text-sm text-gray-600">Ready in 1 hour • Free</p>
                    </div>
                  </label>
                </div>
              </Card>

              {/* Delivery Address */}
              {deliveryOption === 'delivery' && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={deliveryAddress.name}
                          onChange={(e) => setDeliveryAddress({...deliveryAddress, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={deliveryAddress.phone}
                          onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={deliveryAddress.address}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, address: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={deliveryAddress.pincode}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, pincode: e.target.value})}
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#0071CE]"
                    />
                    <CreditCard size={20} />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#0071CE]"
                    />
                    <Smartphone size={20} />
                    <span>UPI</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="qr"
                      checked={paymentMethod === 'qr'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#0071CE]"
                    />
                    <QrCode size={20} />
                    <span>QR Code Payment</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-[#0071CE]"
                    />
                    <Calendar size={20} />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card className="p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePaymentProcess}
                  className="w-full mt-6 bg-[#0071CE] hover:bg-blue-700"
                >
                  Place Order - ₹{totalAmount}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {paymentMethod === 'card' && 'Enter Card Details'}
              {paymentMethod === 'upi' && 'UPI Payment'}
              {paymentMethod === 'qr' && 'QR Code Payment'}
              {paymentMethod === 'cod' && 'Cash on Delivery'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={paymentDetails.cardholderName}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="text-center space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Pay using any UPI app</p>
                  <p className="font-mono text-lg">walmart@paytm</p>
                  <p className="text-sm text-gray-500">Amount: ₹{totalAmount}</p>
                </div>
                <p className="text-sm text-gray-600">
                  Complete the payment in your UPI app and click confirm below
                </p>
              </div>
            )}

            {paymentMethod === 'qr' && (
              <div className="text-center space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-48 h-48 mx-auto bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode size={64} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">QR Code</p>
                      <p className="text-xs text-gray-500">₹{totalAmount}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Scan this QR code with any UPI app to pay
                </p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="text-center space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Calendar size={48} className="mx-auto mb-2 text-gray-600" />
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-600">Pay ₹{totalAmount} when your order arrives</p>
                </div>
                <p className="text-sm text-gray-600">
                  Please keep exact change ready for faster delivery
                </p>
              </div>
            )}

            <Button
              onClick={processPayment}
              disabled={isProcessingPayment}
              className="w-full bg-[#0071CE] hover:bg-blue-700"
            >
              {isProcessingPayment ? 'Processing...' : `Confirm Payment - ₹${totalAmount}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;

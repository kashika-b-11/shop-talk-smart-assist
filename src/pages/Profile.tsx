
import React, { useState } from 'react';
import { User, MapPin, Package, CreditCard, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import LocationEditor from '@/components/LocationEditor';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 9876543210',
    address: 'MG Road, Bangalore, Karnataka 560001'
  });

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile:', profileData);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-06-25',
      status: 'Delivered',
      total: 1250,
      items: 5
    },
    {
      id: 'ORD002',
      date: '2024-06-20',
      status: 'In Transit',
      total: 850,
      items: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600">Manage your profile and preferences</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <Card className="lg:col-span-1 p-4 h-fit">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#0071CE] text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </Card>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleSave} className="bg-[#0071CE] hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </div>
                </Card>
              )}

              {activeTab === 'location' && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Location Settings</h2>
                  <LocationEditor />
                </Card>
              )}

              {activeTab === 'orders' && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order History</h2>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.date}</p>
                            <p className="text-sm text-gray-600">{order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#0071CE]">₹{order.total}</p>
                            <span className={`text-sm px-2 py-1 rounded ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {activeTab === 'payments' && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                  <p className="text-gray-600">Manage your saved payment methods</p>
                  <Button className="mt-4 bg-[#0071CE] hover:bg-blue-700">
                    Add Payment Method
                  </Button>
                </Card>
              )}

              {activeTab === 'settings' && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  <p className="text-gray-600">Manage your account preferences</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

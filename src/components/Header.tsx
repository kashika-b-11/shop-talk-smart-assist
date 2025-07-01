
import { MapPin, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import AuthDialog from './AuthDialog';
import LocationEditor from './LocationEditor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Header = () => {
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-[#0071CE] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLogoClick}
              className="text-2xl font-bold hover:opacity-80 transition-opacity cursor-pointer"
            >
              Walmart
            </button>
            <div className="hidden md:block text-sm opacity-90">Smart Shopping Assistant</div>
          </div>
          
          <div className="flex items-center space-x-6">
            <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-sm hover:bg-blue-600">
                  <MapPin size={16} />
                  <span className="hidden sm:inline">MG Road, Bangalore, Karnataka 560001, India</span>
                  <Edit2 size={14} className="opacity-70" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Change Location</DialogTitle>
                </DialogHeader>
                <LocationEditor />
              </DialogContent>
            </Dialog>
            <Cart />
            <AuthDialog />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

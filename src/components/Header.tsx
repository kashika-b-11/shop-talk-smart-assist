
import { ShoppingCart, User, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-[#0071CE] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">Walmart</div>
            <div className="hidden md:block text-sm opacity-90">Smart Shopping Assistant</div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin size={16} />
              <span className="hidden sm:inline">Store #1234 - Main St</span>
            </div>
            <button className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors">
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart (0)</span>
            </button>
            <button className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors">
              <User size={20} />
              <span className="hidden sm:inline">Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

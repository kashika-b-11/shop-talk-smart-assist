
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

import toysImg from '../Assets/category_grid/toys.png';
import sportsImg from '../Assets/category_grid/sports.png';
import groceriesImg from '../Assets/category_grid/groceries.png';

const CategoryGrid = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
      discount: "Up to 70% off"
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
      discount: "Min 40% off"
    },
    {
      id: 3,
      name: "Home & Kitchen",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
      discount: "Up to 60% off"
    },
    {
      id: 4,
      name: "Groceries",
      image: groceriesImg,
      discount: "Fresh & Fast"
    },
    {
      id: 5,
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
      discount: "Up to 50% off"
    },
    {
      id: 6,
      name: "Sports",
      image: sportsImg,
      discount: "Best Prices"
    },
    {
      id: 7,
      name: "Books",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop",
      discount: "Up to 30% off"
    },
    {
      id: 8,
      name: "Toys",
      image: toysImg,
      discount: "Fun Deals"
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    console.log('Category clicked:', categoryName);
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    navigate(`/category/${categorySlug}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
              <p className="text-xs text-green-600">{category.discount}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;

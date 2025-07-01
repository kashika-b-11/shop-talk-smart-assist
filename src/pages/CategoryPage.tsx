
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/types/product';
import { getProductsByCategory } from '@/services/productService';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      if (!category) return;
      
      setIsLoading(true);
      try {
        const categoryProducts = await getProductsByCategory(category);
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error loading category products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryProducts();
  }, [category]);

  const categoryDisplayName = category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {categoryDisplayName}
            </h1>
            <p className="text-gray-600">
              Discover our best {categoryDisplayName.toLowerCase()} products
            </p>
          </div>

          <ProductGrid 
            products={products} 
            isLoading={isLoading}
            gridLayout="large"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import InfiniteProductGrid from '@/components/InfiniteProductGrid';
import { Product } from '@/types/product';
import { getProductsByCategory } from '@/services/productService';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  const loadMoreProducts = async (page: number, limit: number = 8) => {
    if (!category) return [];
    return await getProductsByCategory(category, { page, limit });
  };

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

          <InfiniteProductGrid 
            loadMoreProducts={loadMoreProducts}
            gridLayout="large"
            key={category}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

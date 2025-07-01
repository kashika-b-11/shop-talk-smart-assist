
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/types/product';
import { searchProducts } from '@/services/productService';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const searchResults = await searchProducts(query);
        setProducts(searchResults);
      } catch (error) {
        console.error('Error loading search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSearchResults();
  }, [query]);

  const handleRefresh = () => {
    const loadSearchResults = async () => {
      setIsLoading(true);
      try {
        const searchResults = await searchProducts(query);
        setProducts(searchResults);
      } catch (error) {
        console.error('Error loading search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSearchResults();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            <p className="text-gray-600">
              {query ? `Results for "${query}"` : 'Please enter a search term'}
            </p>
          </div>

          <ProductGrid 
            products={products} 
            isLoading={isLoading}
            onRefresh={handleRefresh}
            gridLayout="large"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

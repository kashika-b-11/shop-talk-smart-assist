
import { useState, useEffect, useCallback, useRef } from 'react';
import { Product } from '@/types/product';
import ProductCards from './ProductCards';
import { Loader2 } from 'lucide-react';

interface InfiniteProductGridProps {
  initialProducts?: Product[];
  onLoadMore?: (page: number) => Promise<Product[]>;
  loadMoreProducts?: (page: number, limit: number) => Promise<Product[]>;
  hasMore?: boolean;
  gridLayout?: 'compact' | 'large';
}

const InfiniteProductGrid = ({ 
  initialProducts = [], 
  onLoadMore, 
  loadMoreProducts,
  hasMore = true,
  gridLayout = 'compact' 
}: InfiniteProductGridProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(hasMore);
  const observerRef = useRef<IntersectionObserver>();
  const lastProductElementRef = useRef<HTMLDivElement>(null);

  // Load initial products if loadMoreProducts is provided
  useEffect(() => {
    if (loadMoreProducts && products.length === 0) {
      setIsInitialLoading(true);
      loadMoreProducts(1, 8).then((initialProducts) => {
        setProducts(initialProducts);
        setIsInitialLoading(false);
        setPage(1);
      }).catch(() => {
        setIsInitialLoading(false);
      });
    } else if (initialProducts.length > 0) {
      setProducts(initialProducts);
      setPage(1);
      setHasMoreData(hasMore);
      setIsInitialLoading(false);
    }
  }, [loadMoreProducts, initialProducts, hasMore]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMoreData) return;

    setLoading(true);
    try {
      let newProducts: Product[] = [];
      
      if (onLoadMore) {
        newProducts = await onLoadMore(page + 1);
      } else if (loadMoreProducts) {
        newProducts = await loadMoreProducts(page + 1, 8);
      }
      
      if (newProducts.length === 0) {
        setHasMoreData(false);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading more products:', error);
      setHasMoreData(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMoreData, page, onLoadMore, loadMoreProducts]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (loading) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    if (lastProductElementRef.current) {
      observerRef.current.observe(lastProductElementRef.current);
    }
    
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMore, hasMoreData, loading]);

  return (
    <div className="space-y-6">
      <ProductCards 
        products={products} 
        layout={gridLayout === 'large' ? 'grid' : 'grid'}
      />
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-[--primary]" />
          <span className="ml-2 text-sm text-gray-600">Loading more products...</span>
        </div>
      )}
      
      {/* Intersection observer target */}
      {hasMoreData && !loading && (
        <div ref={lastProductElementRef} className="h-4" />
      )}
      
      {/* End message */}
      {!hasMoreData && products.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>You've seen all available products</p>
        </div>
      )}
    </div>
  );
};

export default InfiniteProductGrid;

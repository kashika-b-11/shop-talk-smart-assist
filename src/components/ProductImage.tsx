
import { useState, useEffect, useRef } from 'react';
import { Loader2, ImageIcon } from 'lucide-react';
import { fetchProductImage, getCategoryFallbackImage } from '@/services/unsplashService';

interface ProductImageProps {
  productName: string;
  category?: string;
  className?: string;
  alt?: string;
  fallbackImage?: string;
}

const ProductImage = ({ 
  productName, 
  category, 
  className = '', 
  alt,
  fallbackImage 
}: ProductImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Fetch image when component comes into view
  useEffect(() => {
    if (!isInView) return;

    const loadImage = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const url = await fetchProductImage(productName, category);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading product image:', error);
        setHasError(true);
        setImageUrl(fallbackImage || getCategoryFallbackImage(category || 'groceries'));
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [isInView, productName, category, fallbackImage]);

  const handleImageError = () => {
    setHasError(true);
    setImageUrl(fallbackImage || getCategoryFallbackImage(category || 'groceries'));
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Blurred placeholder while loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <span className="text-xs text-gray-500">Loading image...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200">
          <div className="flex flex-col items-center space-y-2 text-gray-400">
            <ImageIcon className="w-8 h-8" />
            <span className="text-xs text-center">No image available</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt || productName}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />

      {/* Shimmer effect while loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;

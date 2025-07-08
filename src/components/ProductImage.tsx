
import { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';
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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await fetchProductImage(productName, category);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading product image:', error);
        setHasError(true);
        setImageUrl(fallbackImage || getCategoryFallbackImage(category || 'electronics'));
      }
    };

    loadImage();
  }, [productName, category, fallbackImage]);

  const handleImageError = () => {
    setHasError(true);
    setImageUrl(fallbackImage || getCategoryFallbackImage(category || 'electronics'));
  };

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Error state */}
      {hasError && !imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200">
          <div className="flex flex-col items-center space-y-2 text-gray-400">
            <ImageIcon className="w-8 h-8" />
            <span className="text-xs text-center">No image available</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={alt || productName}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ProductImage;


interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    thumb: string;
  };
  alt_description: string | null;
}

interface UnsplashResponse {
  results: UnsplashImage[];
  total: number;
}

// Image cache to store fetched URLs
const imageCache = new Map<string, string>();

// Get cache from localStorage on initialization
const initializeCache = () => {
  try {
    const stored = localStorage.getItem('unsplash_image_cache');
    if (stored) {
      const parsedCache = JSON.parse(stored);
      Object.entries(parsedCache).forEach(([key, value]) => {
        imageCache.set(key, value as string);
      });
    }
  } catch (error) {
    console.warn('Failed to load image cache from localStorage');
  }
};

// Save cache to localStorage
const saveCache = () => {
  try {
    const cacheObject = Object.fromEntries(imageCache);
    localStorage.setItem('unsplash_image_cache', JSON.stringify(cacheObject));
  } catch (error) {
    console.warn('Failed to save image cache to localStorage');
  }
};

// Initialize cache on module load
initializeCache();

export const fetchProductImage = async (
  productName: string,
  category?: string
): Promise<string> => {
  // Check cache first
  const cacheKey = `${productName}-${category || ''}`.toLowerCase();
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  // Fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&crop=center';

  try {
    // For now, we'll use a public access key approach
    // In production, this should be handled through a backend service
    const ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // This would need to be set
    
    if (!ACCESS_KEY || ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
      console.warn('Unsplash API key not configured, using fallback images');
      return fallbackImage;
    }

    // Create search query from product name and category
    const searchQuery = `${productName} ${category || ''}`.trim();
    
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=squarish`,
      {
        headers: {
          'Authorization': `Client-ID ${ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data: UnsplashResponse = await response.json();
    
    if (data.results && data.results.length > 0) {
      const imageUrl = data.results[0].urls.small;
      
      // Cache the result
      imageCache.set(cacheKey, imageUrl);
      saveCache();
      
      return imageUrl;
    }
    
    return fallbackImage;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return fallbackImage;
  }
};

// Get a category-based fallback image
export const getCategoryFallbackImage = (category: string): string => {
  const categoryImages: Record<string, string> = {
    'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
    'fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    'groceries': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
    'beauty': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    'home & kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    'sports': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop',
    'books': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    'toys': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop'
  };

  return categoryImages[category.toLowerCase()] || categoryImages['groceries'];
};

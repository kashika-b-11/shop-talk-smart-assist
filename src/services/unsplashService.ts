
interface GoogleImageResult {
  link: string;
  title: string;
  displayLink: string;
}

interface GoogleSearchResponse {
  items?: GoogleImageResult[];
}

// Image cache to store fetched URLs
const imageCache = new Map<string, string>();

// Get cache from localStorage on initialization
const initializeCache = () => {
  try {
    const stored = localStorage.getItem('google_image_cache');
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
    localStorage.setItem('google_image_cache', JSON.stringify(cacheObject));
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
    // Use Google Custom Search API with the provided key
    const API_KEY = 'AIzaSyCSi26huzn03fPv_zqf_-xvmOS1AuWUy6k';
    const CX = '017576662512468239146:omuauf_lfve'; // Default Custom Search Engine ID
    
    // Create search query from product name and category
    const searchQuery = `${productName} ${category || 'product'}`.trim();
    
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(searchQuery)}&searchType=image&num=1&imgSize=medium&safe=active`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`Google Custom Search API error: ${response.status}`);
    }

    const data: GoogleSearchResponse = await response.json();
    
    if (data.items && data.items.length > 0) {
      const imageUrl = data.items[0].link;
      
      // Cache the result
      imageCache.set(cacheKey, imageUrl);
      saveCache();
      
      return imageUrl;
    }
    
    return fallbackImage;
  } catch (error) {
    console.error('Error fetching image from Google:', error);
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

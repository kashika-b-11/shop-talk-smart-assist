
import { Product } from '@/types/product';
import { searchProducts, getProductsByCategory } from './productService';

export interface CartItem extends Product {
  quantity: number;
}

export interface ShopTalkState {
  currentProducts: Product[];
  cart: CartItem[];
  currentStep: 'browsing' | 'cart' | 'payment' | 'order_confirmed';
  lastSearchQuery: string;
}

class ShopTalkService {
  private state: ShopTalkState = {
    currentProducts: [],
    cart: [],
    currentStep: 'browsing',
    lastSearchQuery: ''
  };

  // Enhanced product search with better keyword matching and filtering
  async searchProducts(query: string): Promise<{ products: Product[], message: string, shouldNavigate?: boolean, navigationPath?: string }> {
    const cleanQuery = query.toLowerCase().trim();
    
    if (this.isShoppingQuery(cleanQuery)) {
      try {
        console.log('Searching for products with query:', query);
        
        // Extract price range if mentioned
        const priceMatch = cleanQuery.match(/under\s+(\d+(?:,\d+)*)/);
        const maxPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : null;
        
        // Extract main product category/type
        const productKeywords = this.extractProductKeywords(cleanQuery);
        
        let products = await searchProducts(query);
        
        // Filter products based on relevance and price
        if (products.length > 0) {
          products = this.filterRelevantProducts(products, productKeywords, maxPrice);
        }
        
        // If no results, try alternative searches
        if (products.length === 0) {
          products = await this.tryBetterSearch(cleanQuery, maxPrice);
        }
        
        this.state.currentProducts = products;
        this.state.lastSearchQuery = query;
        
        console.log('Search results:', products.length, 'relevant products found');
        
        if (products.length === 0) {
          return {
            products: [],
            message: `Sorry, I couldn't find products matching "${query}". Try searching for:\n• Electronics: "phone", "laptop", "headphones"\n• Fashion: "shirt", "jeans", "shoes"\n• Groceries: "rice", "oil", "snacks"\n• Beauty: "shampoo", "cream", "perfume"`
          };
        }
        
        let message = `Great! I found ${products.length} relevant products matching "${query}". `;
        
        if (maxPrice) {
          message += `All items are under ₹${maxPrice.toLocaleString()}. `;
        }
        
        message += "You can add any item to your cart or ask me to add specific items.";
        
        return {
          products,
          message,
          shouldNavigate: true,
          navigationPath: `/search?q=${encodeURIComponent(query)}`
        };
      } catch (error) {
        console.error('Search error:', error);
        return {
          products: [],
          message: "I'm having trouble searching right now. Please try again with a different search term."
        };
      }
    } else {
      return {
        products: [],
        message: "I'm here to help with shopping! Try searching for products like 'iPhone', 'shirt', 'rice', or ask me to 'show Electronics category'."
      };
    }
  }

  // Extract main product keywords from query
  private extractProductKeywords(query: string): string[] {
    const productTerms = [
      // Electronics
      'iphone', 'phone', 'mobile', 'smartphone', 'samsung', 'oneplus', 'redmi', 'mi', 'realme',
      'laptop', 'computer', 'macbook', 'dell', 'hp', 'lenovo',
      'headphones', 'earbuds', 'speaker', 'tv', 'tablet',
      
      // Fashion
      'shirt', 'jeans', 'dress', 'kurta', 'saree', 'shoes', 'sandals', 'jacket',
      
      // Groceries
      'rice', 'dal', 'oil', 'masala', 'tea', 'coffee', 'milk', 'bread', 'flour',
      
      // Beauty
      'shampoo', 'soap', 'cream', 'lotion', 'lipstick', 'kajal', 'perfume'
    ];
    
    return productTerms.filter(term => query.includes(term));
  }

  // Filter products for relevance
  private filterRelevantProducts(products: Product[], keywords: string[], maxPrice?: number | null): Product[] {
    let filtered = products;
    
    // Filter by price if specified
    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= maxPrice);
    }
    
    // Filter by relevance if keywords found
    if (keywords.length > 0) {
      filtered = filtered.filter(product => {
        const productText = `${product.name} ${product.category} ${product.brand || ''}`.toLowerCase();
        return keywords.some(keyword => productText.includes(keyword));
      });
    }
    
    return filtered.slice(0, 10); // Limit to 10 most relevant results
  }

  // Improved search with better matching
  private async tryBetterSearch(query: string, maxPrice?: number | null): Promise<Product[]> {
    const categoryMappings = {
      'phone': 'electronics', 'mobile': 'electronics', 'smartphone': 'electronics', 'iphone': 'electronics',
      'laptop': 'electronics', 'computer': 'electronics',
      'shirt': 'fashion', 'jeans': 'fashion', 'dress': 'fashion', 'shoes': 'fashion',
      'kurta': 'fashion', 'saree': 'fashion',
      'rice': 'groceries', 'oil': 'groceries', 'dal': 'groceries',
      'shampoo': 'beauty', 'cream': 'beauty', 'perfume': 'beauty'
    };

    for (const [keyword, category] of Object.entries(categoryMappings)) {
      if (query.includes(keyword)) {
        let results = await getProductsByCategory(category);
        
        // Filter by price if specified
        if (maxPrice) {
          results = results.filter(product => product.price <= maxPrice);
        }
        
        // Filter by keyword relevance
        results = results.filter(product => {
          const productText = `${product.name} ${product.brand || ''}`.toLowerCase();
          return productText.includes(keyword);
        });
        
        if (results.length > 0) {
          return results.slice(0, 10);
        }
      }
    }

    return [];
  }

  // Enhanced add to cart with better product matching
  addToCart(productName: string): string {
    console.log('Adding to cart:', productName, 'Available products:', this.state.currentProducts.length);
    
    if (this.state.currentProducts.length === 0) {
      return `Please search for products first, then I can add "${productName}" to your cart.`;
    }

    // Try exact match first
    let product = this.state.currentProducts.find(p => 
      p.name.toLowerCase() === productName.toLowerCase()
    );
    
    // If no exact match, try partial match
    if (!product) {
      product = this.state.currentProducts.find(p => 
        p.name.toLowerCase().includes(productName.toLowerCase()) ||
        productName.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
      );
    }
    
    // If still no match, try by category for common items
    if (!product && this.isCommonGroceryItem(productName)) {
      return this.suggestGroceryOptions(productName);
    }
    
    if (!product) {
      return `I couldn't find "${productName}" in the current search results. Please search for the product first or try: "Find ${productName}" to see available options.`;
    }

    const existingItem = this.state.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      return `✅ Added another ${product.name} to your cart. You now have ${existingItem.quantity} items. Total cart value: ₹${this.getTotalPrice()}. Say "show cart" to see all items.`;
    } else {
      this.state.cart.push({ ...product, quantity: 1 });
    }

    this.state.currentStep = 'cart';
    return `✅ ${product.name} has been added to your cart for ₹${product.price.toLocaleString()}. Total cart value: ₹${this.getTotalPrice()}. Say "show cart" to see all items or continue shopping.`;
  }

  private isCommonGroceryItem(item: string): boolean {
    const groceryItems = ['rice', 'dal', 'oil', 'flour', 'sugar', 'tea', 'coffee'];
    return groceryItems.some(grocery => item.toLowerCase().includes(grocery));
  }

  private suggestGroceryOptions(item: string): string {
    return `I can help you find ${item}! Let me search for available options. Try: "Find ${item}" or "Show me ${item} options" to see what's available.`;
  }

  // Get cart contents with detailed information
  getCart(): { items: CartItem[], total: number, message: string } {
    const total = this.getTotalPrice();
    
    if (this.state.cart.length === 0) {
      return {
        items: [],
        total: 0,
        message: "🛒 Your cart is empty. Browse products and add items to get started! Try searching for items like 'Find iPhone' or 'Show me rice options'."
      };
    }

    const cartSummary = this.state.cart.map((item, index) => 
      `${index + 1}. ${item.name} - ₹${item.price.toLocaleString()} x ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    return {
      items: this.state.cart,
      total,
      message: `🛒 Your Cart (${this.state.cart.length} items):\n\n${cartSummary}\n\n💰 Total: ₹${total.toLocaleString()}\n\nSay "checkout" to proceed to payment or "remove [item name]" to remove items.`
    };
  }

  private getTotalPrice(): number {
    return this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Handle checkout process
  processCheckout(): string {
    if (this.state.cart.length === 0) {
      return "Your cart is empty. Add some products first!";
    }

    if (this.state.currentStep === 'cart') {
      this.state.currentStep = 'payment';
      return "🔄 Redirecting to payment gateway... Please wait.";
    }

    return "Use 'show cart' to view your items, then say 'checkout' to proceed.";
  }

  // Check if query is shopping-related
  private isShoppingQuery(query: string): boolean {
    const shoppingKeywords = [
      'buy', 'purchase', 'search', 'find', 'looking for', 'need', 'want', 'show me',
      'electronics', 'fashion', 'groceries', 'beauty', 'sports', 'books', 'toys',
      'phone', 'mobile', 'laptop', 'computer', 'tv', 'dress', 'shirt', 'jeans',
      'rice', 'dal', 'oil', 'shampoo', 'soap', 'price', 'under', 'below', 'cheap'
    ];

    return shoppingKeywords.some(keyword => query.includes(keyword)) || query.length > 2;
  }

  // Process user message and determine intent
  async processMessage(message: string): Promise<{ 
    type: 'search' | 'cart' | 'checkout' | 'payment' | 'help', 
    response: string, 
    products?: Product[],
    shouldNavigate?: boolean,
    navigationPath?: string 
  }> {
    const cleanMessage = message.toLowerCase().trim();

    // Cart-related commands
    if (cleanMessage.includes('add') && cleanMessage.includes('cart')) {
      const productName = this.extractProductName(cleanMessage);
      return { type: 'cart', response: this.addToCart(productName) };
    }

    if (cleanMessage.includes('cart') || cleanMessage.includes('show cart') || cleanMessage.includes('my cart')) {
      const cartInfo = this.getCart();
      return { type: 'cart', response: cartInfo.message };
    }

    // Checkout process
    if (cleanMessage.includes('checkout') || cleanMessage.includes('buy now')) {
      return { type: 'checkout', response: this.processCheckout() };
    }

    // Product search
    if (this.isShoppingQuery(cleanMessage)) {
      const searchResult = await this.searchProducts(message);
      return { 
        type: 'search', 
        response: searchResult.message, 
        products: searchResult.products,
        shouldNavigate: searchResult.shouldNavigate,
        navigationPath: searchResult.navigationPath
      };
    }

    // Default response
    return { 
      type: 'help', 
      response: "I'm your shopping assistant! Try:\n• 'Find iPhone under 30000'\n• 'Show me rice options'\n• 'Add [product name] to cart'\n• 'Show my cart'\n• 'Checkout my order'\n\nI can understand both text and voice commands!"
    };
  }

  private extractProductName(message: string): string {
    const match = message.match(/add\s+(.+?)\s+to\s+cart/i);
    return match ? match[1].trim() : '';
  }
}

export const shopTalkService = new ShopTalkService();

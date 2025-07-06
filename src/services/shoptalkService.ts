
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

  // Enhanced product search with better keyword matching
  async searchProducts(query: string): Promise<{ products: Product[], message: string, shouldNavigate?: boolean, navigationPath?: string }> {
    const cleanQuery = query.toLowerCase().trim();
    
    // Handle shopping-related queries
    if (this.isShoppingQuery(cleanQuery)) {
      try {
        console.log('Searching for products with query:', query);
        
        // Try direct search first
        let products = await searchProducts(query);
        
        // If no results, try alternative searches
        if (products.length === 0) {
          products = await this.tryBetterSearch(cleanQuery);
        }
        
        this.state.currentProducts = products;
        this.state.lastSearchQuery = query;
        
        console.log('Search results:', products.length, 'products found');
        
        if (products.length === 0) {
          return {
            products: [],
            message: `Sorry, I couldn't find products matching "${query}". Try searching for:\n• Electronics: "phone", "laptop", "headphones"\n• Fashion: "shirt", "jeans", "shoes"\n• Groceries: "rice", "oil", "snacks"\n• Beauty: "shampoo", "cream", "perfume"`
          };
        }
        
        let message = `Great! I found ${products.length} products matching "${query}". `;
        
        // Add voice confirmation for voice queries
        if (this.isVoiceQuery(query)) {
          message = `Perfect! I found ${products.length} products for you. ` + message;
        }
        
        message += "You can add any item to your cart or compare products.";
        
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

  // Improved search with better matching
  private async tryBetterSearch(query: string): Promise<Product[]> {
    // Try searching by individual words
    const words = query.split(' ').filter(word => word.length > 2);
    
    for (const word of words) {
      const results = await searchProducts(word);
      if (results.length > 0) {
        return results;
      }
    }

    // Try category-based search
    const categoryMappings = {
      'phone': 'electronics', 'mobile': 'electronics', 'smartphone': 'electronics',
      'laptop': 'electronics', 'computer': 'electronics',
      'shirt': 'fashion', 'jeans': 'fashion', 'dress': 'fashion', 'shoes': 'fashion',
      'kurta': 'fashion', 'saree': 'fashion',
      'rice': 'groceries', 'oil': 'groceries', 'dal': 'groceries',
      'shampoo': 'beauty', 'cream': 'beauty', 'perfume': 'beauty'
    };

    for (const [keyword, category] of Object.entries(categoryMappings)) {
      if (query.includes(keyword)) {
        const results = await getProductsByCategory(category);
        if (results.length > 0) {
          return results.slice(0, 10); // Limit results
        }
      }
    }

    return [];
  }

  // Detect if query came from voice input
  private isVoiceQuery(query: string): boolean {
    const voicePatterns = [
      'i need', 'i want', 'show me', 'find me', 'looking for',
      'under', 'below', 'above', 'around', 'approximately'
    ];
    
    return voicePatterns.some(pattern => query.toLowerCase().includes(pattern));
  }

  // Enhanced add to cart with better product matching
  addToCart(productName: string): string {
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
    
    if (!product) {
      return `I couldn't find "${productName}" in the current search results. Please search for the product first or try a different name.`;
    }

    const existingItem = this.state.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      return `✅ Added another ${product.name} to your cart. You now have ${existingItem.quantity} items. Would you like to proceed to checkout or continue shopping?`;
    } else {
      this.state.cart.push({ ...product, quantity: 1 });
    }

    this.state.currentStep = 'cart';
    return `✅ ${product.name} has been added to your cart for ₹${product.price.toLocaleString()}. Would you like to proceed to payment or continue shopping?`;
  }

  // Get cart contents
  getCart(): { items: CartItem[], total: number, message: string } {
    const total = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (this.state.cart.length === 0) {
      return {
        items: [],
        total: 0,
        message: "Your cart is empty. Browse products and add items to get started!"
      };
    }

    const cartSummary = this.state.cart.map(item => 
      `• ${item.name} (₹${item.price}) x ${item.quantity}`
    ).join('\n');

    return {
      items: this.state.cart,
      total,
      message: `🛒 Cart Contents:\n${cartSummary}\n\n💰 Total: ₹${total.toLocaleString()}\n\nSay "checkout" to proceed to payment.`
    };
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

  // Simulate payment
  processPayment(): string {
    if (this.state.currentStep === 'payment') {
      this.state.currentStep = 'order_confirmed';
      const orderTotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      console.log('API Call: POST /api/orders', {
        items: this.state.cart,
        total: orderTotal,
        timestamp: new Date()
      });

      const orderSummary = `✅ Payment successful! Your order has been confirmed.\n\n📦 Order Details:\n${
        this.state.cart.map(item => `• ${item.name} x ${item.quantity}`).join('\n')
      }\n\n💰 Total Paid: ₹${orderTotal.toLocaleString()}\n🚚 Estimated delivery: 2-3 hours\n\nYour order has been saved in our system.`;

      this.state.cart = [];
      this.state.currentStep = 'browsing';

      return orderSummary;
    }

    return "Please proceed to checkout first by saying 'checkout'.";
  }

  // Check if query is shopping-related
  private isShoppingQuery(query: string): boolean {
    const shoppingKeywords = [
      // Action keywords
      'buy', 'purchase', 'search', 'find', 'looking for', 'need', 'want', 'show me',
      
      // Categories
      'electronics', 'fashion', 'groceries', 'beauty', 'sports', 'books', 'toys',
      'home', 'kitchen', 'appliances',
      
      // Specific items
      'phone', 'mobile', 'laptop', 'computer', 'tv', 'fan', 'cooler', 'inverter',
      'dress', 'shirt', 'jeans', 'kurta', 'saree', 'shoes', 'sandals',
      'rice', 'dal', 'oil', 'masala', 'tea', 'coffee', 'milk', 'bread',
      'shampoo', 'soap', 'cream', 'lotion', 'lipstick', 'kajal',
      
      // Indian brands
      'bajaj', 'samsung', 'lg', 'oneplus', 'redmi', 'mi', 'realme',
      'tata', 'amul', 'britannia', 'maggi', 'himalaya', 'lakme',
      
      // Price related
      'price', 'cost', 'cheap', 'expensive', 'under', 'below', 'above', 'around',
      'rupees', 'rs', '₹'
    ];

    return shoppingKeywords.some(keyword => query.includes(keyword)) || 
           query.length > 2;
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

    if (cleanMessage.includes('cart') || cleanMessage.includes('show cart')) {
      const cartInfo = this.getCart();
      return { type: 'cart', response: cartInfo.message };
    }

    // Checkout process
    if (cleanMessage.includes('checkout') || cleanMessage.includes('buy now')) {
      return { type: 'checkout', response: this.processCheckout() };
    }

    if (cleanMessage.includes('payment') || cleanMessage.includes('pay')) {
      return { type: 'payment', response: this.processPayment() };
    }

    // Product search with enhanced navigation
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

    // Default response for non-shopping queries
    return { 
      type: 'help', 
      response: "I'm your shopping assistant! Try:\n• 'Find iPhone under 30000'\n• 'Show me kurtas'\n• 'Add rice to cart'\n• 'Show my cart'\n• 'Checkout my order'\n\nI can understand both text and voice commands!"
    };
  }

  private extractProductName(message: string): string {
    // Extract product name from "add X to cart" messages
    const match = message.match(/add\s+(.+?)\s+to\s+cart/i);
    return match ? match[1].trim() : '';
  }
}

export const shopTalkService = new ShopTalkService();

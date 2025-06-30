
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

  // Product search with keyword matching
  searchProducts(query: string): { products: Product[], message: string } {
    const cleanQuery = query.toLowerCase().trim();
    
    // Handle shopping-related queries
    if (this.isShoppingQuery(cleanQuery)) {
      const products = searchProducts(query);
      this.state.currentProducts = products;
      this.state.lastSearchQuery = query;
      
      if (products.length === 0) {
        return {
          products: [],
          message: "Sorry, I couldn't find anything matching that. Try searching for categories like 'Electronics', 'Fashion', 'Groceries', or specific items."
        };
      }
      
      return {
        products,
        message: `Found ${products.length} products matching "${query}". You can add any item to your cart by saying "add [product name] to cart".`
      };
    } else {
      return {
        products: [],
        message: "I'm here to help with shopping-related queries only. Try searching for products, checking your cart, or asking about orders!"
      };
    }
  }

  // Add product to cart
  addToCart(productName: string): string {
    const product = this.state.currentProducts.find(p => 
      p.name.toLowerCase().includes(productName.toLowerCase())
    );
    
    if (!product) {
      return "I couldn't find that product in the current search results. Please search for the product first.";
    }

    const existingItem = this.state.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.state.cart.push({ ...product, quantity: 1 });
    }

    this.state.currentStep = 'cart';
    return `✅ ${product.name} has been added to your cart. Would you like to proceed to payment or continue shopping?`;
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
      
      // Simulate backend API call
      console.log('API Call: POST /api/orders', {
        items: this.state.cart,
        total: orderTotal,
        timestamp: new Date()
      });

      const orderSummary = `✅ Payment successful! Your order has been confirmed.\n\n📦 Order Details:\n${
        this.state.cart.map(item => `• ${item.name} x ${item.quantity}`).join('\n')
      }\n\n💰 Total Paid: ₹${orderTotal.toLocaleString()}\n🚚 Estimated delivery: 2-3 hours\n\nYour order has been saved in our system.`;

      // Clear cart after successful order
      this.state.cart = [];
      this.state.currentStep = 'browsing';

      return orderSummary;
    }

    return "Please proceed to checkout first by saying 'checkout'.";
  }

  // Check if query is shopping-related
  private isShoppingQuery(query: string): boolean {
    const shoppingKeywords = [
      'buy', 'purchase', 'search', 'find', 'looking for', 'need', 'want',
      'electronics', 'fashion', 'groceries', 'beauty', 'sports', 'books', 'toys',
      'phone', 'laptop', 'dress', 'shoes', 'food', 'milk', 'rice', 'shampoo',
      'price', 'cost', 'cheap', 'expensive', 'under', 'below', 'above'
    ];

    return shoppingKeywords.some(keyword => query.includes(keyword)) || 
           query.length > 2; // Allow general searches
  }

  // Process user message and determine intent
  processMessage(message: string): { type: 'search' | 'cart' | 'checkout' | 'payment' | 'help', response: string, products?: Product[] } {
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

    // Product search
    if (this.isShoppingQuery(cleanMessage)) {
      const searchResult = this.searchProducts(message);
      return { 
        type: 'search', 
        response: searchResult.message, 
        products: searchResult.products 
      };
    }

    // Default response for non-shopping queries
    return { 
      type: 'help', 
      response: "I'm here to help with shopping-related queries only. Try:\n• Search for products: 'Find laptops under 50000'\n• Add to cart: 'Add iPhone to cart'\n• Check cart: 'Show my cart'\n• Checkout: 'Proceed to checkout'"
    };
  }

  private extractProductName(message: string): string {
    // Extract product name from "add X to cart" messages
    const match = message.match(/add\s+(.+?)\s+to\s+cart/i);
    return match ? match[1].trim() : '';
  }
}

export const shopTalkService = new ShopTalkService();

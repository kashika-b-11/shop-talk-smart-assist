
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, MessageCircle, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product, Review, LightningDeal } from '@/types/product';
import { productService, reviewService, cartService, lightningDealService } from '@/services/supabaseService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProductImage from '@/components/ProductImage';

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lightningDeal, setLightningDeal] = useState<LightningDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [aiComparison, setAiComparison] = useState<string>('');
  const [aiPriceAnalysis, setAiPriceAnalysis] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', comment: '' });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await productService.getProduct(parseInt(id));
        const reviewsData = await reviewService.getProductReviews(parseInt(id));
        const dealData = await lightningDealService.getLightningDealForProduct(parseInt(id));
        
        setProduct(productData);
        setReviews(reviewsData);
        setLightningDeal(dealData);
      } catch (error) {
        console.error('Error loading product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, toast]);

  const handleAddToCart = async () => {
    if (!user || !product) return;

    setAddingToCart(true);
    try {
      await cartService.addToCart(user.id, product.id, 1, lightningDeal?.id);
      toast({
        title: 'Added to cart!',
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAIComparison = async () => {
    if (!product) return;
    
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-product-comparison', {
        body: { product },
      });
      
      if (error) throw error;
      setAiComparison(data.comparison);
    } catch (error) {
      console.error('Error getting AI comparison:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI comparison',
        variant: 'destructive',
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handlePriceAnalysis = async () => {
    if (!product) return;
    
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-price-analysis', {
        body: { product },
      });
      
      if (error) throw error;
      setAiPriceAnalysis(data.analysis);
    } catch (error) {
      console.error('Error getting price analysis:', error);
      toast({
        title: 'Error',
        description: 'Failed to get price analysis',
        variant: 'destructive',
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleAskQuestion = async (question: string) => {
    if (!product) return;
    
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-product-qa', {
        body: { product, question },
      });
      
      if (error) throw error;
      setAiResponse(data.answer);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI response',
        variant: 'destructive',
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!user || !product) return;

    try {
      await reviewService.createReview({
        product_id: product.id,
        user_id: user.id,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
        verified_purchase: false,
      });
      
      // Reload reviews
      const updatedReviews = await reviewService.getProductReviews(product.id);
      setReviews(updatedReviews);
      setNewReview({ rating: 5, title: '', comment: '' });
      
      toast({
        title: 'Review submitted!',
        description: 'Thank you for your feedback.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  const currentPrice = lightningDeal ? lightningDeal.deal_price : product.price;
  const originalPrice = lightningDeal ? lightningDeal.original_price : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <ProductImage
            productName={product.name}
            category={product.category}
            className="w-full h-96 rounded-lg"
            alt={product.name}
            fallbackImage={product.image_url}
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({reviews.length} reviews)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-green-600">
              ${currentPrice.toFixed(2)}
            </span>
            {lightningDeal && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <Badge className="bg-red-500 text-white">
                  Lightning Deal
                </Badge>
              </>
            )}
          </div>
          
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={addingToCart || !user}
              className="w-full bg-[#0071CE] hover:bg-blue-700 text-lg py-6"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </Button>
            
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={handleAIComparison}
                disabled={aiLoading}
                variant="outline"
                className="text-sm py-2"
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Compare
              </Button>
              <Button
                onClick={handlePriceAnalysis}
                disabled={aiLoading}
                variant="outline"
                className="text-sm py-2"
              >
                <DollarSign className="w-4 h-4 mr-1" />
                Best Price?
              </Button>
              <Button
                onClick={() => handleAskQuestion('Tell me more about this product')}
                disabled={aiLoading}
                variant="outline"
                className="text-sm py-2"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Responses */}
      {(aiComparison || aiPriceAnalysis || aiResponse) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aiComparison && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Product Comparison:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{aiComparison}</p>
              </div>
            )}
            {aiPriceAnalysis && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Price Analysis:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{aiPriceAnalysis}</p>
              </div>
            )}
            {aiResponse && (
              <div>
                <h3 className="font-semibold mb-2">AI Response:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {user && (
            <div className="mb-6 p-4 border rounded-lg">
              <h3 className="font-semibold mb-4">Write a Review</h3>
              <div className="space-y-4">
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 cursor-pointer ${
                          star <= newReview.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    placeholder="Review title"
                  />
                </div>
                <div>
                  <Label>Comment</Label>
                  <Textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your experience with this product"
                    rows={4}
                  />
                </div>
                <Button onClick={handleSubmitReview} className="bg-[#0071CE] hover:bg-blue-700">
                  Submit Review
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{review.title}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <span className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, userId } = await req.json();
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Get products for context
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .limit(10);

    // Get cart items if user is logged in
    let cartItems = [];
    if (userId) {
      const { data } = await supabase
        .from('cart_items')
        .select('*, products(*)')
        .eq('user_id', userId);
      cartItems = data || [];
    }

    const systemPrompt = `You are a helpful AI shopping assistant for a Walmart-style e-commerce platform. You can:
    
    1. Help users find products by searching through our catalog
    2. Answer questions about products, prices, and availability
    3. Provide shopping recommendations and comparisons
    4. Help with cart management and checkout process
    5. Assist with order tracking and customer service
    
    Available products: ${JSON.stringify(products)}
    User's cart: ${JSON.stringify(cartItems)}
    
    Be friendly, helpful, and knowledgeable about shopping. If users ask for specific products, try to match them with items from our catalog. You can suggest navigation to product pages or categories.
    
    If you want to suggest a specific action, respond with a JSON object containing:
    - response: your text response
    - action: { type: "navigate", path: "/product/123" } or { type: "recommend_product", productId: 123 }
    
    Otherwise, just respond with helpful text.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...context.map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          { role: 'user', content: message }
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    let aiResponse = data.choices[0].message.content;

    // Try to parse as JSON for actions
    try {
      const parsed = JSON.parse(aiResponse);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch {
      // If not JSON, return as regular text response
      return new Response(JSON.stringify({ response: aiResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in ai-shopping-assistant function:', error);
    return new Response(JSON.stringify({ 
      response: "I'm sorry, I'm experiencing some technical difficulties. Please try again later."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

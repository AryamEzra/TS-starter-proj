import { serve } from "bun";

// ================== DEFINE TYPES ==================
interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  imageUrl?: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

let products: Product[] = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    price: 10.90,
    // description and imageUrl are optional
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    price: 20.95,
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    price: 15.99,
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    price: 29.99,
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/6-piece-white-dinner-plate-set.jpg",
    name: "6 Piece White Dinner Plate Set",
    price: 39.99,
  },

];

let orders: Order[] = [];
// FIXED: Changed from Map<string, CartItem> to Map<string, CartItem[]>
let cart: Map<string, CartItem[]> = new Map();

// ================== HANDLERS ==================
function handleGetAllProducts(): Response {
  return Response.json(products);
}

function handleGetProductById(id: string): Response {
  const product = products.find(p => p.id === id);
  if (!product) return errorResponse("Product not found", 404);
  return Response.json(product);
}

function handleGetCart(userId: string): Response {
  // FIXED: Get the user's cart array or return empty array
  const userCart = cart.get(userId) || [];
  return Response.json(userCart);
}

function handleAddToCart(userId: string, productId: string, quantity: number): Response {
  if (!products.find(p => p.id === productId)) {
    return errorResponse("Product not found", 404);
  }
  
  // FIXED: Get user's cart or initialize empty array
  let userCart = cart.get(userId) || [];
  
  // Check if product already in cart
  const existingItem = userCart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    userCart.push({ productId, quantity });
  }
  
  cart.set(userId, userCart);
  
  return Response.json({ message: "Item added to cart", cart: userCart });
}


function handleCreateOrder(userId: string, orderData: any): Response {
  const userCart = cart.get(userId);
  if (!userCart || userCart.length === 0) return errorResponse("Cart is empty", 400);
  
  // Calculate total
  const total = userCart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  
  const newOrder: Order = {
    id: Date.now().toString(),
    userId,
    items: [...userCart], // Copy the cart items
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
    address: orderData.address
  };
  
  orders.push(newOrder);
  cart.delete(userId); // Clear cart after order
  
  return Response.json(newOrder, { status: 201 });
}

function handleGetOrderStatus(orderId: string): Response {
  const order = orders.find(o => o.id === orderId);
  if (!order) return errorResponse("Order not found", 404);
  return Response.json({ status: order.status, trackingId: `TRK-${orderId}` });
}

// ================== HELPER FUNCTION ==================
function errorResponse(message: string, status: number = 400): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

// ================== SERVER SETUP ==================
const PORT = 3001;

serve({
  port: PORT,
  async fetch(req: Request): Promise<Response> {
    const { method } = req;
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    // Enable CORS - Add these headers to ALL responses
    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:3000", // Your Next.js URL
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle preflight OPTIONS requests
    if (method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      let response: Response;
      
      // PRODUCTS
      if (method === "GET" && pathname === "/api/products") {

        response = handleGetAllProducts();
      }
      
      else if (method === "GET" && pathname.startsWith("/api/products/")) {
        const segments = pathname.split("/");
        const id = segments[3];
        if (!id) {
          response = errorResponse("Product ID is required", 400);
        } else {
          response = handleGetProductById(id);
        }
      }

      // CART
      else if (method === "GET" && pathname === "/api/cart") {
        const userId = url.searchParams.get("userId") || "default-user";
        response = handleGetCart(userId);
      }
      
      else if (method === "POST" && pathname === "/api/cart") {
        const body = await req.json() as { userId: string; productId: string; quantity: number };
        response = handleAddToCart(body.userId, body.productId, body.quantity || 1);
      }

      // ORDERS
      else if (method === "POST" && pathname === "/api/orders") {
        const body = await req.json() as { userId: string; address: any };
        response = handleCreateOrder(body.userId, body);
      }
      
      else if (method === "GET" && pathname.startsWith("/api/orders/")) {
        const segments = pathname.split("/");
        const orderId = segments[3];
        if (!orderId) {
          response = errorResponse("Order ID is required", 400);
        } else {
          response = handleGetOrderStatus(orderId);
        }
      }

      else {
        response = errorResponse("Endpoint not found", 404);
      }
      
      // Add CORS headers to all responses
      for (const [key, value] of Object.entries(corsHeaders)) {
        response.headers.set(key, value);
      }
      
      return response;
      
    } catch (error) {
      const response = errorResponse("Internal server error", 500);
      // Add CORS headers to error response too
      for (const [key, value] of Object.entries(corsHeaders)) {
        response.headers.set(key, value);
      }
      return response;
    }
  }
});

console.log(`🛒 E-commerce API running at http://localhost:${PORT}`);
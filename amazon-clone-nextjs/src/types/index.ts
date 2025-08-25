export interface Rating {
  stars: number;
  count: number;
}

export interface Product {
  id: string;
  image: string;
  name: string;
  rating?: Rating;
  priceCents: number;
  keywords: string[];
  type?: string; 
  sizeChartLink?: string; 
}

export interface CartItem {
  productId: string;
  quantity: number;
  deliveryOptionId: string;
}

export interface DeliveryOption {
  id: string;
  deliveryDays: number;
  priceCents: number;
}

export interface Order {
  id:string;
  orderTime: string;
  totalCostCents: number;
  products: OrderProduct[];
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  estimatedDeliveryTime: string;
}
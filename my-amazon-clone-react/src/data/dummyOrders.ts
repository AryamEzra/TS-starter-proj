import type { Order } from '../types';

export const dummyOrders: Order[] = [
  {
    id: '27cba69d-4c3d-4098-b42d-ac7fa62b7664',
    orderTime: '2024-05-18T18:30:00Z',
    totalCostCents: 3506,
    products: [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
        quantity: 1,
        estimatedDeliveryTime: '2024-05-23T18:30:00Z',
      },
      {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 
        quantity: 2,
        estimatedDeliveryTime: '2024-05-25T18:30:00Z',
      }
    ]
  },
  {
    id: 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d',
    orderTime: '2024-05-10T10:00:00Z',
    totalCostCents: 4190,
    products: [
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
        quantity: 2,
        estimatedDeliveryTime: '2024-05-17T18:30:00Z',
      }
    ]
  }
];
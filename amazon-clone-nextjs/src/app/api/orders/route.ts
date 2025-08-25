// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { Order } from '@/types';
import dayjs from 'dayjs';

export async function GET(request: NextRequest) {
  try {
    // Create mock orders since the backend doesn't provide a GET /orders endpoint
    const mockOrders: Order[] = [
      {
        id: "1",
        orderTime: "2024-01-15T10:30:00.000Z",
        totalCostCents: 4275, // $42.75
        products: [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", // Socks
            quantity: 2,
            estimatedDeliveryTime: "2024-01-18T10:30:00.000Z"
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", // Basketball
            quantity: 1,
            estimatedDeliveryTime: "2024-01-17T10:30:00.000Z"
          }
        ]
      },
      {
        id: "2",
        orderTime: "2024-01-10T14:45:00.000Z",
        totalCostCents: 1090, // $10.90
        products: [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", // Socks
            quantity: 1,
            estimatedDeliveryTime: "2024-01-13T14:45:00.000Z"
          }
        ]
      }
    ];

    const sortedData = mockOrders.sort((a, b) => 
      dayjs(b.orderTime).unix() - dayjs(a.orderTime).unix()
    );

    return NextResponse.json(sortedData);
  } catch (error) {
    console.error("Failed in API route:", error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
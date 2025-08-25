// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { Product } from '@/types'; // Adjust import if needed

// This function handles GET requests to /api/products
export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://supersimplebackend.dev/products');

    if (!response.ok) {
      throw new Error(`External API error! status: ${response.status}`);
    }

    const productsData: Product[] = await response.json();

    // Return the data as a JSON response
    return NextResponse.json(productsData);
  } catch (error) {
    console.error('Failed in API route:', error);
    // Return a 500 error response
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// You could also add a POST handler here later for creating products
// export async function POST(request: NextRequest) { ... }
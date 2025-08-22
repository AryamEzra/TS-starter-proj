'use client';

import Header from "@/components/Header";
import { user } from "@/db/schema";
import { usePathname } from "next/navigation";

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isCheckoutPage = pathname?.includes('/checkout');
  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/signup');
  const isDashboardPage = pathname?.includes('/dashboard');
  const isLandingPage = pathname === '/';
  
  return (
    <>
      {!isCheckoutPage && !isAuthPage && !isLandingPage && <Header />}
      <main className={isAuthPage || isLandingPage ? '' : 'pt-8'}>
        {children}
      </main>
    </>
  )
}
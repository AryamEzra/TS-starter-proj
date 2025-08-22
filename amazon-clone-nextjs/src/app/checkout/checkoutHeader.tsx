'use client';

import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCheckoutPage = pathname?.includes('/checkout');
  
  return (
    <>
      {!isCheckoutPage && <Header />}
      <main className="pt-8">
        {children}
      </main>
    </>
  )
}

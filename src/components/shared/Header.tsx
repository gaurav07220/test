
"use client";

import Link from 'next/link';
import { Logo } from './Logo';
import { Search } from './Search';
import { UserNav } from './UserNav';
import { CartButton } from './CartButton';
import { Button } from '../ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileHeader } from './MobileHeader';

export function Header() {
  const isMobile = useIsMobile();

  if(isMobile) {
    return <MobileHeader />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          <Link href="/products" className="transition-colors hover:text-primary">Products</Link>
          <Link href="#categories" className="transition-colors hover:text-primary">Categories</Link>
          <Link href="#" className="transition-colors hover:text-primary">Deals</Link>
          <Link href="#" className="transition-colors hover:text-primary">What's New</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Search />
          </div>
          <UserNav />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

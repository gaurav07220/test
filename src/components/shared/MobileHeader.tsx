
"use client";

import Link from 'next/link';
import { Logo } from './Logo';
import { Search } from './Search';
import { UserNav } from './UserNav';
import { CartButton } from './CartButton';
import { Button } from '../ui/button';

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Search />
          <UserNav />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

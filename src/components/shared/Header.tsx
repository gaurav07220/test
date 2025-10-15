
"use client";

import { Logo } from './Logo';
import { UserNav } from './UserNav';
import { CartButton } from './CartButton';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '../ui/skeleton';

export function Header() {
  const { isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isLoading ? <Skeleton className="h-9 w-24" /> : <UserNav />}
          <CartButton />
        </div>
      </div>
    </header>
  );
}

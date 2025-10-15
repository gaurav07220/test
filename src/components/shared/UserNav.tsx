
"use client";

import Link from 'next/link';
import {
  User,
  LogOut,
  LayoutDashboard,
  Store,
  CreditCard,
  Package,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

// This is a mock authentication check.
// In a real app, you'd use a proper auth provider.
function useAuth() {
    const [user, setUser] = useState<{ name: string; email: string; role: 'customer' | 'store' | 'admin' } | null>(null);

    useEffect(() => {
        // This simulates checking auth state on the client
        // For example, checking localStorage or a cookie.
        // For now, we'll just mock a logged in user.
        setUser({ name: "Demo User", email: "user@blinkit.com", role: 'customer' });
    }, []);

    return { user };
}

export function UserNav() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Button asChild>
        <Link href="/login">Login / Register</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account/orders">
              <Package className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          {user.role === 'admin' && (
            <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                <Link href="/admin">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin/products">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Products</span>
                    </Link>
                </DropdownMenuItem>
            </>
          )}
          {user.role === 'store' && (
            <DropdownMenuItem asChild>
              <Link href="/store">
                <Store className="mr-2 h-4 w-4" />
                <span>Store Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

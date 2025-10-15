
"use client";

import Link from 'next/link';
import {
  User,
  LogOut,
  LayoutDashboard,
  Store,
  CreditCard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  LineChart,
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
        // To test different roles, change 'customer' to 'store' or 'admin'
        // and update the email to match the login logic (e.g., 'admin@blinkit.com')
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

        {/* Customer Links */}
        {user.role === 'customer' && (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/account/orders">
                <Package className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/account/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        
        {/* Admin Links */}
        {user.role === 'admin' && (
          <DropdownMenuGroup>
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
               <DropdownMenuItem asChild>
                    <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin/orders">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin/products">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Products</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/admin/users">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Customers</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/admin/analytics">
                        <LineChart className="mr-2 h-4 w-4" />
                        <span>Analytics</span>
                    </Link>
                </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        {/* Store Links */}
        {user.role === 'store' && (
             <DropdownMenuGroup>
                <DropdownMenuLabel>Store</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href="/store">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/store/orders">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/store/products">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Products</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/store/analytics">
                        <LineChart className="mr-2 h-4 w-4" />
                        <span>Analytics</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

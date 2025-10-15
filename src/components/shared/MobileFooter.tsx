
"use client";

import Link from 'next/link';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/products', icon: Search, label: 'Browse' },
    { href: '/cart', icon: ShoppingBag, label: 'Cart' },
    { href: '/account/orders', icon: User, label: 'Account' },
];

export function MobileFooter() {
    const pathname = usePathname();

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:left-auto md:right-auto md:max-w-sm">
            <nav className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <Link href={item.href} key={item.href}>
                        <div
                            className={cn(
                                "flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary",
                                pathname === item.href && "text-primary"
                            )}
                        >
                            <item.icon className="h-6 w-6" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </div>
                    </Link>
                ))}
            </nav>
        </footer>
    );
}

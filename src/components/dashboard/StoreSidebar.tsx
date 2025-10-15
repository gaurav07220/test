
"use client";

import Link from "next/link";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  LineChart,
  Store,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "../shared/Logo";

const navItems = [
    { href: "/store", icon: Home, label: "Dashboard" },
    { href: "/store/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/store/products", icon: Package, label: "Products" },
    { href: "/store/analytics", icon: LineChart, label: "Analytics" },
];


export function StoreSidebar() {
    const pathname = usePathname();
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
              <div className="pb-4">
                <Logo />
              </div>
                <TooltipProvider>
                    {navItems.map((item) => (
                        <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                    pathname.startsWith(item.href) && "bg-accent text-accent-foreground"
                                )}
                            >
                            <item.icon className="h-5 w-5" />
                            <span className="sr-only">{item.label}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </nav>
        </aside>
    )
}

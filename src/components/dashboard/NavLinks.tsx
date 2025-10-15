
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Package,
  Users,
  LineChart,
  Home,
  Settings,
  User,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/users", label: "Customers", icon: Users },
  { href: "/admin/discounts", label: "Discounts", icon: Tag },
  { href: "/admin/analytics", label: "Analytics", icon: LineChart },
];

const storeLinks = [
    { href: "/store", label: "Dashboard", icon: Home },
    { href: "/store/orders", label: "Orders", icon: ShoppingCart },
    { href: "/store/products", label: "Products", icon: Package },
    { href: "/store/analytics", label: "Analytics", icon: LineChart },
];

const customerLinks = [
    { href: "/account/orders", label: "My Orders", icon: Package },
    { href: "/account/profile", label: "Profile", icon: User },
    { href: "/account/settings", label: "Settings", icon: Settings },
];

const NavLink = ({ href, label, icon: Icon, isActive }: { href: string; label: string; icon: React.ElementType; isActive: boolean}) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "bg-muted text-primary"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
);


export const AdminNavLinks = ({isStore = false} : {isStore?: boolean}) => {
    const pathname = usePathname();
    const links = isStore ? storeLinks : adminLinks;

    return (
        <>
            {links.map((link) => (
                <NavLink key={link.href} {...link} isActive={pathname === link.href} />
            ))}
        </>
    );
}

export const CustomerNavLinks = () => {
    const pathname = usePathname();
    return (
        <>
            {customerLinks.map((link) => (
                <NavLink key={link.href} {...link} isActive={pathname === link.href} />
            ))}
        </>
    );
}

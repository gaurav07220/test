
"use client";

import * as React from 'react';
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserNav } from "../shared/UserNav";
import { usePathname } from "next/navigation";
import { Logo } from '../shared/Logo';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu, Package2 } from 'lucide-react';
import { AdminNavLinks, CustomerNavLinks } from './NavLinks';
import { useAuth } from '@/hooks/use-auth';

function getBreadcrumbs(pathname: string) {
    const parts = pathname.split('/').filter(part => part);
    const breadcrumbs = parts.map((part, index) => {
        const href = '/' + parts.slice(0, index + 1).join('/');
        const text = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
        return { href, text };
    });
    return breadcrumbs;
}

export function DashboardHeader() {
    const pathname = usePathname();
    const breadcrumbs = getBreadcrumbs(pathname);
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const isStore = user?.role === 'store';

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Gaurav's Store</span>
            </Link>
            {isAdmin && <AdminNavLinks />}
            {isStore && <AdminNavLinks isStore={true} />}
            {!isAdmin && !isStore && <CustomerNavLinks />}
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="flex items-center gap-4">
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                 <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                        <BreadcrumbItem>
                            {index === breadcrumbs.length - 1 ? (
                                <BreadcrumbPage>{crumb.text}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={crumb.href}>{crumb.text}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <UserNav />
      </div>
    </header>
  );
}

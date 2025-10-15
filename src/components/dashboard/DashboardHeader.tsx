
"use client";

import * as React from 'react';
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { UserNav } from "../shared/UserNav";
import { usePathname } from "next/navigation";
import { Logo } from '../shared/Logo';

function getBreadcrumbs(pathname: string) {
    const parts = pathname.split('/').filter(part => part);
    const breadcrumbs = parts.map((part, index) => {
        const href = '/' + parts.slice(0, index + 1).join('/');
        const text = part.charAt(0).toUpperCase() + part.slice(1);
        return { href, text };
    });
    return breadcrumbs;
}

export function DashboardHeader() {
    const pathname = usePathname();
    const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex items-center gap-4">
        <div className="sm:hidden">
            <Logo />
        </div>
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
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

      <div className="relative ml-auto flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <UserNav />
    </header>
  );
}

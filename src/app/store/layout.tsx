
"use client";

import Link from "next/link";
import { Package2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AdminNavLinks } from "@/components/dashboard/NavLinks";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user?.role !== 'store') {
        router.push('/');
        }
    }, [user, isLoading, router]);

    if (isLoading || user?.role !== 'store') {
        return (
            <div className="flex min-h-screen w-full flex-col">
              <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <Skeleton className="h-8 w-32" />
                <div className="flex-1"></div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </header>
              <div className="flex flex-1">
                <aside className="hidden w-64 flex-col border-r bg-muted/40 p-4 md:flex">
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-8 w-full mb-2" />
                </aside>
                <main className="flex-1 p-6">
                  <Skeleton className="h-64 w-full" />
                </main>
              </div>
            </div>
          );
    }
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-muted/40 sm:flex">
        <div className="flex h-16 shrink-0 items-center border-b px-6">
           <Link
              href="/"
              className="flex items-center gap-2 font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span>Blinkit Store</span>
            </Link>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <AdminNavLinks isStore={true} />
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <DashboardHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
        </main>
      </div>
    </div>
  );
}

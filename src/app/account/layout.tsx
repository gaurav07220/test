
"use client";

import Link from "next/link";
import { Package2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CustomerNavLinks } from "@/components/dashboard/NavLinks";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-muted/40 sm:flex">
            <div className="flex h-16 shrink-0 items-center border-b px-6">
                <Link
                href="/"
                className="flex items-center gap-2 font-semibold"
                >
                <Package2 className="h-6 w-6" />
                <span>Blinkit</span>
                </Link>
            </div>
            <nav className="flex flex-col gap-2 p-4">
                <CustomerNavLinks />
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


"use client";

import Link from 'next/link';
import { Logo } from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileFooter } from './MobileFooter';

export function Footer() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileFooter />;
  }

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">Your one-stop shop for everything, delivered fast.</p>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary">Groceries</Link></li>
              <li><Link href="#" className="hover:text-primary">Electronics</Link></li>
              <li><Link href="#" className="hover:text-primary">For Home</Link></li>
              <li><Link href="#" className="hover:text-primary">Special Offers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">About Blinkit</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary">Partner with Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Blinkit, Inc. All rights reserved.</p>
          {/* Add social media icons here if needed */}
        </div>
      </div>
    </footer>
  );
}

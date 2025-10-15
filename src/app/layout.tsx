
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartProvider';

export const metadata: Metadata = {
  title: 'Blinkit',
  description: 'Your one-stop shop for everything, delivered fast.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <CartProvider>
            <div className="relative md:max-w-sm md:mx-auto h-full bg-background shadow-lg">
                {children}
                <Toaster />
            </div>
        </CartProvider>
      </body>
    </html>
  );
}

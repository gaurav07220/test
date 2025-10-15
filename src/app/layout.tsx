
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartProvider';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: "Gaurav's Store",
  description: 'Your one-stop shop for everything, delivered fast.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <AuthProvider>
          <CartProvider>
              <div className="relative h-full bg-background">
                  {children}
                  <Toaster />
              </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

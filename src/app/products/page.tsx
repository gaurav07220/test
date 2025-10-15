
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products as allProducts } from '@/lib/data';
import { ProductCard } from '@/components/shared/ProductCard';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16">
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-headline font-bold text-center mb-8">All Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

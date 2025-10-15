
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
      <main className="flex-grow">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-headline font-bold text-center mb-10">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

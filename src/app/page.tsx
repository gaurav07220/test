
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products as allProducts, categories } from '@/lib/data';
import { ProductCard } from '@/components/shared/ProductCard';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import heroImage from '@/lib/placeholders/hero.json';

export default function Home() {
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16">
        <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center text-center text-white bg-primary">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-20"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="relative z-10 p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-headline font-bold mb-3 tracking-tighter">
              Groceries, Delivered in Minutes
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Your favorite local stores, right to your door.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                <Link href="/products">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Start Shopping
                </Link>
              </Button>
          </div>
        </section>

        <section id="categories" className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-headline font-bold text-center mb-6">Shop by Category</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link href="#" key={category.id}>
                  <div className="group bg-card p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">{category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-headline font-bold text-center mb-6">Featured Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/products">
                  Shop All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

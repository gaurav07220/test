
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
      <main className="flex-grow">
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white bg-primary">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-20"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="relative z-10 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold mb-4 tracking-tighter">
              Groceries, Delivered in Minutes
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              SwiftStore brings your favorite local stores right to your doorstep, faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg">
                <Link href="#products">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Start Shopping
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg">
                <Link href="/register">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="categories" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link href="#" key={category.id}>
                  <div className="group bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                    <p className="font-semibold group-hover:text-primary transition-colors">{category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="#">
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


"use client";

import { useState } from 'react';
import { products as allProducts } from '@/lib/data';
import { ProductCard } from '@/components/shared/ProductCard';
import { Header } from '@/components/shared/Header';
import { Search } from '@/components/shared/Search';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16">
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-headline font-bold text-center mb-4">All Products</h1>
            <div className="mb-8 max-w-md mx-auto">
              <Search onSearch={setSearchTerm} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

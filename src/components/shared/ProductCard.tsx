
"use client";

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/definitions';
import { useCart } from '@/context/CartProvider';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-0">
        <div className="aspect-square relative w-full">
          <Image
            src={product.image.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            data-ai-hint={product.image.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 flex-grow">
        <CardTitle className="text-base font-semibold leading-tight mb-1 line-clamp-2">{product.name}</CardTitle>
        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <p className="text-base font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button size="sm" onClick={handleAddToCart}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
}

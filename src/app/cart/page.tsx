
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartProvider';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 5; // Free shipping over $50
  const total = subtotal + taxes + shipping;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pb-20">
        <div className="flex items-center mb-6">
            <ShoppingCart className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-headline font-bold">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="flex flex-col items-center gap-4 pt-6">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground text-sm">Looks like you haven't added anything yet.</p>
                <Button asChild>
                <Link href="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Start Shopping
                </Link>
                </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                  <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</CardTitle>
                      <Button variant="outline" size="sm" onClick={clearCart}>
                          <Trash2 className="mr-2 h-4 w-4" /> Clear
                      </Button>
                  </div>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center p-4">
                      <Image
                        src={item.image.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover mr-4"
                        data-ai-hint={item.image.imageHint}
                      />
                      <div className="flex-grow">
                        <p className="font-semibold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold w-5 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                       <Button variant="ghost" size="icon" className="ml-2" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes (8%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

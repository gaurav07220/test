
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartProvider';
import { Header } from '@/components/shared/Header';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

const shippingSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is too short"),
  zip: z.string().min(5, "ZIP code is too short"),
  country: z.string().min(2, "Country is too short"),
});

const paymentSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
    cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
});

const checkoutSchema = shippingSchema.merge(paymentSchema);

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + taxes + shipping;

  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    console.log("Order placed:", data);
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push("/account/orders");
  };

  if (cart.length === 0) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-headline font-bold mb-4">Checkout</h1>
                <Card>
                    <CardContent className="pt-6">
                        <p>Your cart is empty. Add items to proceed to checkout.</p>
                        <Button asChild className="mt-4">
                            <Link href="/products"><ArrowLeft className="mr-2 h-4 w-4"/>Start Shopping</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-headline font-bold mb-6">Checkout</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <Form {...form}>
              <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <FormField name="name" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="address" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField name="city" control={form.control} render={({ field }) => (
                          <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )} />
                      <FormField name="zip" control={form.control} render={({ field }) => (
                          <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl><Input placeholder="12345" {...field} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )} />
                    </div>
                    <FormField name="country" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl><Input placeholder="United States" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField name="cardNumber" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField name="expiryDate" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expiry</FormLabel>
                                <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="cvc" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl><Input placeholder="123" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                  </CardContent>
                </Card>
                <div className="hidden md:block">
                  <Button type="submit" className="w-full" size="lg">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Place Order (${total.toFixed(2)})
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary ({cart.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <ul className="space-y-4 text-sm pr-4">
                    {cart.map(item => (
                      <li key={item.id} className="flex items-start justify-between">
                          <div className="flex items-start">
                              <Image src={item.image.imageUrl} alt={item.name} width={48} height={48} className="rounded-md mr-4" data-ai-hint={item.image.imageHint} />
                              <div>
                                  <p className="font-medium line-clamp-2">{item.name}</p>
                                  <p className="text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                          </div>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
           </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
            <Button type="submit" form="checkout-form" className="w-full" size="lg">
            <CreditCard className="mr-2 h-5 w-5" />
            Place Order (${total.toFixed(2)})
            </Button>
        </div>

      </main>
    </div>
  );
}

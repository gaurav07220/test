
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { products, categories } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  inventory: z.coerce.number().int().min(0, { message: "Inventory must be a non-negative integer." }),
  categoryId: z.string({ required_error: "Please select a category." }),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      inventory: 0,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    // In a real app, you would send this data to your backend
    console.log("New product data:", data);
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...data,
      storeId: 'store-1', // Assuming a default store
      image: { // Using a placeholder image
        id: "placeholder",
        description: "A placeholder image",
        imageUrl: `https://picsum.photos/seed/${Date.now()}/400/400`,
        imageHint: "product placeholder",
      },
    };
    products.unshift(newProduct); // Add to the top of the list for visibility
    
    toast({
      title: "Product Created",
      description: `${data.name} has been added to your products.`,
    });
    router.push('/admin/products');
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Add a New Product</CardTitle>
            <CardDescription>Fill out the details below to add a new product to your store.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Organic Avocados" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                            <Textarea placeholder="Describe the product..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                <Input type="number" step="0.01" placeholder="9.99" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="inventory"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Inventory</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="100" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <div className="flex justify-end gap-2">
                         <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit">Add Product</Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}

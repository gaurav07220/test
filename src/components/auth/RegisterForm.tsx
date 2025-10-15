
"use client";

import * as React from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth, Role } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  role: z.enum(['store', 'admin'], {
    required_error: 'You need to select an account type.',
  }),
  storeName: z.string().optional(),
  storeAddress: z.string().optional(),
}).refine(data => {
    if (data.role === 'store') {
        return data.storeName && data.storeName.length > 0;
    }
    return true;
}, {
    message: "Store name is required.",
    path: ["storeName"],
}).refine(data => {
    if (data.role === 'store') {
        return data.storeAddress && data.storeAddress.length > 0;
    }
    return true;
}, {
    message: "Store address is required.",
    path: ["storeAddress"],
});

type UserFormValue = z.infer<typeof formSchema>;

export function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'store',
      storeName: '',
      storeAddress: ''
    },
  });

  const selectedRole = form.watch("role");

  const onSubmit = (data: UserFormValue) => {
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      toast({
        title: 'Account Created!',
        description: `Welcome, ${data.name}! Your ${data.role} account is ready.`,
      });
      
      let redirectPath = '/';
      if (data.role === 'admin') {
        redirectPath = '/admin';
      } else if (data.role === 'store') {
        redirectPath = '/store';
      }
      
      login({ name: data.name, email: data.email, role: data.role as Role });
      router.push(redirectPath);
      router.refresh();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>I am a...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="store" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Store Owner
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="admin" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Administrator
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {selectedRole === 'store' && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Store Details</CardTitle>
              <CardDescription className="text-xs">
                Please provide information about your store.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Acme Fresh Market" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="storeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Market St, Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>
    </Form>
  );
}

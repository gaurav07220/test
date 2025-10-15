
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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  role: z.enum(['customer', 'admin'], {
    required_error: 'You need to select an account type.',
  }),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zip: z.string().optional(),
}).refine((data) => {
    if (data.role === 'customer') {
        return !!data.address && data.address.length >= 5;
    }
    return true;
}, {
    message: "Address must be at least 5 characters.",
    path: ["address"],
}).refine((data) => {
    if (data.role === 'customer') {
        return !!data.city && data.city.length >= 2;
    }
    return true;
}, {
    message: "City must be at least 2 characters.",
    path: ["city"],
}).refine((data) => {
    if (data.role === 'customer') {
        return !!data.state && data.state.length >= 2;
    }
    return true;
}, {
    message: "State must be at least 2 characters.",
    path: ["state"],
}).refine((data) => {
    if (data.role === 'customer') {
        return !!data.country && data.country.length >= 2;
    }
    return true;
}, {
    message: "Country must be at least 2 characters.",
    path: ["country"],
}).refine((data) => {
    if (data.role === 'customer') {
        return !!data.zip && data.zip.length >= 5;
    }
    return true;
}, {
    message: "Zip code must be at least 5 characters.",
    path: ["zip"],
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
      role: 'customer',
      address: '',
      city: '',
      state: '',
      country: '',
      zip: '',
    },
  });

  const selectedRole = form.watch('role');

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
      } else if (data.role === 'customer') {
        redirectPath = '/';
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
              <FormLabel>Account Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="customer" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Customer
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="admin" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Admin
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {selectedRole === 'customer' && (
            <>
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Anytown" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder="CA" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="USA" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="12345" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </>
        )}

        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>
    </Form>
  );
}

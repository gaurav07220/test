
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock user data, in a real app this would come from your auth provider
const useUser = () => {
    const [user, setUser] = React.useState<{ name: string; email: string; role: string } | null>(null);

    React.useEffect(() => {
        // Simulate fetching user data
        setUser({
            name: "Demo User",
            email: "user@blinkit.com",
            role: "Customer",
        });
    }, []);

    return { user, setUser };
};


const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({ name: user.name });
    }
  }, [user, form]);

  const onSubmit = (data: ProfileFormValues) => {
    setIsLoading(true);
    // Mock API call to update profile
    setTimeout(() => {
      if (setUser) {
          setUser(prev => prev ? {...prev, name: data.name} : null);
      }
      toast({
        title: "Profile Updated",
        description: "Your name has been successfully updated.",
      });
      setIsLoading(false);
    }, 1000);
  };

  if (!user) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
       <CardHeader className="px-0">
          <CardTitle>My Profile</CardTitle>
          <CardDescription>
            Manage your personal information.
          </CardDescription>
        </CardHeader>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email} disabled />
              </div>
               <div className="space-y-2">
                <Label>Role</Label>
                <Input value={user.role} disabled />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// Defining a Label component here as it's used in the form.
// In a real app this would likely be in your UI library.
const Label = React.forwardRef<
  React.ElementRef<typeof import("@radix-ui/react-label").Root>,
  React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-label").Root>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
    {...props}
  />
));
Label.displayName = "Label";


"use client";

import * as React from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { discounts as initialDiscounts } from "@/lib/data";
import type { Discount } from "@/lib/definitions";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const discountSchema = z.object({
    code: z.string().min(3, { message: "Code must be at least 3 characters." }).max(20, { message: "Code cannot be longer than 20 characters."}),
    percentage: z.coerce.number().min(1, { message: "Percentage must be at least 1."}).max(100, { message: "Percentage cannot be more than 100."}),
    isActive: z.boolean().default(true),
});

type DiscountFormValues = z.infer<typeof discountSchema>;

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = React.useState<Discount[]>(initialDiscounts);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedDiscount, setSelectedDiscount] = React.useState<Discount | null>(null);
  const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
  const { toast } = useToast();

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      code: "",
      percentage: 10,
      isActive: true,
    },
  });

  const openFormForCreate = () => {
    form.reset({ code: "", percentage: 10, isActive: true });
    setFormMode('create');
    setIsFormOpen(true);
  };
  
  const openFormForEdit = (discount: Discount) => {
    setSelectedDiscount(discount);
    form.reset(discount);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const openDeleteDialog = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = (data: DiscountFormValues) => {
    if (formMode === 'create') {
        const newDiscount: Discount = {
            id: `disc-${Date.now()}`,
            ...data
        };
        const newDiscounts = [newDiscount, ...discounts];
        setDiscounts(newDiscounts);
        initialDiscounts.splice(0, initialDiscounts.length, ...newDiscounts);

        toast({
            title: "Discount Created",
            description: `Code "${data.code}" has been created successfully.`,
        });
    } else if (formMode === 'edit' && selectedDiscount) {
        const updatedDiscount = { ...selectedDiscount, ...data };
        const newDiscounts = discounts.map(d => d.id === selectedDiscount.id ? updatedDiscount : d);
        setDiscounts(newDiscounts);
        initialDiscounts.splice(0, initialDiscounts.length, ...newDiscounts);

         toast({
            title: "Discount Updated",
            description: `Code "${data.code}" has been updated successfully.`,
        });
    }
    
    setIsFormOpen(false);
    setSelectedDiscount(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedDiscount) {
        const newDiscounts = discounts.filter(d => d.id !== selectedDiscount.id);
        setDiscounts(newDiscounts);
        initialDiscounts.splice(0, initialDiscounts.length, ...newDiscounts);

        toast({
            title: "Discount Deleted",
            description: `Code "${selectedDiscount.code}" has been deleted.`,
            variant: "destructive",
        });
    }
    setIsDeleteDialogOpen(false);
    setSelectedDiscount(null);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Discounts</h1>
            <p className="text-muted-foreground">
                Manage your promotional codes and offers.
            </p>
        </div>
        <Button size="sm" className="gap-1" onClick={openFormForCreate}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Create Discount</span>
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent>
                 <DialogHeader>
                  <DialogTitle>{formMode === 'create' ? 'Create a New Discount' : 'Edit Discount'}</DialogTitle>
                  <DialogDescription>
                    {formMode === 'create' ? 'Fill out the details to create a new promotional code.' : `Update the details for the code "${selectedDiscount?.code}".`}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form id="discount-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discount Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., SUMMER20" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="percentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Percentage</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="10" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Active</FormLabel>
                                    <p className="text-xs text-muted-foreground">
                                        Allow customers to use this code at checkout.
                                    </p>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                    <Button type="submit" form="discount-form">{formMode === 'create' ? 'Create Discount' : 'Save Changes'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell className="font-medium">{discount.code}</TableCell>
                  <TableCell>{discount.percentage}%</TableCell>
                  <TableCell>
                    <Badge variant={discount.isActive ? "default" : "secondary"}>
                      {discount.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openFormForEdit(discount)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(discount)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the discount code "{selectedDiscount?.code}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}


"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, PlusCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products as allProducts, categories } from "@/lib/data";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/lib/definitions";

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<Product[]>(allProducts);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = React.useState(false);
  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const { toast } = useToast();

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId) {
      const updatedProducts = products.filter((p) => p.id !== selectedProductId);
      setProducts(updatedProducts);
      // Also update the source `allProducts` if you want changes to persist across navigations
      // This is a client-side mock, so real data persistence would need a backend.
      const productIndex = allProducts.findIndex(p => p.id === selectedProductId);
      if (productIndex > -1) {
        allProducts.splice(productIndex, 1);
      }
      
      toast({
        title: "Product Deleted",
        description: "The product has been successfully deleted.",
        variant: "destructive"
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedProductId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to import.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;
      const lines = text.split('\n').slice(1); // Skip header row
      const newProducts: Product[] = [];
      
      lines.forEach((line, index) => {
        if (!line.trim()) return; // Skip empty lines
        const [name, description, price, inventoryStr, categoryId] = line.split(',');
        const priceNum = parseFloat(price);
        const inventory = parseInt(inventoryStr, 10);
        
        if (name && description && !isNaN(priceNum) && !isNaN(inventory) && categoryId) {
          const categoryExists = categories.some(c => c.id === categoryId.trim());
          if (categoryExists) {
             newProducts.push({
              id: `prod-${Date.now()}-${index}`,
              name: name.trim(),
              description: description.trim(),
              price: priceNum,
              inventory: inventory,
              categoryId: categoryId.trim(),
              storeId: 'store-1', // Default store for imported products
              image: {
                id: `placeholder-${Date.now()}-${index}`,
                description: `Placeholder for ${name.trim()}`,
                imageUrl: `https://picsum.photos/seed/${Date.now()}${index}/400/400`,
                imageHint: "product placeholder",
              },
            });
          } else {
            toast({
              title: `Import Error on row ${index + 2}`,
              description: `Category ID '${categoryId.trim()}' does not exist.`,
              variant: "destructive",
            });
          }
        } else {
            toast({
              title: `Import Error on row ${index + 2}`,
              description: `Row has missing or invalid data.`,
              variant: "destructive",
            });
        }
      });
      
      if (newProducts.length > 0) {
        setProducts(prev => [...newProducts, ...prev]);
        allProducts.unshift(...newProducts);
        toast({
          title: "Import Successful",
          description: `${newProducts.length} new products have been added.`,
        });
        setIsImportDialogOpen(false);
        setFile(null);
      }
    };
    reader.readAsText(file);
  };


  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
                Manage your products and view their sales performance.
            </p>
        </div>
        <div className="flex gap-2">
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="gap-1">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Import</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Products via CSV</DialogTitle>
                  <DialogDescription>
                    Upload a CSV file to add multiple products at once. The file must follow a specific format.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                   <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                     <p className="font-semibold mb-1">CSV Format Required:</p>
                     <p className="font-mono text-xs">name,description,price,inventory,categoryId</p>
                     <p className="mt-2 text-xs">The first row must be the header. Ensure `categoryId` matches an existing category ID.</p>
                   </div>
                   <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="csv-file">CSV File</Label>
                    <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleImport}>Import Products</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button size="sm" className="gap-1" asChild>
              <Link href="/admin/products/new">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Add Product</span>
              </Link>
            </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {products.map((product) => (
          <Card key={product.id} className="mb-4">
            <CardHeader className="p-4 flex flex-row items-start gap-4">
              <Image
                alt={product.name}
                className="aspect-square rounded-md object-cover"
                height="64"
                src={product.image.imageUrl}
                width="64"
                data-ai-hint={product.image.imageHint}
              />
              <div className="flex-grow">
                <CardTitle className="text-base mb-1">{product.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>${product.price.toFixed(2)}</span>
                    <span>&middot;</span>
                    <span>{product.inventory} in stock</span>
                </div>
                 <Badge
                    variant={product.inventory > 0 ? "outline" : "destructive"}
                    className="mt-2"
                >
                    {product.inventory > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
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
                    <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={() => handleDeleteClick(product.id)}
                    className="text-destructive"
                    >
                    Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Desktop View */}
      <Card className="hidden md:block">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={product.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.image.imageUrl}
                      width="64"
                      data-ai-hint={product.image.imageHint}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.inventory > 0 ? "outline" : "destructive"}
                    >
                      {product.inventory > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.inventory}</TableCell>
                  <TableCell>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(product.id)}
                          className="text-destructive"
                        >
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
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{products.length}</strong> of{" "}
            <strong>{products.length}</strong> products
          </div>
        </CardFooter>
      </Card>
      
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
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

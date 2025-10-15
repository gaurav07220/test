
"use client";

import * as React from "react";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { orders } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/lib/definitions";

export default function MyOrdersPage() {
  const userOrders = orders.filter(order => order.userId === 'user-1');
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
      <div>
        <CardHeader className="px-0">
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Here's a list of your past orders.
          </CardDescription>
        </CardHeader>
        
        {/* Mobile View - List of Cards */}
        <div className="md:hidden flex flex-col gap-4">
            {userOrders.map((order) => (
                <Card key={order.id}>
                    <CardHeader>
                        <CardTitle className="text-base">Order #{order.id.slice(-6)}</CardTitle>
                        <CardDescription>{order.date.toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                             <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="w-fit mt-1">
                                {order.status}
                            </Badge>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>View Details</Button>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Desktop View - Table */}
        <Card className="hidden md:block">
            <CardContent className="p-0">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {userOrders.map((order) => (
                    <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                    <TableCell>{order.date.toLocaleDateString()}</TableCell>
                    <TableCell>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                        {order.status}
                        </Badge>
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>View Details</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        
        {selectedOrder && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md w-full sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                            Order #{selectedOrder.id.slice(-6)}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2 text-sm">
                            <p><strong>Date:</strong> {selectedOrder.date.toLocaleDateString()}</p>
                            <p><strong>Status:</strong> <Badge variant={selectedOrder.status === 'Delivered' ? 'default' : 'secondary'}>{selectedOrder.status}</Badge></p>
                            <p><strong>Shipping To:</strong> {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zip}</p>
                        </div>
                        <Separator />
                        <h4 className="font-semibold">Items</h4>
                         <ul className="space-y-3">
                            {selectedOrder.items.map(item => (
                                <li key={item.product.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <Image src={item.product.image.imageUrl} alt={item.product.name} width={40} height={40} className="rounded-md" />
                                        <div>
                                            <p className="font-medium line-clamp-1">{item.product.name}</p>
                                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                         <Separator />
                         <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${selectedOrder.total.toFixed(2)}</span>
                         </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
      </div>
  )
}

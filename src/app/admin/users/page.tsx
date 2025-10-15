
"use client";

import * as React from "react";
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
import { users as initialUsers } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/definitions";

export default function AdminCustomersPage() {
    const [users, setUsers] = React.useState(initialUsers.filter(user => user.role !== 'admin'));
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const { toast } = useToast();

    const openDeleteDialog = (user: User) => {
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedUser) {
            const newUsers = users.filter(u => u.id !== selectedUser.id);
            setUsers(newUsers);

            const userIndex = initialUsers.findIndex(u => u.id === selectedUser.id);
            if (userIndex > -1) {
                initialUsers.splice(userIndex, 1);
            }

            toast({
                title: "User Deleted",
                description: `User "${selectedUser.name}" has been deleted.`,
                variant: "destructive",
            });
        }
        setIsDeleteDialogOpen(false);
        setSelectedUser(null);
    };

  return (
    <>
    <div>
        <CardHeader className="px-0">
            <CardTitle>Users</CardTitle>
            <CardDescription>
            Here is a list of all non-admin users.
            </CardDescription>
        </CardHeader>
        
        {/* Mobile View */}
        <div className="md:hidden space-y-4">
            {users.map((customer) => (
                <Card key={customer.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://avatar.vercel.sh/${customer.email}.png`} alt={customer.name} />
                            <AvatarFallback>{customer.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <p className="font-semibold">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                            <Badge variant="outline" className="mt-1 capitalize">{customer.role}</Badge>
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
                            <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(customer)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Desktop View */}
        <Card className="hidden md:block">
            <CardContent className="p-0">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={`https://avatar.vercel.sh/${customer.email}.png`} alt={customer.name} />
                                    <AvatarFallback>{customer.name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{customer.name}</div>
                            </div>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className="capitalize">{customer.role}</Badge>
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
                                <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(customer)}>
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
    </div>
    <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user "{selectedUser?.name}".
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
  )
}

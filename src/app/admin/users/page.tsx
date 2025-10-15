
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
import { users } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function AdminCustomersPage() {
    const customers = users.filter(user => user.role !== 'admin');

  return (
    <div>
        <CardHeader className="px-0">
            <CardTitle>Users</CardTitle>
            <CardDescription>
            Here is a list of all non-admin users.
            </CardDescription>
        </CardHeader>
        
        {/* Mobile View */}
        <div className="md:hidden space-y-4">
            {customers.map((customer) => (
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((customer) => (
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
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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

export default function MyOrdersPage() {
  const userOrders = orders.filter(order => order.userId === 'user-1');

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
                        <Button variant="outline" size="sm">View Details</Button>
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
                        <Button variant="outline" size="sm">View Details</Button>
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

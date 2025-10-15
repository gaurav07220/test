
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AdminStats } from "@/components/dashboard/AdminStats";

export default function Dashboard() {

  return (
    <div className="flex flex-col gap-4">
      <CardHeader className="px-0 pt-0">
          <CardTitle>Admin Dashboard</CardTitle>
      </CardHeader>
      <AdminStats />
    </div>
  )
}

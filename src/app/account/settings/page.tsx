
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
        <CardHeader className="px-0">
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account and notification settings.
          </CardDescription>
        </CardHeader>
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>
                    Choose what you want to be notified about.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="marketing-emails">
                        <span className="font-medium">Marketing Emails</span>
                        <p className="text-xs text-muted-foreground">Receive emails about new products, features, and more.</p>
                    </Label>
                    <Switch id="marketing-emails" />
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="security-emails">
                         <span className="font-medium">Security Emails</span>
                        <p className="text-xs text-muted-foreground">Receive emails about your account security.</p>
                    </Label>
                    <Switch id="security-emails" defaultChecked />
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="text-lg">Account</CardTitle>
                <CardDescription>
                    Manage your account settings.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">This is where account management settings would go.</p>
            </CardContent>
        </Card>
    </div>
  )
}

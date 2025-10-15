
"use client";

import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const { toast } = useToast();
  const { logout } = useAuth();
  const router = useRouter();

  const handleDeleteAccount = () => {
    // In a real app, you'd call your backend to delete the user data.
    // For this mock, we'll just log the user out and show a toast.
    console.log("Account deleted");
    
    toast({
      title: "Account Deleted",
      description: "Your account has been successfully deleted.",
      variant: "destructive",
    });

    logout();
    router.push("/");
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
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
          <Card className="border-destructive">
              <CardHeader>
                  <CardTitle className="text-lg text-destructive">Delete Account</CardTitle>
                  <CardDescription>
                      Permanently delete your account and all associated data. This action cannot be undone.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                      Delete My Account
                  </Button>
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
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

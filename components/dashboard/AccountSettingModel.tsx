import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Settings, Building2, Bell, Shield, CreditCard, Save, Loader2 } from "lucide-react";
import { dummyNGOProfile } from "@/app/dummydata";
import toast from "react-hot-toast";

interface AccountSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AccountSettingsModal = ({ open, onOpenChange }: AccountSettingsModalProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: dummyNGOProfile.name,
    email: "contact@hopeforeducation.org",
    phone: "+91 98765 43210",
    description: dummyNGOProfile?.description,
    address: "123 Education Lane, Mumbai, Maharashtra 400001",
    website: "https://hopeforeducation.org",
  });
  const [notifications, setNotifications] = useState({
    newDonation: true,
    campaignUpdates: true,
    weeklyDigest: true,
    donorMessages: true,
    aiInsights: true,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 1500);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: Building2 },
    // { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-secondary" />
            Account Settings
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 py-4">
          {/* Sidebar Tabs */}
          <div className="w-40 space-y-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted bg-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Organization Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div>
                      <span className="text-sm font-medium text-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {key === "newDonation" && "Get notified when you receive a new donation"}
                        {key === "campaignUpdates" && "Updates about your campaign performance"}
                        {key === "weeklyDigest" && "Weekly summary of your activities"}
                        {key === "donorMessages" && "Messages from your donors"}
                        {key === "aiInsights" && "AI-powered recommendations and insights"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => 
                        setNotifications((prev) => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="bg-muted/50 rounded-xl p-4 mt-4">
                  <h4 className="font-medium text-foreground mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" size="sm">Enable 2FA</Button>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <h4 className="font-medium text-foreground mb-1">Current Plan</h4>
                  <p className="text-2xl font-bold text-secondary">Free Plan</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Perfect for getting started. Upgrade for more features.
                  </p>
                </div>
                <div className="bg-linear-to-r from-secondary/10 via-primary/10 to-accent/10 rounded-xl p-4 border border-border">
                  <h4 className="font-medium text-foreground mb-1">Pro Plan</h4>
                  <p className="text-lg font-bold text-foreground">Rs999/month</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Advanced AI insights</li>
                    <li>• Priority donor matching</li>
                    <li>• Custom branding</li>
                    <li>• Dedicated support</li>
                  </ul>
                  <Button variant="secondary" className="mt-3" size="sm">Upgrade to Pro</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="secondary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSettingsModal;
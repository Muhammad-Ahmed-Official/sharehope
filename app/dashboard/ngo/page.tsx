'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
   TrendingUp, Users, IndianRupee, 
  BarChart3, Plus, Eye, Settings, ArrowUp, ArrowDown,
  Calendar, Sparkles, Target, 
} from "lucide-react";
import { dummyNGOProfile, dummyNGODonations } from "@/app/dummydata";
import Navbar from "@/components/Navbar";

const MatchingStats = [
  {
    name: "Donors Matched Today",
    number: 23,
  },
  {
    name: "Avg Match Score",
    number: "87%",
  },
  {
    name: "Conversion Rate",
    number: "34%",
  },
  {
    name: "Profile Views",
    number: 156,
  },
]

export default function NgoDashboard () {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: IndianRupee, label: "Total Raised", value: `₹${(dummyNGOProfile.totalRaised / 100000).toFixed(1)}L`, trend: "+12%", up: true, color: "secondary" },
            { icon: Users, label: "Total Donors", value: dummyNGOProfile.donorsCount.toString(), trend: "+8%", up: true, color: "primary" },
            { icon: Target, label: "Active Campaigns", value: dummyNGOProfile.activeCampaigns.toString(), trend: "0", up: true, color: "accent" },
            { icon: BarChart3, label: "Beneficiaries", value: dummyNGOProfile.beneficiaries.toLocaleString(), trend: "+25%", up: true, color: "secondary" },
          ].map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-2xl p-5 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.color === "primary" ? "bg-primary/10 text-primary" :
                  stat.color === "secondary" ? "bg-secondary/10 text-secondary" :
                  "bg-accent/10 text-accent"
                }`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.up ? "text-primary" : "text-destructive"
                }`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Overview" },
            { id: "donations", label: "Donations" },
            { id: "campaigns", label: "Campaigns" },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Insights */}
            <div className="bg-linear-to-r from-secondary/10 via-primary/10 to-accent/10 border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    AI Insights
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Your "School Supplies Drive" campaign is trending! 23 new donors matched in the last 24 hours. Consider increasing your fundraising goal by 20%.
                  </p>
                  <div className="flex gap-3">
                    <Button className="cursor-pointer" variant="secondary" size="sm">
                      Update Goal
                    </Button>
                    <Button className="cursor-pointer" variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  Recent Donations
                </h3>
                <Button className="cursor-pointer" variant="ghost" size="sm">
                  View All
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Donor</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Campaign</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyNGODonations.map((donation) => (
                      <tr key={donation.id} className="border-b border-border last:border-0">
                        <td className="py-4 px-2">
                          <span className="font-medium text-foreground">{donation.donorName}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="text-sm text-muted-foreground">{donation.campaign}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="text-sm text-muted-foreground">{donation.date}</span>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <span className="font-semibold text-secondary">₹{donation.amount.toLocaleString()}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Campaign Performance */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
              <h3 className="font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Campaign Performance
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: "School Supplies Drive", raised: 75000, goal: 100000, donors: 45 },
                  { name: "Teacher Training Program", raised: 45000, goal: 80000, donors: 28 },
                  { name: "Infrastructure Development", raised: 120000, goal: 200000, donors: 15 },
                ].map((campaign, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{campaign.name}</h4>
                      <span className="text-sm text-muted-foreground">{campaign.donors} donors</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary rounded-full transition-all"
                          style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {Math.round((campaign.raised / campaign.goal) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>₹{(campaign.raised / 1000).toFixed(0)}K raised</span>
                      <span>Goal: ₹{(campaign.goal / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
              <h3 className="font-display font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full justify-start cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
                <Button variant="outline" className="w-full justify-start cursor-pointer">
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Profile
                </Button>
                <Button variant="outline" className="w-full justify-start cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </div>

            {/* Organization Stats */}
            <div className="bg-linear-to-br from-foreground to-foreground/90 text-background rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-4">Organization Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-background/70">Profile Completeness</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="h-2 bg-background/20 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-background/70">Donor Satisfaction</span>
                    <span className="font-medium">★ {dummyNGOProfile.rating}</span>
                  </div>
                  <div className="h-2 bg-background/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${dummyNGOProfile.rating * 20}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-background/70">Response Rate</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="h-2 bg-background/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Matching Stats */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI Matching Stats
              </h3>
              <div className="space-y-3">
                {
                  MatchingStats.map((val, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground text-sm">{val.name}</span>
                      <span className="font-semibold text-foreground">{val.number}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { 
  Heart, LogOut, Search,  Star, MapPin, Verified, 
  TrendingUp, Gift, FileText, ArrowRight, Sparkles, Users,
  BarChart3, Calendar
} from "lucide-react";
import { dummyNGOs, dummyDonations, dummyDonorProfile } from "@/app/dummydata";
import AIChatBot from "@/components/AiChatbot";

const ImpactSummary = [
  {
    name: "Children Educated",
    number: 45 
  },
  {
    name: "Trees planted",
    number: 25
  },
  {
    name: "Meals Provided",
    number: 500
  },
  {
    name: "Medical Checkups",
    number: 10
  },
]
 
export default function DonorDashboard () {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Education", "Healthcare", "Environment", "Child Welfare"];

  const filteredNGOs = dummyNGOs.filter((ngo:any) => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ngo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDonate = (ngoName: string) => {
    // toast.success(`Donation initiated for ${ngoName}! (Demo mode)`);
  };

  const handleLogout = () => {
    // localStorage.removeItem("giveai_user");
    // navigate("/");
    // toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Heart className="w-7 h-7 text-primary fill-primary/20" />
            <span className="font-display font-bold text-lg">GiveAI</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              Welcome, {dummyDonorProfile.name}
            </span>
            <Button className="cursor-pointer" variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Gift, label: "Total Donated", value: `₹${dummyDonorProfile.totalDonated.toLocaleString()}`, color: "primary" },
            { icon: Users, label: "Lives Impacted", value: dummyDonorProfile.livesImpacted.toString(), color: "secondary" },
            { icon: BarChart3, label: "Impact Score", value: dummyDonorProfile.impactScore.toString(), color: "accent" },
            { icon: FileText, label: "Tax Saved", value: `₹${dummyDonorProfile.taxSaved.toLocaleString()}`, color: "primary" },
          ].map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-2xl p-5 shadow-soft">
              <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${
                stat.color === "primary" ? "bg-primary/10 text-primary" :
                stat.color === "secondary" ? "bg-secondary/10 text-secondary" :
                "bg-accent/10 text-accent"
              }`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendation Banner */}
            <div className="bg-linear-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    AI Recommends for You
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Based on your interests in {dummyDonorProfile.causes.join(" & ")}, we found 3 new verified NGOs with 90%+ match scores.
                  </p>
                  <Button variant="default" size="sm" className="group cursor-pointer">
                    View Recommendations
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search NGOs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* NGO Cards */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Recommended NGOs
              </h3>
              {filteredNGOs.map((ngo:any) => (
                <div
                  key={ngo.id}
                  className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-glow-primary/10 transition-all"
                >
                  <div className="flex gap-4">
                    <img
                      src={ngo.image}
                      alt={ngo.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-semibold text-foreground truncate">
                              {ngo.name}
                            </h4>
                            {ngo.verified && (
                              <Verified className="w-4 h-4 text-primary shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {ngo.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-secondary text-secondary" />
                              {ngo.rating}
                            </span>
                          </div>
                        </div>
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium shrink-0">
                          {ngo.aiMatchScore}% Match
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {ngo.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Raised: </span>
                          <span className="font-semibold text-foreground">
                            ₹{(ngo.totalRaised / 100000).toFixed(1)}L
                          </span>
                          <span className="text-muted-foreground"> / ₹{(ngo.goal / 100000).toFixed(1)}L</span>
                        </div>
                        <Button className="cursor-pointer" size="sm" onClick={() => handleDonate(ngo.name)}>
                          Donate Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Donations */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Donations
              </h3>
              <div className="space-y-4">
                {dummyDonations.slice(0, 3).map((donation:any) => (
                  <div key={donation.id} className="flex items-start justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-foreground text-sm">{donation.ngoName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{donation.impact}</p>
                      <p className="text-xs text-muted-foreground">{donation.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">₹{donation.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{donation.receiptId}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 cursor-pointer">
                View All Donations
              </Button>
            </div>

            {/* Impact Summary */}
            <div className="bg-linear-to-br from-foreground to-foreground/90 text-background rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Your Impact This Year
              </h3>
              <div className="space-y-3">
                {
                  ImpactSummary.map((val, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-background/70">{val.name}</span>
                      <span className="font-semibold">{val.number}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Chatbot */}
      <AIChatBot />
    </div>
  );
};
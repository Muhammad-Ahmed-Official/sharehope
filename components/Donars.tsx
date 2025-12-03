import { Button } from "@/components/ui/button";
import { Heart, Zap, BarChart3, Gift, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Zap,
    title: "Instant AI Recommendations",
    description: "Get personalized NGO suggestions based on your interests in seconds.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Impact Dashboard",
    description: "Track how your donations are being used with live updates.",
  },
  {
    icon: Gift,
    title: "Flexible Giving Options",
    description: "One-time, monthly, or cause-based donations - you choose.",
  },
  {
    icon: Heart,
    title: "Tax Benefits Made Easy",
    description: "Automatic 80G receipts and tax documentation.",
  },
];

export default function Donars() {
  return (
    <section id="donors" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">For Donors</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"> Give Smarter, Not Harder </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of conscious givers who trust our AI to maximize their social impact. Every donation is verified, tracked, and reported.
            </p>

            <div className="space-y-4 mb-8">
              {["100% Verified NGOs", "Zero Platform Fees", "Complete Transparency", "Instant Tax Receipts"].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

             <Link href='/register/donar'>
                <Button variant="hero" className="group cursor-pointer">
                Start Donating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
             </Link> 
          </div>

          {/* Right - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-glow-primary/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Building2 } from "lucide-react";
import Link from "next/link";

const donationRecord = [
    { value: "₹12Cr+", label: "Donations Matched" },
    { value: "50K+", label: "Active Donors" },
    { value: "500+", label: "Verified NGOs" },
    { value: "98%", label: "AI Match Rate" },
]

export default  function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "3s" }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-8 shadow-soft animate-fade-in">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Giving Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
            Smart Donations,
            <span className="text-gradient-primary">Real Impact</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Our AI matches your passion with verified NGOs, ensuring every rupee creates maximum social impact. Join the future of meaningful giving.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/dashboard/donar">
                <Button variant="hero" className="w-full sm:w-auto group cursor-pointer">
                <Users className="w-5 h-5" />
                Become a Donor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>  
            <Link href="/register/ngo">
                <Button variant="heroSecondary" className="w-full sm:w-auto group cursor-pointer">
                <Building2 className="w-5 h-5" />
                Register as NGO
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {donationRecord.map((stat, index) => (
              <div key={index} className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 md:p-6 shadow-soft">
                <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTASection () {
const Badges = [
    {
        name: "SSL Secured",
        color: "bg-primary",
    },
    {
        name: "80G Tax Benefits",
        color: "bg-secondary",
    },
    {
        name: "RBI Compliant",
        color: "bg-accent",
    },
] 
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/5 to-accent/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6 shadow-soft">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse-soft" />
            <span className="text-sm font-medium text-muted-foreground">Start Your Giving Journey</span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Make a
            <span className="text-gradient-primary">Difference?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join Pakistan's smartest giving community. Let AI help you create impact that lasts generations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/register/donar">
                <Button variant="hero" className="w-full sm:w-auto group cursor-pointer">
                <Heart className="w-5 h-5" />
                Donate Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>  
            <Link href="/Signin">
                <Button variant="heroSecondary" className="w-full sm:w-auto group cursor-pointer">
                Schedule a Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {
                Badges.map((val, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${val.color}`} />
                        <span>{val.name}</span>
                    </div>
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};
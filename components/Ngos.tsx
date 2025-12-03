import { Button } from "@/components/ui/button";
import { Building2, Users, Globe, FileCheck, ArrowRight, Verified } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Users,
    title: "Access to 50K+ Donors",
    description: "Connect with a community of verified donors actively looking to support causes like yours.",
  },
  {
    icon: Globe,
    title: "AI-Powered Visibility",
    description: "Our algorithm promotes your campaigns to donors who genuinely care about your mission.",
  },
  {
    icon: FileCheck,
    title: "Easy Compliance",
    description: "Simplified reporting and documentation that meets all regulatory requirements.",
  },
  {
    icon: Verified,
    title: "Trust Badge",
    description: "Get verified status that builds credibility and increases donor confidence.",
  },
];

export default function Ngos() {

  return (
    <section id="ngos" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Benefits Grid */}
          <div className="order-2 lg:order-1">
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-glow-secondary/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">For NGOs</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Amplify Your Impact with AI
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our network of 500+ verified NGOs. Let our AI technology connect you with the right donors and help you raise more funds with less effort.
            </p>

            <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-soft">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-background font-display font-bold">
                  3x
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">Average Fundraising Increase</div>
                  <div className="text-sm text-muted-foreground">Compared to traditional methods</div>
                </div>
              </div>
            </div>

             <Link href='/register/ngo'>
                <Button variant="secondary" size="xl" className="group cursor-pointer">
                Register Your NGO
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
             </Link> 
          </div>
        </div>
      </div>
    </section>
  );
};
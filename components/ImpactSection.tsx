import { TrendingUp, School, HeartPulse, TreePine, Home } from "lucide-react";

const impactAreas = [
  { icon: School, label: "Education", amount: "Rs4.2 Cr", color: "primary" },
  { icon: HeartPulse, label: "Healthcare", amount: "Rs3.8 Cr", color: "secondary" },
  { icon: TreePine, label: "Environment", amount: "Rs2.1 Cr", color: "accent" },
  { icon: Home, label: "Housing", amount: "Rs1.9 Cr", color: "primary" },
];

const ImpactStats = [
    {
        name: "Lives Impacted",
        number: "2.5L+",
    },
    {
        name: "States Covered",
        number: "28",
    },
    {
        name: "Projects Funded",
        number: "1200+",
    },
    {
        name: "Donor Rating",
        number: "4.9★",
    }
]

export default function ImpactSection() {
  return (
    <section id="impact" className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: "32px 32px"
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-background/10 text-background rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Our Impact</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Together, We've Changed{" "}
              <span className="text-secondary">Lives</span>
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Every number represents real change. Real families. Real futures transformed through the power of intelligent giving.
            </p>

            {/* Impact Stats */}
            { ImpactStats.map((val, index) => (
                <div key={index} className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="font-display text-4xl md:text-5xl font-bold text-secondary mb-1">{val.number}</div>
                        <div className="text-background/70">{val.name}</div>
                    </div>
                </div>
            ))}
            
          </div>

          {/* Right - Impact Areas */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold mb-6">Where Your Money Goes</h3>
            {impactAreas.map((area, index) => (
              <div
                key={index}
                className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-background/10 transition-colors duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  area.color === "primary" ? "bg-primary/20 text-primary" :
                  area.color === "secondary" ? "bg-secondary/20 text-secondary" :
                  "bg-accent/20 text-accent"
                }`}>
                  <area.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-semibold">{area.label}</div>
                </div>
                <div className="font-display text-xl font-bold">{area.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
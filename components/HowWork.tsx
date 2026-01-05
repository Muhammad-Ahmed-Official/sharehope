import { Brain, Target, Shield, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Brain,
    title: "AI Analyzes Your Intent",
    description: "Tell us your passion - education, healthcare, environment - our AI understands your giving goals.",
    color: "primary",
  },
  {
    icon: Target,
    title: "Smart NGO Matching",
    description: "We match you with verified NGOs that align with your values and have proven impact records.",
    color: "secondary",
  },
  {
    icon: Shield,
    title: "Transparent Tracking",
    description: "Track your donation's journey with real-time updates and impact reports from the field.",
    color: "accent",
  },
  {
    icon: TrendingUp,
    title: "Measure Your Impact",
    description: "See the lives you've touched with detailed analytics and heartfelt stories from beneficiaries.",
    color: "primary",
  },
];

export default function HowWork() {
  return (
    <section id="how-it-works" className="p-4 py-8 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-xl md:text-5xl font-bold text-foreground mb-4">
            How <span className="text-gradient-primary">AI</span> Works
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Our intelligent platform makes giving effortless, transparent, and impactful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-glow-primary/20 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-display font-bold text-sm">
                {index + 1}
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                  step.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : step.color === "secondary"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-accent/10 text-accent"
                }`}
              >
                <step.icon className="w-7 h-7" />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connecting line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
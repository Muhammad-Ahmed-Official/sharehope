import { Sparkles, MessageSquare, LineChart, ShieldCheck, Fingerprint, Lightbulb, Bot } from "lucide-react";

const aiFeatures = [
  {
    icon: MessageSquare,
    title: "Smart Chatbot",
    description: "Ask anything about donations, NGOs, or impact - our AI assistant guides you 24/7.",
  },
  {
    icon: Fingerprint,
    title: "Donor DNA Matching",
    description: "Our algorithm creates your unique giving profile and matches you with perfect causes.",
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "AI predicts the potential impact of your donation before you give.",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Detection",
    description: "Advanced AI scans verify every NGO and flag suspicious activities instantly.",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description: "Get personalized giving recommendations based on global trends and local needs.",
  },
  {
    icon: Sparkles,
    title: "Impact Stories",
    description: "AI curates and delivers stories showing exactly how your money changed lives.",
  },
];

export default function AIFeatures() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-2 mb-6">
            <Bot className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Features</span>
          </div>
          
          <h2 className="font-display text-xl md:text-5xl font-bold text-foreground mb-4">
            Intelligence That
            <span className="text-gradient-secondary">  Amplifies Giving</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Our proprietary AI technology makes GiveAI the most advanced donation platform in Pakistan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-glow-accent/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7" />
                </div>
                
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
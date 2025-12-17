import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Star,
  MapPin,
  Verified,
  Heart,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from "lucide-react";
import { dummyNGOs, dummyDonorProfile } from "@/app/dummydata";
import toast from "react-hot-toast";

interface AIRecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIRecommendationsModal({ isOpen, onClose }: AIRecommendationsModalProps){
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, "up" | "down">>({});

  // Get top 3 NGOs as AI recommendations
  const recommendations = dummyNGOs
    .sort((a:any, b:any) => b.aiMatchScore - a.aiMatchScore)
    .slice(0, 3);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Recommendations refreshed based on latest data!");
    }, 1500);
  };

  const handleFeedback = (ngoId: string, type: "up" | "down") => {
    setFeedbackGiven(prev => ({ ...prev, [ngoId]: type }));
    toast.success(type === "up" 
      ? "Thanks! We'll show more like this." 
      : "Got it! We'll adjust your recommendations.");
  };

  const handleDonate = (ngoName: string) => {
    toast.success(`Donation initiated for ${ngoName}! (Demo mode)`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            AI-Powered Recommendations
          </DialogTitle>
        </DialogHeader>

        {/* AI Analysis Summary */}
        <div className="bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5 border border-border rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">Your Donor DNA Analysis</h4>
              <p className="text-muted-foreground text-sm mt-1">
                Based on your interests in <span className="text-primary font-medium">{dummyDonorProfile.causes.join(", ")}</span>, 
                donation history of <span className="text-primary font-medium">Rs{dummyDonorProfile.totalDonated.toLocaleString()}</span>, 
                and impact preference for <span className="text-primary font-medium">high transparency NGOs</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Match Factors */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Heart, label: "Cause Alignment", value: "95%", color: "primary" },
            { icon: TrendingUp, label: "Impact Efficiency", value: "92%", color: "secondary" },
            { icon: Zap, label: "Fund Utilization", value: "88%", color: "accent" },
          ].map((factor, index) => (
            <div key={index} className="bg-muted/30 rounded-xl p-3 text-center">
              <factor.icon className={`w-5 h-5 mx-auto mb-1 ${
                factor.color === "primary" ? "text-primary" :
                factor.color === "secondary" ? "text-secondary" :
                "text-accent"
              }`} />
              <div className="font-bold text-foreground">{factor.value}</div>
              <div className="text-xs text-muted-foreground">{factor.label}</div>
            </div>
          ))}
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-semibold text-foreground">Top Matches for You</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {recommendations.map((ngo, index) => (
            <div
              key={ngo.id}
              className="bg-card border border-border rounded-xl p-4 hover:shadow-soft transition-all"
            >
              <div className="flex gap-4">
                {/* Rank Badge */}
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? "bg-secondary text-secondary-foreground" :
                    index === 1 ? "bg-muted text-muted-foreground" :
                    "bg-accent/20 text-accent"
                  }`}>
                    #{index + 1}
                  </div>
                  <img
                    src={ngo.image}
                    alt={ngo.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-display font-semibold text-foreground">
                          {ngo.name}
                        </h5>
                        {ngo.verified && (
                          <Verified className="w-4 h-4 text-primary" />
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
                        <span className="bg-muted px-2 py-0.5 rounded text-xs">
                          {ngo.category}
                        </span>
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                      {ngo.aiMatchScore}%
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">
                    {ngo.description}
                  </p>

                  {/* AI Match Reasons */}
                  <div className="mt-3 p-2 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <span className="text-primary font-medium">AI Match Reason:</span>{" "}
                      {index === 0 && "Strong alignment with your education cause preference. 98% fund utilization rate with transparent reporting."}
                      {index === 1 && "Matches your healthcare interest. Has impacted 10,000+ lives with verified outcomes."}
                      {index === 2 && "Aligns with child welfare focus. Award-winning NGO with government recognition."}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Was this helpful?</span>
                      <button
                        onClick={() => handleFeedback(ngo.id, "up")}
                        className={`p-1.5 rounded-lg transition-colors ${
                          feedbackGiven[ngo.id] === "up" 
                            ? "bg-primary/20 text-primary" 
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(ngo.id, "down")}
                        className={`p-1.5 rounded-lg transition-colors ${
                          feedbackGiven[ngo.id] === "down" 
                            ? "bg-destructive/20 text-destructive" 
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                    <Button size="sm" onClick={() => handleDonate(ngo.name)} className="group">
                      Donate Now
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tips */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">
            💡 <span className="font-medium">Tip:</span> Your recommendations improve as you donate more. 
            Give feedback to help our AI understand your preferences better.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
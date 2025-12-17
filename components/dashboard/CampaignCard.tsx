import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/Progress";
import { Verified, Clock, Users, Sparkles, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface Campaign {
  id: string;
  ngoId: string;
  ngoName: string;
  ngoVerified: boolean;
  title: string;
  description: string;
  category: string;
  goal: number;
  raised: number;
  donorsCount: number;
  daysLeft: number;
  image: string;
  urgency: string;
  aiSuggested: boolean;
}

interface CampaignCardProps {
  campaign: Campaign;
  variant?: "default" | "compact";
}

const CampaignCard = ({ campaign, variant = "default" }: CampaignCardProps) => {
  const progress = (campaign.raised / campaign.goal) * 100;

  const handleDonate = () => {
    toast.success(`Donation initiated for "${campaign.title}"! (Demo mode)`);
  };

  const getUrgencyBadge = () => {
    switch (campaign.urgency) {
      case "critical":
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
            <AlertTriangle className="w-3 h-3" />
            Urgent
          </span>
        );
      case "high":
        return (
          <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
            Ending Soon
          </span>
        );
      default:
        return null;
    }
  };

  if (variant === "compact") {
    return (
      <div className="bg-card border border-border rounded-xl p-4 hover:shadow-soft transition-all">
        <div className="flex items-start gap-3">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm text-foreground truncate">
                {campaign.title}
              </h4>
              {campaign.aiSuggested && (
                <Sparkles className="w-3 h-3 text-primary shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{campaign.ngoName}</p>
            <div className="mt-2">
              <Progress value={progress} className="h-1.5" />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Rs{(campaign.raised / 1000).toFixed(0)}K raised</span>
                <span>{campaign.daysLeft} days left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-glow-primary/10 transition-all">
      <div className="relative">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground">
            {campaign.category}
          </span>
          {getUrgencyBadge()}
        </div>
        {campaign.aiSuggested && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            AI Pick
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">{campaign.ngoName}</span>
          {campaign.ngoVerified && (
            <Verified className="w-4 h-4 text-primary" />
          )}
        </div>
        
        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
          {campaign.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {campaign.description}
        </p>
        
        <div className="space-y-3">
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <div>
              <span className="font-semibold text-foreground">
                Rs{(campaign.raised / 1000).toFixed(0)}K
              </span>
              <span className="text-muted-foreground"> raised of Rs{(campaign.goal / 1000).toFixed(0)}K</span>
            </div>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {campaign.donorsCount} donors
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {campaign.daysLeft} days left
            </span>
          </div>
        </div>
        
        <Button className="w-full mt-4" onClick={handleDonate}>
          Donate to Campaign
        </Button>
      </div>
    </div>
  );
};

export default CampaignCard;
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Target, Sparkles, Loader2, CheckCircle } from "lucide-react";
import { causeCategories } from "@/app/dummydata";
import toast from "react-hot-toast";

interface CreateCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCampaignCreated: (campaign: any) => void;
}

const CreateCampaignModal = ({ open, onOpenChange, onCampaignCreated }: CreateCampaignModalProps) => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goal: "",
    category: "",
    duration: "",
    beneficiaries: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const analyzeWithAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiSuggestions([
        `💡 Based on your category "${formData.category}", similar successful campaigns raised an average of Rs${(parseInt(formData.goal) * 1.2).toLocaleString()}. Consider increasing your goal.`,
        "📈 Adding impact photos increases donor engagement by 45%",
        "⏰ Campaigns with 30-45 day durations have the highest completion rates",
        `🎯 ${formData.category} campaigns perform 30% better when targeting specific beneficiary groups`,
      ]);
      setIsAnalyzing(false);
      setStep(2);
    }, 2000);
  };

  const handleSubmit = () => {
    const newCampaign = {
      id: Date.now(),
      name: formData.name,
      goal: parseInt(formData.goal),
      raised: 0,
      donors: 0,
      category: formData.category,
      description: formData.description,
      duration: formData.duration,
      beneficiaries: parseInt(formData.beneficiaries),
      createdAt: new Date().toISOString(),
    };
    onCampaignCreated(newCampaign);
    toast.success("Campaign created successfully!");
    onOpenChange(false);
    setStep(1);
    setFormData({
      name: "",
      description: "",
      goal: "",
      category: "",
      duration: "",
      beneficiaries: "",
    });
    setAiSuggestions([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-secondary" />
            Create New Campaign
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Campaign Name</Label>
              <Input
                placeholder="e.g., School Supplies Drive 2024"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your campaign goals and impact..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fundraising Goal (Rs)</Label>
                <Input
                  type="number"
                  placeholder="100000"
                  value={formData.goal}
                  onChange={(e) => handleInputChange("goal", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => handleInputChange("category", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {causeCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (days)</Label>
                <Input
                  type="number"
                  placeholder="30"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Target Beneficiaries</Label>
                <Input
                  type="number"
                  placeholder="500"
                  value={formData.beneficiaries}
                  onChange={(e) => handleInputChange("beneficiaries", e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full"
              variant="secondary"
              onClick={analyzeWithAI}
              disabled={!formData.name || !formData.goal || !formData.category || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  AI Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze with AI
                </>
              )}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="bg-linear-to-r from-secondary/10 via-primary/10 to-accent/10 rounded-xl p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                AI Suggestions
              </h4>
              <ul className="space-y-2">
                {aiSuggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-semibold text-foreground mb-3">Campaign Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium text-foreground">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Goal:</span>
                  <span className="font-medium text-foreground">Rs{parseInt(formData.goal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium text-foreground">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium text-foreground">{formData.duration} days</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="secondary" className="flex-1" onClick={handleSubmit}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Launch Campaign
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;
'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Heart, ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import Link from "next/link";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { causeCategories } from "@/data/dummyData";

const steps = ["Personal Info", "Select Causes", "Preferences"];

export default function RegisterDonor () {
  const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     causes: [] as string[],
//     monthlyBudget: "",
//     notifications: true,
//   });
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

//   const toggleCause = (cause: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       causes: prev.causes.includes(cause)
//         ? prev.causes.filter((c) => c !== cause)
//         : [...prev.causes, cause],
//     }));
//   };

//   const handleNext = () => {
//     if (currentStep === 0 && (!formData.name || !formData.email)) {
//       toast.error("Please fill in required fields");
//       return;
//     }
//     if (currentStep === 1 && formData.causes.length === 0) {
//       toast.error("Please select at least one cause");
//       return;
//     }
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       handleSubmit();
//     }
//   };

  const handleSubmit = () => {
    // setAiAnalyzing(true);
    
    // // Simulate AI analysis
    // setTimeout(() => {
    //   setAiAnalyzing(false);
    //   localStorage.setItem("giveai_user", JSON.stringify({
    //     ...formData,
    //     type: "donor",
    //   }));
    //   toast.success("Welcome to GiveAI! Your donor profile is ready.");
    //   navigate("/donor-dashboard");
    // }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-7 h-7 text-primary fill-primary/20" />
            <span className="font-display font-bold text-lg">GiveAI</span>
          </Link>
          <Link href='/'>
            <Button className="cursor-pointer" variant="ghost" >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold transition-all ${
                      index <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-24 md:w-32 h-1 mx-2 rounded ${
                        index < currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {steps[currentStep]}
              </h2>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Let's Get Started!
                  </h3>
                  <p className="text-muted-foreground">
                    Tell us a bit about yourself so we can personalize your giving experience.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                    //   value={formData.name}
                    //   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                    //   value={formData.email}
                    //   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                    //   value={formData.phone}
                    //   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    What Causes Matter to You?
                  </h3>
                  <p className="text-muted-foreground">
                    Select the causes you're passionate about. Our AI will match you with relevant NGOs.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {/* {causeCategories.map((cause) => (
                    <button
                      key={cause}
                      onClick={() => toggleCause(cause)}
                      className={`p-4 rounded-xl border-2 cursor-pointer text-sm font-medium transition-all ${
                        formData.causes.includes(cause)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-foreground hover:border-primary/50"
                      }`}
                    >
                      {cause}
                    </button>
                  ))} */}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Set Your Preferences
                  </h3>
                  <p className="text-muted-foreground">
                    Help us understand your giving capacity for better recommendations.
                  </p>
                </div>

                <div>
                  <Label>Monthly Giving Budget (Optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {["₹500", "₹1000", "₹2500", "₹5000+"].map((amount) => (
                      <button
                        key={amount}
                        // onClick={() => setFormData({ ...formData, monthlyBudget: amount })}
                        // className={`p-3 rounded-xl cursor-pointer border-2 text-sm font-medium transition-all ${
                        //   formData.monthlyBudget === amount
                        //     ? "border-secondary bg-secondary/10 text-secondary"
                        //     : "border-border bg-card text-foreground hover:border-secondary/50"
                        // }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        AI Will Create Your Profile
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Based on your preferences, our AI will create a unique "Donor DNA" profile
                        and match you with verified NGOs that align with your values.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 0 ? (
                <Button className="cursor-pointer" variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              <Button 
                className="cursor-pointer"
                variant="hero" 
                // onClick={handleNext}
                disabled={aiAnalyzing}
              >
                {aiAnalyzing ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    AI Analyzing...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    Complete Setup
                    <Check className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
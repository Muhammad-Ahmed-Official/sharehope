'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Heart, ArrowRight, ArrowLeft, Check, Building2, Upload, ShieldCheck } from "lucide-react";
import Link from "next/link";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { causeCategories } from "@/data/dummyData";

const steps = ["Organization Info", "Verification", "Bank Details"];

export default function RegisterNGO() {
  const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     orgName: "",
//     email: "",
//     phone: "",
//     category: "",
//     location: "",
//     description: "",
//     registrationNumber: "",
//     panNumber: "",
//     bankName: "",
//     accountNumber: "",
//     ifscCode: "",
//   });
  const [verifying, setVerifying] = useState(false);

  const handleNext = () => {
    // if (currentStep === 0 && (!formData.orgName || !formData.email || !formData.category)) {
    //   toast.error("Please fill in required fields");
    //   return;
    // }
    // if (currentStep === 1 && (!formData.registrationNumber || !formData.panNumber)) {
    //   toast.error("Please provide verification documents");
    //   return;
    // }
    // if (currentStep < steps.length - 1) {
    //   setCurrentStep(currentStep + 1);
    // } else {
    //   handleSubmit();
    // }
  };

  const handleSubmit = () => {
    setVerifying(true);
    
    // setTimeout(() => {
    //   setVerifying(false);
    //   localStorage.setItem("giveai_user", JSON.stringify({
    //     ...formData,
    //     type: "ngo",
    //     name: formData.orgName,
    //   }));
    //   toast.success("Registration submitted! Your NGO is under verification.");
    //   navigate("/ngo-dashboard");
    // }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Heart className="w-7 h-7 text-primary fill-primary/20" />
            <span className="font-display font-bold text-lg">GiveAI</span>
          </a>
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
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-20 md:w-28 h-1 mx-2 rounded ${
                        index < currentStep ? "bg-secondary" : "bg-muted"
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
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Register Your NGO
                  </h3>
                  <p className="text-muted-foreground">
                    Join our network of 500+ verified NGOs and connect with conscious donors.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      placeholder="Your NGO name"
                    //   value={formData.orgName}
                    //   onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Official Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@ngo.org"
                    //   value={formData.email}
                    //   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                    //   value={formData.phone}
                    //   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Category *</Label>
                    <select
                      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                    //   value={formData.category}
                    //   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">Select category</option>
                      {/* {causeCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))} */}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                    //   value={formData.location}
                    //   onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your organization's mission..."
                      rows={3}
                    //   value={formData.description}
                    //   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Verification Documents
                  </h3>
                  <p className="text-muted-foreground">
                    Provide your registration details for verification. Our AI verifies NGOs within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="regNumber">NGO Registration Number *</Label>
                    <Input
                      id="regNumber"
                      placeholder="e.g., MH/2020/0012345"
                    //   value={formData.registrationNumber}
                    //   onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan">PAN Number *</Label>
                    <Input
                      id="pan"
                      placeholder="e.g., AAAAA0000A"
                    //   value={formData.panNumber}
                    //   onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Upload 80G Certificate (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">AI Verification:</strong> Our system cross-verifies 
                    your documents with government databases for faster approval.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Bank Account Details
                  </h3>
                  <p className="text-muted-foreground">
                    Donations will be transferred directly to this account.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      placeholder="e.g., State Bank of India"
                    //   value={formData.bankName}
                    //   onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Your bank account number"
                    //   value={formData.accountNumber}
                    //   onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifsc">IFSC Code</Label>
                    <Input
                      id="ifsc"
                      placeholder="e.g., SBIN0001234"
                    //   value={formData.ifscCode}
                    //   onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Secure & Encrypted:</strong> Your banking details 
                    are encrypted and never shared with donors.
                  </p>
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
                variant="secondary" 
                size="lg"
                onClick={handleNext}
                disabled={verifying}
              >
                {verifying ? (
                  <>
                    <ShieldCheck className="w-5 h-5 animate-pulse" />
                    Verifying...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    Submit for Verification
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
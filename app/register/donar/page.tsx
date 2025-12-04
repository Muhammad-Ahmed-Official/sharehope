'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Heart, ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { donarSchmea } from "@/schema/donarSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const steps = ["Personal Info", "Select Causes", "Preferences"];
const causeCategories = ["Education", "Healthcare", "Environment", "Child Welfare", "Animal Welfare", "Women Empowerment", "Disaster Relief", "Elderly Care"];
const donation = [500, 1000, 2500, 5000]

export default function RegisterDonor () {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, trigger, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<z.infer<typeof donarSchmea>>({
    resolver: zodResolver(donarSchmea),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      causes: [],
      donation: 1
    }
  })

  type DonarFields = keyof z.infer<typeof donarSchmea>

  const stepFields:DonarFields[][] = [
    ["fullName", "email", "phone"],
    ["causes"],
    ["donation"]
  ]

  const selectedCauses = watch("causes");
  const selectedDonation = watch("donation");

  const toggleCause = (cause:string) => {
    if(selectedCauses.includes(cause)){
      setValue("causes", selectedCauses.filter(c => c !== cause), { shouldValidate : true })
    } else {
      setValue("causes", [...selectedCauses, cause], { shouldValidate: true })
    }
  };

  const selectDonation = (amount:number) => {
    setValue("donation", amount, { shouldValidate: true })
  };

  const nextStep = async () => {
    const valid = await trigger(stepFields[currentStep]);
    if(!valid) return;

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1)

  const onSubmit = async (data: z.infer<typeof donarSchmea>) => {
    console.log(data)
    reset()
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

          <form onSubmit={handleSubmit(onSubmit)}>   
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
                    <Input placeholder="Your full name" type="fullName" {...register("fullName")} />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input type="email" placeholder="you@example.com" {...register("email")} />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input placeholder="03001234567" {...register("phone")} />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone.message}</p>
                    )}
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
                  {causeCategories.map((cause) => (
                    <Button
                      key={cause}
                      onClick={() => toggleCause(cause)}
                      className={`p-7 rounded-xl border-2 cursor-pointer text-sm font-medium transition-all ${
                        selectedCauses.includes(cause)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-foreground hover:border-primary/50"
                      }`}
                    >
                      {cause}
                    </Button>
                  ))}
                </div>
                {errors.causes && (
                  <p className="text-red-500 text-center font-semibold text-sm">{errors.causes.message}</p>
                )}
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

                {currentStep === 2 && (
                <div className="space-y-6">
                  <Label>Monthly Giving Budget (Optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {donation.map(amount => (
                      <Button
                        key={amount}
                        type="button"
                        onClick={() => selectDonation(amount)}
                        className={`p-3 rounded-xl cursor-pointer border-2 text-sm font-medium transition-all ${
                          selectedDonation === amount
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-foreground hover:border-primary/50"
                        }`}
                      >
                        Rs{amount}
                      </Button>
                    ))}
                  </div>
                  {errors.donation && (
                    <p className="text-red-500 text-center font-semibold text-sm">{errors.donation.message}</p>
                  )}
                </div>
              )}

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
                  <Button type="button" variant="ghost" onClick={prevStep}>
                    <ArrowLeft className="mr-2" /> Back
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep === steps.length - 1 ? (
                  <Button variant="hero" size="lg"  type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <span className="flex items-center"> <Sparkles className="w-5 h-5 animate-spin" /> Verifying... </span> :  <span className="flex items-center gap-1">Submit <Check className="w-5 h-5 font-bold" /> </span>}
                  </Button>
                ) : (
                  <Button  variant="hero" size="lg" type="button" onClick={nextStep}>
                    Continue <ArrowRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
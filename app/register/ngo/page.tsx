'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Heart, ArrowRight, ArrowLeft, Check, Building2, Upload, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ngoSchema } from "@/schema/ngoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { asyncHandlerFront } from "@/utils/FrontAsyncHadler";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const steps = ["Organization Info", "Verification", "Bank Details"];
const categories = ["Education", "Health", "Environment", "Women Empowerment", "Poverty Alleviation"];

export default function RegisterNGO() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof ngoSchema>>({
    resolver: zodResolver(ngoSchema),
    defaultValues: {
      ngoName: "",
      email: "",
      phone: "",
      // category: "",
      location: "",
      description: "",
      registrationNumber: "",
      bankName: "",
      accountNumber: "",
      iban: "",
    }
  });

  type NgoFields = keyof z.infer<typeof ngoSchema>;

  const stepFields:NgoFields[][] = [
    ["ngoName", "email", "phone", "location", "description"],
    ["registrationNumber"],
    ["bankName", "accountNumber", "iban"],
  ];

  const nextStep = async () => {
    const valid = await trigger(stepFields[currentStep]); // validate only step fields
    if (!valid) return;

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = async (data: z.infer<typeof ngoSchema>) => {
    console.log(data);
    await asyncHandlerFront(
      async() => {
        const response:any = await apiClient.ngoRegister(data);
        console.log(response.data)
        toast.success("Form submitted!")
        if(response.data){
          router.push("/");
        }
      },
      (error:any) => {
        toast.error("Something went wrong", error);
      }
    )
    reset();
  };

  return (
    <div className="min-h-screen bg-background">

      {/* MAIN */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">

          {/* PROGRESS STEPS */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      index <= currentStep
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? <Check /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-20 h-1 mx-2 rounded ${
                        index < currentStep ? "bg-secondary" : "bg-muted"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <h2 className="text-center font-display text-xl font-semibold">
              {steps[currentStep]}
            </h2>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-card border rounded-2xl p-8 shadow-soft">
               {currentStep === 0 && <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Register Your NGO
                  </h3>
                  <p className="text-muted-foreground">
                    Join our network of 500+ verified NGOs and connect with conscious donors.
                  </p>
                </div>}

              {/* STEP 0 */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    
                    <div>
                      <Label>Organization Name *</Label>
                      <Input {...register("ngoName")} placeholder="NGO name" />
                      {errors.ngoName && (
                        <p className="text-red-500 text-sm">{errors.ngoName.message}</p>
                      )}
                    </div>

                    <div>
                      <Label>Email *</Label>
                      <Input {...register("email")} placeholder="contact@ngo.org" />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label>Phone *</Label>
                      <Input {...register("phone")} placeholder="03001234567" />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* <div>
                      <Label>Category *</Label>
                      <select
                        {...register("category")}
                        className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category.message}</p>
                      )}
                    </div> */}
                    <div>
                      <Label>Location *</Label>
                      <Input {...register("location")} placeholder="City, Area" />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Description *</Label>
                      <Textarea {...register("description")} rows={3} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1 */}
              {/* STEP 1: Verification Documents */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-4">
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
                      <Label>NGO Registration Number *</Label>
                      <Input {...register("registrationNumber")} placeholder="e.g., MH/2020/0012345" />
                      {errors.registrationNumber && (
                        <p className="text-red-500 text-sm">{errors.registrationNumber.message}</p>
                      )}
                    </div>

                    {/* <div>
                      <Label>PAN / CNIC Number *</Label>
                      <Input {...register("cnic")} placeholder="e.g., 4210123456789" />
                      {errors.cnic && (
                        <p className="text-red-500 text-sm">{errors.cnic.message}</p>
                      )}
                    </div> */}

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

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Label>Bank Name *</Label>
                  <Input {...register("bankName")} placeholder="abc bank" />

                  <Label>Account Number *</Label>
                  <Input {...register("accountNumber")} placeholder="42201 4834 3922039" />

                  <Label>IBAN *</Label>
                  <Input {...register("iban")} placeholder="PK36SCBL0000001123456702" />
                </div>
              )}

              {/* NAVIGATION */}
              <div className="flex justify-between mt-8">
                {currentStep > 0 ? (
                  <Button type="button" variant="ghost" onClick={prevStep}>
                    <ArrowLeft className="mr-2" /> Back
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep === steps.length - 1 ? (
                  <Button variant="secondary" size="lg"  type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <span className="flex items-center"> <ShieldCheck className="w-5 h-5 animate-pulse" /> Verifying... </span> :  <span className="flex items-center gap-1">Submit for Verification <Check className="w-5 h-5 font-bold" /> </span>}
                  </Button>
                ) : (
                  <Button  variant="secondary" size="lg" type="button" onClick={nextStep}>
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
}
'use client'

import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Heart, Mail, Lock, ArrowRight, Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { asyncHandlerFront } from "@/utils/FrontAsyncHadler";
import toast from "react-hot-toast";
import { signInSchema } from "@/schema/signInSchema";
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const params = useSearchParams();
  
  const [showPassword, setShowPassword] = useState(false);
  const { register, reset, handleSubmit, formState: { isSubmitting, errors} } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: '',
    }
  });


  const onSubmit = async(data: z.infer<typeof signInSchema>) => {
    await asyncHandlerFront(
        async() => {
        const result = await signIn('credentials', {
          redirect: false,
          identifier: data.email,
          password: data.password
        })
        if(result?.error) return toast.error(result.error);
        if(result?.url) router.push(`/dashboard/ngo?ngoId=${params.get("ngoId")}`);
        },
        (error:any) => {
          toast.error("Failed to login", error)
        }
    )
    reset()
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-primary/80" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <Heart className="w-10 h-10 fill-primary-foreground/30" />
            <span className="font-display font-bold text-2xl">Share-Hope</span>
          </Link>
          
          <h1 className="font-display text-4xl font-bold mb-4">Welcome Back, NGO Partner!</h1>
          <p className="text-primary-foreground/80 text-lg mb-8">Sign in to access your NGO dashboard and manage donations, beneficiaries, and reports.</p>

          <div className="space-y-4">
            {[
              "AI-matched donations for maximum impact",
              "100% transparent tracking",
              "Instant tax receipts (80G)",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                <span className="text-primary-foreground/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <Heart className="w-8 h-8 text-primary fill-primary/20" />
            <span className="font-display font-bold text-xl">GiveAI</span>
          </Link>


          <form onSubmit={handleSubmit(onSubmit)}  className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email py-2">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              { errors.email && ( <p className="text-sm text-red-500">{errors.email.message}</p> ) }
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative py-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  className="pl-10 pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              { errors.password && ( <p className="text-sm text-red-500">{errors.password.message}</p> ) }
            </div>

            <div className="text-right">
              <Link href='/forgot-pass'> <p className="text-sm text-primary hover:underline">  Forgot password?</p> </Link>
            </div>

            <Button type="submit" disabled={isSubmitting} variant="hero" className="w-full group cursor-pointer">
              {!isSubmitting ? "Sign In" : "Verifying...."}
              {!isSubmitting ? <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> : <Loader className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don’t have an account? </span>
            <Link href="/SignUp" className="text-primary font-medium hover:underline">
              Register
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
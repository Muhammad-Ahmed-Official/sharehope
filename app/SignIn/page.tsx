'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Heart, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/Label";
import { useState } from "react";

export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!formData.email || !formData.password) {
  //     toast.error("Please fill in all fields");
  //     return;
  //   }

  //   if (!isLogin && !formData.name) {
  //     toast.error("Please enter your name");
  //     return;
  //   }

  //   // Simulate auth - in production this would use Supabase
  //   localStorage.setItem("giveai_user", JSON.stringify({
  //     name: formData.name || "Demo User",
  //     email: formData.email,
  //     type: "donor",
  //   }));

  //   toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
  //   navigate("/donor-dashboard");
  // };

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
            <span className="font-display font-bold text-2xl">GiveAI</span>
          </Link>
          
          <h1 className="font-display text-4xl font-bold mb-4">
            {isLogin ? "Welcome Back!" : "Join the Movement"}
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8">
            {isLogin 
              ? "Continue your journey of making a difference with AI-powered giving."
              : "Start making a difference today with intelligent, transparent donations."
            }
          </p>

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

          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:underline cursor-pointer"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          <form  className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10"
                    // value={formData.name}
                    // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  // value={formData.email}
                  // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  // value={formData.password}
                  // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <Link href='/forgot-pass'> <p className="text-sm text-primary hover:underline">  Forgot password?</p> </Link>
              </div>
            )}

            <Button type="submit" variant="hero" className="w-full group cursor-pointer">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            By continuing, you agree to our
            <a href="#" className="text-primary hover:underline">Terms</a>
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};
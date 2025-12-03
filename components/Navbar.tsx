'use client'

import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { slug: "#how-it-works", label: "How It Works" },
  { slug: "#donors", label: "For Donors" },
  { slug: "#ngos", label: "For NGOs" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart className="w-8 h-8 text-primary fill-primary/20 group-hover:fill-primary/40 transition-all duration-300" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Give<span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((item, index) => (
                    <a key={index} href={item.slug} className="text-muted-foreground hover:text-foreground transition-colors font-medium" >
                    {item.label}
                    </a>
                ))}
            </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button className="cursor-pointer" variant="ghost" onClick={() => router.push("/SignIn")}>Sign In</Button>
            <Button className="cursor-pointer" variant="default" onClick={() => router.push("/dashboard/donar")}>Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <nav className="flex flex-col gap-4">
                {navLinks.map((item, index) => (
                    <Link key={index} href={item.slug} className="text-muted-foreground hover:text-foreground transition-colors font-medium" >
                    {item.label}
                    </Link>
                ))}
              <div className="flex flex-col gap-3 pt-4">
                <Button  variant="outline" className="w-full cursor-pointer" onClick={() => router.push("/auth")}>Sign In</Button>
                <Button variant="default" className="w-full cursor-pointer" onClick={() => router.push("/become-donor")}>Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
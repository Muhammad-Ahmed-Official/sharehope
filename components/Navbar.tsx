'use client'

import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import logo from '../public/logo.png'
import Image from "next/image";

const navLinks = [
  { slug: "#how-it-works", label: "How It Works" },
  { slug: "#donors", label: "For Donors" },
  { slug: "#ngos", label: "For NGOs" },
  { slug: "#impact", label: "Impact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky w-full top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}  
          <Link href="/" className="flex items-center gap-2 group">
            <Image src={logo} alt="logo" height={95} width={95} />
          </Link>

          {/* Desktop Navigation */}
            {(!session?.user.userName && pathName === "/") && <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((item, index) => (
                    <a key={index} href={item.slug} className="text-muted-foreground hover:text-foreground transition-colors font-medium" >
                    {item.label}
                    </a>
                ))}
              </nav>
            }

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!session?.user && pathName === "/" && 
              (
                <>
                <Button 
                  className="cursor-pointer px-4"
                  variant="default"
                  onClick={() => router.push("/SignIn")}>
                  Sign In
                </Button>
                </>
              )  
            }
            {pathName !== "/" && pathName !== "/dashboard/ngo" && 
                (<Button type="button" variant="ghost" onClick={() => router.push("/")}>
                  <ArrowLeft className="mr-2" /> Back
                </Button>)
            }

          {
            session?.user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {session?.user.userName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground hidden md:block">
                    {session.user.userName}
                  </span>
                </div>
                
                <Button 
                  className="cursor-pointer hover:bg-accent"
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  LogOut
                </Button>
              </div>
            )
          }

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
                {
            (!session?.user && pathName === "/") ? (
              <Button 
                className="cursor-pointer px-4"
                variant="default"
                onClick={() => router.push("/SignIn")}
              >
                Sign In
              </Button>
            ) : null
          }

          {
            session?.user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {session?.user.userName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground hidden md:block">
                    {session.user.userName}
                  </span>
                </div>
                
                <Button 
                  className="cursor-pointer hover:bg-accent"
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  LogOut
                </Button>
              </div>
            )
          }
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
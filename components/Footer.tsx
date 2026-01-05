import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import logo from '../public/logo.png'

export default function Footer(){
  return (
    <footer className="bg-foreground text-background pt-8 pb-2">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <Image src={logo} alt="logo" height={95} width={95} />
            </a>
            <p className="text-background/70 text-sm mb-6">
              Pakistan's first AI-powered donation platform connecting donors with verified NGOs for maximum social impact.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "How It Works", "Browse NGOs", "Success Stories", "Blog"].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For You */}
          <div>
            <h4 className="font-display font-semibold mb-4">For You</h4>
            <ul className="space-y-3">
              {["Become a Donor", "Register as NGO", "Corporate Giving", "Start a Campaign", "Tax Benefits"].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                hello@sharehope.in
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +92 98765 43210
              </li>
              <li className="flex items-start gap-3 text-background/70 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                123, Tech Park, Karachi, Pkaistan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © 2024 GiveAI. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
              <a key={index} href="#" className="text-background/50 hover:text-primary transition-colors text-sm">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#07090e] border-t border-white/10 text-[#EFE8E0] font-sans pt-16 sm:pt-20 pb-0 select-none">
      {/* Ambient Theme Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EAA838]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-10 w-96 h-96 bg-[#F4C463]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Identity & Contact Column (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo/logo.png"
                  alt="ASHREN"
                  width={140}
                  height={42}
                  className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(234,168,56,0.4)]"
                />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#EAA838] font-bold border-l border-white/20 pl-2.5">
                  Haute Marketplace
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm font-normal">
              India&apos;s premier luxury creator &amp; haute couture marketplace. Blending state-of-the-art 4K gimbal optics, zero-lag aerial cinematography, and royal handcrafted Indian silhouettes.
            </p>

            {/* Direct Contact Links */}
            <div className="space-y-3 text-xs font-mono text-white/80 pt-1">
              <a
                href="tel:+917304056607"
                className="flex items-center gap-2.5 hover:text-[#EAA838] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#EAA838] shrink-0 group-hover:scale-110 transition-transform" />
                <span>+91 730-405-6607</span>
              </a>
              <a
                href="mailto:concierge@ashren.luxury"
                className="flex items-center gap-2.5 hover:text-[#EAA838] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#EAA838] shrink-0 group-hover:scale-110 transition-transform" />
                <span>concierge@ashren.luxury</span>
              </a>
              <div className="flex items-center gap-2.5 text-white/60">
                <MapPin className="w-4 h-4 text-[#EAA838]/80 shrink-0" />
                <span>Mumbai • New Delhi • Bengaluru</span>
              </div>
            </div>

            {/* Trust Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#EAA838]/30 text-[10px] text-[#F4C463] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EAA838]" />
              <span>Verified Haute Luxury System</span>
            </div>
          </div>

          {/* Navigation Column 1: Marketplace */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#F4C463] mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#EAA838]" />
              <span>Ecosystem</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <Link href="/" className="hover:text-[#EAA838] transition-colors">
                  Flagship Home
                </Link>
              </li>
              <li>
                <Link href="/dresses" className="hover:text-[#EAA838] transition-colors">
                  Haute Couture Dresses
                </Link>
              </li>
              <li>
                <Link href="/gadgets" className="hover:text-[#EAA838] transition-colors">
                  Creator Tech &amp; Drones
                </Link>
              </li>
              <li>
                <Link href="/#flagship-products" className="hover:text-[#EAA838] transition-colors">
                  Ashren 4K Gimbal Cam
                </Link>
              </li>
              <li>
                <Link href="/#flagship-products" className="hover:text-[#EAA838] transition-colors">
                  T1 Falcon 4K FPV Drone
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#EAA838] transition-colors">
                  Curated Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Royal Dresses */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#F4C463] mb-4">
              Royal Silhouettes
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <Link href="/dresses" className="hover:text-[#EAA838] transition-colors">
                  Anarkali &amp; Gowns
                </Link>
              </li>
              <li>
                <Link href="/dresses" className="hover:text-[#EAA838] transition-colors">
                  Festive Raw Silk Sets
                </Link>
              </li>
              <li>
                <Link href="/dresses" className="hover:text-[#EAA838] transition-colors">
                  Hand-Embroidered Suits
                </Link>
              </li>
              <li>
                <Link href="/dresses" className="hover:text-[#EAA838] transition-colors">
                  Bridal &amp; Luxury Velvet
                </Link>
              </li>
              <li>
                <Link href="/dresses" className="hover:text-[#EAA838] transition-colors">
                  Chikankari &amp; Organza
                </Link>
              </li>
              <li>
                <Link href="/dresses" className="hover:text-[#EAA838] transition-colors text-[#F4C463]">
                  ✦ Virtual 3D Try-On
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Trust & Legal */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#F4C463] mb-4">
              Client Care &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <a href="#flagship-products" className="hover:text-[#EAA838] transition-colors">
                  100% Encrypted Checkout
                </a>
              </li>
              <li>
                <a href="#flagship-products" className="hover:text-[#EAA838] transition-colors">
                  Free Express Shipping
                </a>
              </li>
              <li>
                <a href="#flagship-products" className="hover:text-[#EAA838] transition-colors">
                  7-Day Easy Returns
                </a>
              </li>
              <li>
                <a href="#flagship-products" className="hover:text-[#EAA838] transition-colors">
                  1-Year Replacement Warranty
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EAA838] transition-colors">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EAA838] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching tzarv2 */}
        <div className="pt-10 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/50 gap-4">
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#EAA838] transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-[#EAA838] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#EAA838] transition-colors hidden xs:inline">
              Shipping &amp; Warranty
            </a>
          </div>
          <p className="tracking-wide">
            &copy; 2026 Ashren Technologies Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Giant Full-Width Watermark typography matching TZAR in tzarv2.vercel.app */}
      <div className="w-full overflow-hidden select-none pointer-events-none flex justify-center items-end -mt-4 sm:-mt-8 -mb-2 sm:-mb-6">
        <span className="font-sans font-black uppercase tracking-tighter leading-[0.75] text-center text-[25vw] sm:text-[27vw] bg-gradient-to-b from-[#EAA838]/25 via-white/[0.06] to-transparent bg-clip-text text-transparent block">
          ASHREN
        </span>
      </div>
    </footer>
  );
}

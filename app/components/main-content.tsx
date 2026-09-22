"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Play,
  Sparkles,
  Zap,
  RotateCw,
  Layers,
  Award,
  Star,
  Camera,
  Tv,
  Droplets,
  Radio,
} from "lucide-react";
import { PRODUCTS, Product } from "./data";
import Footer from "./footer";
import { buildProductWhatsAppUrl, openWhatsApp } from "../lib/whatsapp";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.26 15.11 13.67 14.88 13.58C14.66 13.5 14.5 13.46 14.33 13.71C14.17 13.96 13.71 14.5 13.57 14.66C13.43 14.83 13.29 14.85 13.04 14.72C12.79 14.6 11.99 14.34 11.04 13.49C10.3 12.83 9.8 12.02 9.66 11.77C9.52 11.52 9.64 11.39 9.77 11.26C9.88 11.15 10.02 10.97 10.14 10.83C10.27 10.69 10.31 10.58 10.39 10.42C10.47 10.25 10.43 10.11 10.37 9.98C10.31 9.86 9.81 8.64 9.61 8.13C9.4 7.64 9.2 7.7 9.05 7.69L8.57 7.68C8.41 7.68 8.14 7.74 7.91 7.99C7.69 8.24 7.05 8.84 7.05 10.06C7.05 11.28 7.94 12.45 8.06 12.62C8.19 12.78 9.81 15.28 12.28 16.35C12.87 16.6 13.33 16.76 13.69 16.87C14.28 17.06 14.82 17.03 15.25 16.97C15.73 16.9 16.72 16.37 16.93 15.79C17.13 15.2 17.13 14.7 17.07 14.6C17.01 14.49 16.82 14.42 16.57 14.39Z" />
    </svg>
  );
}

interface MainContentProps {
  onShopNow: (product: Product) => void;
  onOpenVideo: (title?: string, category?: string) => void;
}

export default function MainContent({
  onShopNow,
  onOpenVideo,
}: MainContentProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <>
      <div className="relative w-full z-10 space-y-24 sm:space-y-32 py-16 px-4 sm:px-8 lg:px-16 max-w-[1540px] mx-auto font-sans">
        {/* 1. Flagship Trio Section */}
      <section id="flagship-products" className="relative scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-xs font-semibold uppercase tracking-[0.25em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(234,168,56,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>The Flagship Trio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineered For Every <br />
            <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.45)]">
              Dimension of Storytelling
            </span>
          </h2>
          <p className="text-xs sm:text-base text-gray-300/90 mt-3 sm:mt-4 leading-relaxed max-w-xl mx-auto">
            Explore our precision-crafted ecosystem designed for creators, adventurers, and filmmakers.
          </p>
        </motion.div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 bg-gradient-to-b from-[#141824]/90 via-[#0d1017]/95 to-[#080a0f]/98 hover:from-[#191e2e]/95 hover:via-[#10141f]/98 hover:to-[#0a0d14]/100 border border-white/15 hover:border-[#EAA838]/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_55px_rgba(234,168,56,0.28)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Card Accent Glows */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 sm:w-52 h-40 sm:h-52 bg-[#EAA838]/15 group-hover:bg-[#EAA838]/25 blur-[70px] sm:blur-[90px] rounded-full transition-all duration-700 pointer-events-none -z-10" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/[0.06] border border-[#EAA838]/30 backdrop-blur-md shadow-sm truncate max-w-[60%] sm:max-w-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAA838] animate-pulse shrink-0" />
                    <span className="text-[8.5px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-[#F4C463] truncate">
                      {prod.category}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 shrink-0">
                    <span className="text-[9px] sm:text-[11px] text-gray-400 font-medium line-through opacity-70 hidden xs:inline">
                      ₹{(1.25 * prod.price).toFixed(0)}
                    </span>
                    <span className="text-xs sm:text-lg lg:text-xl font-extrabold text-[#F4C463] tracking-tight drop-shadow-sm">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <h3 className="text-xs sm:text-lg lg:text-xl font-extrabold text-white tracking-tight group-hover:text-[#FFF1C5] transition-colors leading-snug line-clamp-1">
                  {prod.name}
                </h3>
                <p className="text-[9.5px] sm:text-xs text-gray-300/80 font-normal mt-0.5 line-clamp-1">
                  {prod.variant}
                </p>

                {/* Center Image with 3D Float */}
                <div className="relative w-full aspect-square max-h-[170px] sm:max-h-[260px] my-2 sm:my-4 flex items-center justify-center">
                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_25px_45px_rgba(234,168,56,0.35)]"
                    />
                  </div>
                </div>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {[prod.badge1, prod.badge2, prod.badge3, prod.badge4].map((b, i) => (
                    <div
                      key={i}
                      className="p-1.5 sm:p-2 rounded-lg bg-white/[0.04] border border-white/10 flex items-center gap-1.5"
                    >
                      <div className="flex flex-col leading-none">
                        <span className="text-[9.5px] sm:text-xs font-extrabold text-white">
                          {b.value}
                        </span>
                        <span className="text-[7.5px] sm:text-[9px] text-gray-400 font-medium uppercase tracking-wider">
                          {b.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-white/10">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const url = buildProductWhatsAppUrl({
                        title: prod.name,
                        price: prod.price,
                        category: prod.category,
                        quantity: 1,
                      });
                      openWhatsApp(url);
                    }}
                    className="w-full py-2 sm:py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_4px_15px_rgba(37,211,102,0.35)] flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-black" />
                    <span>Buy Now</span>
                  </button>
                  <button
                    onClick={() => onShopNow(prod)}
                    className="w-full py-2 sm:py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(234,168,56,0.35)] flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-black" />
                    <span>Add to Bag</span>
                  </button>
                </div>
                <button
                  onClick={() => onOpenVideo(`${prod.name} 4K Master Showcase`, prod.category)}
                  className="w-full py-1.5 sm:py-2 rounded-xl bg-white/[0.05] hover:bg-white/15 text-gray-200 hover:text-white border border-white/10 text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Play className="w-3 h-3 text-[#EAA838]" />
                  <span>Watch 4K Demo</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Next-Gen Architecture & Specs Section */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-xs font-semibold uppercase tracking-[0.25em] mb-4 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>Next-Gen Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Cinematic Power. <br />
            <span className="font-serif-luxury italic font-normal text-gold-shimmer">
              Engineered Beyond Limits.
            </span>
          </h2>
        </motion.div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {[
            { metric: "0.002s", label: "Zero-Lag Transmission", desc: "Ultra-low latency wireless video streaming" },
            { metric: "120 Mbps", label: "Ultra-High Bitrate", desc: "Lossless ProRes & 10-bit D-Log colour grading" },
            { metric: "1/1.3\"", label: "Large CMOS Sensor", desc: "F/1.8 aperture for night & low-light dominance" },
            { metric: "45W", label: "TurboCharge System", desc: "80% battery capacity in just 28 minutes" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="p-5 sm:p-6 rounded-2xl bg-[#0e1118]/80 border border-white/10 backdrop-blur-md text-center shadow-lg hover:border-[#EAA838]/50 transition-colors"
            >
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#F4C463] tracking-tight">
                {stat.metric}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">{stat.label}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 4 Feature Hardware Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md group hover:border-[#EAA838]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EAA838]/15 border border-[#EAA838]/30 flex items-center justify-center text-[#EAA838] mb-3 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">4K TrueHDR Sensor</h4>
            <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
              Capture 1 billion colors with deep dynamic range, preserving delicate highlights and shadow details in any lighting condition.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md group hover:border-[#EAA838]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EAA838]/15 border border-[#EAA838]/30 flex items-center justify-center text-[#EAA838] mb-3 group-hover:scale-110 transition-transform">
              <RotateCw className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Active Dual-Frequency Gimbal</h4>
            <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
              Brushless micro-motors counter micro-shakes at 20,000Hz, providing cinema-grade camera stabilization during sprint motion.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md group hover:border-[#EAA838]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EAA838]/15 border border-[#EAA838]/30 flex items-center justify-center text-[#EAA838] mb-3 group-hover:scale-110 transition-transform">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Micro-Aero Propulsion</h4>
            <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
              Whisper-quiet carbon composite propellers delivering Level 6 wind resistance with 45 minutes of sustained flight.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md group hover:border-[#EAA838]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EAA838]/15 border border-[#EAA838]/30 flex items-center justify-center text-[#EAA838] mb-3 group-hover:scale-110 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">5.8GHz Zero-Lag Remote</h4>
            <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
              Dedicated FPV remote with high-nit sunlight readable screen and automatic emergency GPS return-to-home.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Captured on Ashren / Reviews Section */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-xs font-semibold uppercase tracking-[0.25em] mb-4 backdrop-blur-md">
            <Tv className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>Captured on Ashren</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Loved By 50,000+ <br />
            <span className="font-serif-luxury italic font-normal text-gold-shimmer">
              Creators & Filmmakers
            </span>
          </h2>
        </motion.div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {/* Review Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group flex flex-col justify-between"
          >
            <div
              onClick={() => onOpenVideo("Mountain Alpine 4K Expedition", "TRAVEL ADVENTURE")}
              className="relative cursor-pointer transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_25px_45px_rgba(234,168,56,0.4)] mb-4"
            >
              <Image
                src="/card/camera/card1.png"
                alt="Camera Travel Showcase"
                width={500}
                height={280}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="p-5 rounded-2xl bg-[#0d1017]/80 border border-white/10 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex items-center gap-1 text-[#F4C463]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs text-gray-300 font-semibold ml-1.5">5.0</span>
              </div>
              <p className="text-xs text-gray-200 italic leading-relaxed">
                “The gimbal stability in sub-zero Himalayan altitudes blew me away. Replaced 5kg of heavy gear in my backpack.”
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Aarav Sharma</p>
                  <p className="text-[10px] text-gray-400">National Geographic Explorer</p>
                </div>
                <span className="text-[10px] text-[#EAA838] font-bold uppercase tracking-wider">
                  Verified User
                </span>
              </div>
            </div>
          </motion.div>

          {/* Review Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group flex flex-col justify-between"
          >
            <div
              onClick={() => onOpenVideo("Sunset Ridge 4K FPV Flight", "AERIAL CINEMATOGRAPHY")}
              className="relative cursor-pointer transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_25px_45px_rgba(234,168,56,0.4)] mb-4"
            >
              <Image
                src="/card/drone/card2.png"
                alt="Drone Aerial Showcase"
                width={500}
                height={280}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="p-5 rounded-2xl bg-[#0d1017]/80 border border-white/10 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex items-center gap-1 text-[#F4C463]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs text-gray-300 font-semibold ml-1.5">5.0</span>
              </div>
              <p className="text-xs text-gray-200 italic leading-relaxed">
                “The built-in screen controller means zero phone battery drain or connectivity hiccups during live sunset shoots.”
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Devendra Patel</p>
                  <p className="text-[10px] text-gray-400">Cinematographer & VFX Artist</p>
                </div>
                <span className="text-[10px] text-[#EAA838] font-bold uppercase tracking-wider">
                  Verified User
                </span>
              </div>
            </div>
          </motion.div>

          {/* Review Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="group flex flex-col justify-between"
          >
            <div
              onClick={() => onOpenVideo("Bioluminescent Reef Dive", "OCEAN & MARINE")}
              className="relative cursor-pointer transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_25px_45px_rgba(234,168,56,0.4)] mb-4"
            >
              <Image
                src="/card/camera/card3.png"
                alt="Underwater Action Showcase"
                width={500}
                height={280}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="p-5 rounded-2xl bg-[#0d1017]/80 border border-white/10 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex items-center gap-1 text-[#F4C463]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs text-gray-300 font-semibold ml-1.5">5.0</span>
              </div>
              <p className="text-xs text-gray-200 italic leading-relaxed">
                “Took the AquaGo down to 25 meters in the Andaman islands. Crisp 4K color science without needing external filters.”
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Ananya Roy</p>
                  <p className="text-[10px] text-gray-400">Underwater Marine Biologist</p>
                </div>
                <span className="text-[10px] text-[#EAA838] font-bold uppercase tracking-wider">
                  Verified User
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Specifications Matchup / Comparison Table */}
      <section className="relative">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0c0e15]/90 border border-white/15 backdrop-blur-xl shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              <Layers className="w-3.5 h-3.5 text-[#EAA838]" />
              <span>Specifications Matchup</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Compare The Ecosystem</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/15">
                  <th className="py-4 px-4 text-gray-400 font-medium">Feature</th>
                  <th className="py-4 px-4 text-white font-bold text-center">4K Pocket Camera</th>
                  <th className="py-4 px-4 text-[#F4C463] font-bold text-center">T1 Falcon Drone</th>
                  <th className="py-4 px-4 text-white font-bold text-center">AquaGo Action Cam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Resolution & FPS</td>
                  <td className="py-4 px-4 text-center">4K @ 60 FPS HDR</td>
                  <td className="py-4 px-4 text-center text-[#FFF1C5]">4K @ 60 FPS HDR</td>
                  <td className="py-4 px-4 text-center">4K @ 60 FPS Ultra</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Stabilization</td>
                  <td className="py-4 px-4 text-center">3-Axis Motor Gimbal</td>
                  <td className="py-4 px-4 text-center text-[#FFF1C5]">Optical Flow + GPS</td>
                  <td className="py-4 px-4 text-center">AI HorizonLock 360°</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Weather Resistance</td>
                  <td className="py-4 px-4 text-center">Splash Resistant</td>
                  <td className="py-4 px-4 text-center text-[#FFF1C5]">Wind Level 6 Safe</td>
                  <td className="py-4 px-4 text-center">IPX8 Submersible</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Battery Run Time</td>
                  <td className="py-4 px-4 text-center">140 Mins Continuous</td>
                  <td className="py-4 px-4 text-center text-[#FFF1C5]">45 Mins per battery</td>
                  <td className="py-4 px-4 text-center">110 Mins 4K Recording</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Form Factor Weight</td>
                  <td className="py-4 px-4 text-center">118g (Pocket-Sized)</td>
                  <td className="py-4 px-4 text-center text-[#FFF1C5]">249g (No License Needed)</td>
                  <td className="py-4 px-4 text-center">72g (Magnetic Mount)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Special Tech</td>
                  <td className="py-4 px-4 text-center">180° Rotating Gimbal Head</td>
                  <td className="py-4 px-4 text-center text-[#FFF1C5]">FPV Controller with Screen</td>
                  <td className="py-4 px-4 text-center">Snap-On Magnetic Mounts</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Official Price</td>
                  <td className="py-4 px-4 text-center font-bold text-[#F4C463]">₹24,999</td>
                  <td className="py-4 px-4 text-center font-bold text-[#F4C463]">₹38,999</td>
                  <td className="py-4 px-4 text-center font-bold text-[#F4C463]">₹19,999</td>
                </tr>
                <tr>
                  <td className="py-4 px-4" />
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                      <button
                        onClick={() => {
                          const url = buildProductWhatsAppUrl({
                            title: PRODUCTS[0].name,
                            price: PRODUCTS[0].price,
                            category: PRODUCTS[0].category,
                            quantity: 1,
                          });
                          openWhatsApp(url);
                        }}
                        className="px-2.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all"
                      >
                        <WhatsAppIcon className="w-3 h-3 fill-black" />
                        <span>Buy Now</span>
                      </button>
                      <button
                        onClick={() => onShopNow(PRODUCTS[0])}
                        className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-[#EAA838] hover:text-black font-semibold text-[11px] transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                      <button
                        onClick={() => {
                          const url = buildProductWhatsAppUrl({
                            title: PRODUCTS[1].name,
                            price: PRODUCTS[1].price,
                            category: PRODUCTS[1].category,
                            quantity: 1,
                          });
                          openWhatsApp(url);
                        }}
                        className="px-2.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all"
                      >
                        <WhatsAppIcon className="w-3 h-3 fill-black" />
                        <span>Buy Now</span>
                      </button>
                      <button
                        onClick={() => onShopNow(PRODUCTS[1])}
                        className="px-2.5 py-1.5 rounded-full bg-[#EAA838] text-black font-semibold text-[11px] shadow-md transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                      <button
                        onClick={() => {
                          const url = buildProductWhatsAppUrl({
                            title: PRODUCTS[2].name,
                            price: PRODUCTS[2].price,
                            category: PRODUCTS[2].category,
                            quantity: 1,
                          });
                          openWhatsApp(url);
                        }}
                        className="px-2.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all"
                      >
                        <WhatsAppIcon className="w-3 h-3 fill-black" />
                        <span>Buy Now</span>
                      </button>
                      <button
                        onClick={() => onShopNow(PRODUCTS[2])}
                        className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-[#EAA838] hover:text-black font-semibold text-[11px] transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Creator Club CTA Banner */}
      <section className="relative">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-[#161a26]/95 via-[#0f121a]/98 to-[#090b10] border border-[#EAA838]/40 text-center overflow-hidden shadow-[0_0_60px_rgba(234,168,56,0.25)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EAA838]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-xs font-semibold uppercase tracking-[0.25em] mb-4 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>Join The Creator Movement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready To Elevate Your <br />
            <span className="font-serif-luxury italic font-normal text-gold-shimmer">
              Creative Vision?
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto mb-8 leading-relaxed">
            Free shipping across India • 1-Year replacement warranty • 7-day hassle-free returns.
          </p>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => onShopNow(PRODUCTS[0])}
              className="w-full sm:w-auto max-w-md px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_4px_30px_rgba(234,168,56,0.6)] flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Shop Complete Ashren Range</span>
              <span className="shrink-0">➔</span>
            </button>
          </div>

          {/* Email Subscription Form */}
          <div className="pt-8 border-t border-white/10 max-w-md mx-auto">
            <p className="text-xs text-[#F4C463] font-semibold uppercase tracking-wider mb-3">
              Join Ashren Creator Club — Get ₹1,500 Off First Order
            </p>
            {isSubscribed ? (
              <p className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 py-2.5 px-4 rounded-full">
                ✓ Welcome! Your exclusive ₹1,500 coupon code has been sent to your email.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-black/60 border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#EAA838]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-[#EAA838] hover:text-black text-white text-xs font-bold transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      </div>

      {/* 6. Full-Width Luxury Footer with Giant Watermark */}
      <Footer />
    </>
  );
}

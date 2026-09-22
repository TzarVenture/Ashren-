"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ChevronDown,
  RotateCw,
  Camera,
  Tv,
  Zap,
  Award,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
} from "lucide-react";
import { PRODUCTS, Product } from "./data";
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

interface HeroMobileProps {
  onShopNow: (product: Product) => void;
  onOpenVideo: (title?: string, category?: string) => void;
  isLoaded?: boolean;
}

export default function HeroMobile({
  onShopNow,
  onOpenVideo,
  isLoaded = true,
}: HeroMobileProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentProduct = PRODUCTS[activeIdx];

  // Auto-cycle through products every 3s
  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PRODUCTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLoaded]);

  return (
    <div className="relative w-full flex flex-col px-3 sm:px-5 pt-0 pb-8 select-none overflow-hidden font-sans">
      {/* Top Header Row */}
      <div className="w-full flex items-start justify-between z-10 pt-0 pb-1">
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -10 }}
          animate={isLoaded ? { opacity: 1, x: 0, rotate: -4 } : { opacity: 0, x: -30, rotate: -10 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="font-serif-luxury italic text-2xl sm:text-3xl text-gold-shimmer leading-tight drop-shadow-[0_2px_10px_rgba(234,168,56,0.5)] font-normal tracking-wide">
            Capture <br />
            More <br />
            Live Bolder
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-right"
        >
          <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-200 font-semibold uppercase">
            Compact
          </p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-200 font-semibold uppercase">
            Powerful
          </p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-400 font-normal uppercase">
            Everywhere
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={isLoaded ? { width: 28 } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-[2px] bg-[#EAA838] ml-auto mt-1 rounded-full shadow-[0_0_8px_#EAA838]"
          />
          <AnimatePresence mode="wait">
            <motion.p
              key={currentProduct.id + "-mobile-script"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.4 }}
              className="font-serif-luxury italic text-lg sm:text-xl text-gold-shimmer transform -rotate-4 mt-2 leading-tight drop-shadow-[0_2px_8px_rgba(234,168,56,0.4)] font-normal tracking-wide"
            >
              {currentProduct.scriptTop} <br />
              {currentProduct.scriptSub}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Middle Interactive Zone */}
      <div className="relative w-full flex items-center justify-between my-1 z-10 min-h-[380px] sm:min-h-[420px]">
        {/* Left Column: Spec Badges */}
        <div className="w-[88px] sm:w-[100px] flex flex-col gap-3 z-20 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id + "-mobile-specs"}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-3"
            >
              {currentProduct.mobileSpecs.map((spec) => (
                <div key={spec.id} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-white/25 bg-black/60 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(255,255,255,0.1)] shrink-0">
                    {spec.icon === "4k" ? (
                      "4K"
                    ) : spec.icon === "video" ? (
                      <Camera className="w-3.5 h-3.5 text-gray-200" />
                    ) : spec.icon === "rotation" ? (
                      <RotateCw className="w-3.5 h-3.5 text-gray-200" />
                    ) : spec.icon === "touch" ? (
                      <Tv className="w-3.5 h-3.5 text-gray-200" />
                    ) : currentProduct.id === "ashren-t1-drone" ? (
                      <Zap className="w-3.5 h-3.5 text-[#EAA838]" />
                    ) : (
                      <Award className="w-3.5 h-3.5 text-[#EAA838]" />
                    )}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white tracking-wide">
                      {spec.title}
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] text-gray-300 uppercase tracking-wider font-normal">
                      {spec.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: 3D Product with Orbit Rings */}
        <div className="flex-1 relative h-[360px] sm:h-[400px] flex items-center justify-center px-1 z-10">
          <div className="absolute w-44 h-44 rounded-full bg-[#EAA838]/20 blur-xl -z-10 animate-pulse-glow" />

          {/* Orbit Ring 1 */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              transform:
                "perspective(800px) rotateX(68deg) rotateY(-14deg) rotateZ(18deg) translateZ(0)",
            }}
            className="absolute w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-full border-[2px] border-transparent border-t-[#FFF1C5] border-r-[#EAA838] border-b-[#EAA838]/40 shadow-[0_0_15px_rgba(234,168,56,0.7)] animate-orbit-spin -z-10 will-change-transform"
          >
            <div className="absolute top-1 right-8 w-3 h-3 rounded-full bg-[#FFF] shadow-[0_0_12px_#FFF,0_0_20px_#EAA838]" />
            <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-[#EAA838] shadow-[0_0_10px_#EAA838]" />
          </motion.div>

          {/* Orbit Ring 2 */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              transform:
                "perspective(800px) rotateX(60deg) rotateY(20deg) rotateZ(-30deg) translateZ(0)",
            }}
            className="absolute w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full border border-dashed border-[#F4C463]/70 shadow-[0_0_12px_rgba(244,196,99,0.35)] animate-orbit-spin-reverse -z-10 will-change-transform"
          >
            <div className="absolute top-6 left-3 w-2.5 h-2.5 rounded-full bg-[#FFF1C5] shadow-[0_0_10px_#FFF1C5]" />
          </motion.div>

          {/* Center Product Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ scale: 0.75, opacity: 0, x: 25 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.75, opacity: 0, x: -25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-[160px] sm:max-w-[190px] z-20 will-change-transform flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 180px, 220px"
                  className="object-contain filter drop-shadow-[0_12px_25px_rgba(0,0,0,0.9)] brightness-105"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Floating Showcase Cards */}
        <div className="w-[96px] sm:w-[114px] flex flex-col gap-2.5 items-end z-20 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id + "-mobile-cards"}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col gap-2.5 items-end"
            >
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => onOpenVideo(`${currentProduct.name} Adventure Showcase`, currentProduct.category)}
                className="w-full cursor-pointer relative filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src={currentProduct.cards[0]}
                  alt="Showcase 1"
                  width={160}
                  height={90}
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => onOpenVideo(`${currentProduct.name} 4K Experience`, "VLOG & EXPLORATION")}
                className="w-full cursor-pointer relative filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src={currentProduct.cards[1]}
                  alt="Showcase 2"
                  width={160}
                  height={90}
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => onOpenVideo(`${currentProduct.name} Cinematic Reel`, "CINEMATOGRAPHY")}
                className="w-full cursor-pointer relative filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src={currentProduct.cards[2]}
                  alt="Showcase 3"
                  width={160}
                  height={90}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CTA Button and Product Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full flex flex-col items-center gap-2.5 z-20 my-2"
      >
        <div className="w-full max-w-[340px] grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const url = buildProductWhatsAppUrl({
                title: currentProduct.name,
                price: currentProduct.price,
                category: currentProduct.category,
                quantity: 1,
              });
              openWhatsApp(url);
            }}
            className="py-3 rounded-full bg-[#25D366] text-black font-extrabold text-xs tracking-wide shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center gap-1.5 transition-transform"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-black" />
            <span>Buy Now</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onShopNow(currentProduct)}
            className="py-3 rounded-full bg-gold-gradient text-black font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(234,168,56,0.35)] flex items-center justify-center gap-1.5 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-black" />
            <span>Add to Bag</span>
          </motion.button>
        </div>

        {/* Product Headline Pill Switchers */}
        <div className="flex items-center gap-2 pt-1">
          {PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-3.5 py-1 text-xs font-medium tracking-wide transition-all rounded-full ${
                activeIdx === idx
                  ? "bg-[#EAA838] text-black shadow-[0_0_8px_#EAA838]"
                  : "bg-white/15 text-gray-300 hover:bg-white/25"
              }`}
            >
              {prod.headline}
            </button>
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-0.5 text-[9px] text-gray-300 uppercase tracking-[0.25em] font-medium pt-1">
          <span>Scroll Down</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#EAA838] animate-bounce" />
        </div>
      </motion.div>

      {/* Curved SVG Divider Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isLoaded ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative w-full my-4 flex justify-center items-center"
      >
        <svg
          viewBox="0 0 400 30"
          className="w-full max-w-md h-auto text-[#EAA838]"
          overflow="visible"
        >
          <path
            d="M 0,25 Q 200,-5 400,25"
            fill="none"
            stroke="url(#goldLineGrad)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#EAA838" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Lower Headline & Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="w-full text-center flex flex-col items-center z-10 space-y-2.5"
      >
        <p className="text-[10px] tracking-[0.3em] text-gray-300 font-medium uppercase">
          Capture • Create • Explore
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id + "-lower-title"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-0.5"
          >
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {currentProduct.headline}
            </h2>
            <h3 className="text-3xl font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_2px_20px_rgba(244,196,99,0.5)]">
              {currentProduct.headlineHighlight}
            </h3>
          </motion.div>
        </AnimatePresence>
        <p className="text-xs text-gray-300 max-w-xs font-normal leading-relaxed px-2">
          {currentProduct.subtitle}
        </p>

        {/* 4 Trust Feature Cards */}
        <div className="w-full grid grid-cols-2 gap-3 pt-3 max-w-sm">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-semibold text-white">Premium Gadgets</p>
            <p className="text-[9px] text-gray-400">Curated for You</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-semibold text-white">100% Secure Payment</p>
            <p className="text-[9px] text-gray-400">Shop with Confidence</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <Truck className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-semibold text-white">Free Shipping Across India</p>
            <p className="text-[9px] text-gray-400">Fast & Reliable</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <Headphones className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-semibold text-white">Dedicated Support</p>
            <p className="text-[9px] text-gray-400">We&apos;re Here to Help</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

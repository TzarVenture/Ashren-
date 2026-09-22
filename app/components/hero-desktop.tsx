"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  ShoppingBag,
  Play,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Feather,
  BatteryCharging,
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

interface HeroDesktopProps {
  onShopNow: (product: Product) => void;
  onOpenVideo: (title?: string, category?: string) => void;
  isLoaded?: boolean;
}

export default function HeroDesktop({ onShopNow, onOpenVideo, isLoaded = true }: HeroDesktopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const product = PRODUCTS[currentIndex];

  useEffect(() => {
    if (!isLoaded || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLoaded, isHovered]);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateYRaw = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const rotateXRaw = useTransform(mouseY, [-0.5, 0.5], [12, -12]);

  const rotateY = useSpring(rotateYRaw, { stiffness: 120, damping: 22 });
  const rotateX = useSpring(rotateXRaw, { stiffness: 120, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between px-6 lg:px-12 pb-6 pt-2 select-none overflow-hidden font-outfit"
    >
      {/* Top Right Tagline with Expanding Gold Line */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full flex justify-end items-center max-w-[1540px] mx-auto z-10 pt-1"
      >
        <div className="text-right">
          <p className="text-[11px] sm:text-xs tracking-[0.25em] text-gray-200 font-bold uppercase">Premium Gadgets</p>
          <p className="text-[11px] sm:text-xs tracking-[0.25em] text-gray-400 font-normal uppercase">For A Bolder Tomorrow</p>
          <motion.div
            initial={{ width: 0 }}
            animate={isLoaded ? { width: 32 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-[2px] bg-[#EAA838] ml-auto mt-1 rounded-full shadow-[0_0_8px_#EAA838]"
          />
        </div>
      </motion.div>

      {/* Main Grid: Info Left & 3D Visual Right */}
      <div className="relative max-w-[1540px] w-full mx-auto grid grid-cols-12 items-center my-auto py-4 z-10 gap-4">
        {/* Left Column: Eyebrow, Headlines, Subtitle, CTA, Trust */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs tracking-[0.35em] text-gray-300 font-semibold uppercase">{product.eyebrow}</span>
              </div>
              <div className="space-y-1 mb-4">
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-none">
                  {product.headline}
                </h1>
                <h2 className="text-4xl sm:text-5xl xl:text-6xl font-serif-luxury italic font-normal text-gold-shimmer leading-tight drop-shadow-[0_4px_25px_rgba(244,196,99,0.4)]">
                  {product.headlineHighlight}
                </h2>
              </div>
              <p className="text-sm xl:text-base text-gray-300 max-w-md font-normal leading-relaxed mb-6">
                {product.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Buttons: Buy Now (WhatsApp), Add to Bag & Watch Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3.5 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const url = buildProductWhatsAppUrl({
                  title: product.name,
                  price: product.price,
                  category: product.category,
                  quantity: 1,
                });
                openWhatsApp(url);
              }}
              className="relative group px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm tracking-wide flex items-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 fill-black" />
              <span>Buy Now • ₹{product.price.toLocaleString("en-IN")}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onShopNow(product)}
              className="relative group px-6 py-3.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-black font-extrabold text-sm tracking-wide flex items-center gap-2 shadow-[0_0_25px_rgba(234,168,56,0.35)] transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
              <span>Add to Bag</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenVideo(`${product.name} Cinematic 4K Showcase`, product.category)}
              className="px-5 py-3.5 rounded-full bg-black/40 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-medium text-sm flex items-center gap-2 backdrop-blur-md transition-all group"
            >
              <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[#EAA838] group-hover:text-black transition-colors">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>Watch Video</span>
            </motion.button>
          </motion.div>

          {/* Badges Strip */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${product.id}-badges`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4 sm:gap-6 py-3 border-y border-white/10 max-w-lg mb-6"
            >
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">{product.badge1.value}</span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                  {product.badge1.label}
                </span>
              </div>
              <div className="w-[1px] h-7 bg-white/15" />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">{product.badge2.value}</span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                  {product.badge2.label}
                </span>
              </div>
              <div className="w-[1px] h-7 bg-white/15" />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">{product.badge3.value}</span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                  {product.badge3.label}
                </span>
              </div>
              <div className="w-[1px] h-7 bg-white/15" />
              <div className="flex flex-col items-start">
                {product.badge4.iconType === "battery" ? (
                  <BatteryCharging className="w-5 h-5 text-[#EAA838] mb-0.5" />
                ) : (
                  <Feather className="w-5 h-5 text-[#EAA838] mb-0.5" />
                )}
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                  {product.badge4.label}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              <div className="relative w-8 h-8 rounded-full ring-2 ring-[#0d0f15] overflow-hidden">
                <Image
                  src="/creators/creator-1.jpg"
                  alt="Creator"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="relative w-8 h-8 rounded-full ring-2 ring-[#0d0f15] overflow-hidden">
                <Image
                  src="/creators/creator-2.jpg"
                  alt="Creator"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="relative w-8 h-8 rounded-full ring-2 ring-[#0d0f15] overflow-hidden">
                <Image
                  src="/creators/creator-3.jpg"
                  alt="Creator"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col text-xs">
              <span className="text-gray-300 font-medium">Trusted by 50,000+ Creators</span>
              <div className="flex items-center gap-1.5 text-[#F4C463]">
                <div className="flex text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-[#F4C463]">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-300 font-semibold text-[11px]">4.8/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3D Product View & Floating Cards */}
        <div className="col-span-12 lg:col-span-7 relative h-[480px] xl:h-[540px] flex items-center justify-center">
          {/* Orbit Rings */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute w-[440px] h-[440px] xl:w-[500px] xl:h-[500px] rounded-full border border-[#EAA838]/25 animate-orbit-spin pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#FFF] shadow-[0_0_15px_#FFF,0_0_25px_#EAA838]" />
          </motion.div>

          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute w-[360px] h-[360px] xl:w-[420px] xl:h-[420px] rounded-full border border-[#EAA838]/35 animate-orbit-spin-reverse pointer-events-none"
          >
            <div className="absolute bottom-4 right-10 w-2.5 h-2.5 rounded-full bg-[#FFF1C5] shadow-[0_0_12px_#FFF1C5]" />
          </motion.div>

          {/* Previous / Next Product Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length)}
            aria-label="Previous Product"
            className="absolute left-2 xl:-left-2 z-40 p-2.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-[#EAA838] hover:bg-[#EAA838]/20 transition-all backdrop-blur-md shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length)}
            aria-label="Next Product"
            className="absolute right-2 xl:right-0 z-40 p-2.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-[#EAA838] hover:bg-[#EAA838]/20 transition-all backdrop-blur-md shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Central 3D Product Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ scale: 0.8, opacity: 0, x: 40 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.8, opacity: 0, x: -40 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
              className="relative z-20 w-[270px] sm:w-[310px] xl:w-[360px] h-[400px] sm:h-[440px] xl:h-[500px] shrink-0 will-change-transform flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 270px, (max-width: 1200px) 310px, 360px"
                  className="object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)] filter brightness-105"
                />
              </motion.div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#EAA838]/20 blur-2xl rounded-full -z-10" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Script Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${product.id}-script`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="absolute top-2 xl:top-6 right-24 xl:right-32 z-30 pointer-events-none"
            >
              <p className="font-script text-3xl xl:text-4xl text-gold-shimmer drop-shadow-[0_2px_12px_rgba(234,168,56,0.6)] transform -rotate-6">
                {product.scriptTop} <br />
                <span className="ml-4">{product.scriptSub}</span>
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Floating 180° / 360° / IPX8 Rotation Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-24 xl:top-28 right-1/4 translate-x-8 z-20"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#EAA838]/50 backdrop-blur-md shadow-[0_0_15px_rgba(234,168,56,0.35)] cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#EAA838]" />
              <span className="text-[10px] font-bold text-white tracking-wider uppercase">
                {product.id === "ashren-t1-drone"
                  ? "360° FPV"
                  : product.id === "ashren-aquago-4k"
                  ? "IPX8 WATERPROOF"
                  : "180° ROTATION"}
              </span>
            </motion.div>
          </motion.div>

          {/* Floating Showcase Cards */}
          {/* Card 1: Left */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -4 }}
            animate={isLoaded ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -60, rotate: -4 }}
            transition={{ duration: 0.9, delay: 0.4, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            onClick={() => onOpenVideo(`${product.name} Adventure Showcase`, product.category)}
            className="absolute left-0 xl:left-4 top-1/3 -translate-y-8 z-10 w-48 sm:w-56 xl:w-64 cursor-pointer group will-change-transform"
          >
            <div className="relative filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_20px_40px_rgba(234,168,56,0.5)] transition-all">
              <Image
                src={product.cards[0]}
                alt="Showcase Card 1"
                width={320}
                height={190}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Card 2: Right Top */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 4 }}
            animate={isLoaded ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 60, rotate: 4 }}
            transition={{ duration: 0.9, delay: 0.5, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            onClick={() => onOpenVideo(`${product.name} 4K Experience`, "VLOG & EXPLORATION")}
            className="absolute right-0 xl:right-4 top-8 xl:top-12 z-10 w-48 sm:w-56 xl:w-64 cursor-pointer group will-change-transform"
          >
            <div className="relative filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_20px_40px_rgba(234,168,56,0.5)] transition-all">
              <Image
                src={product.cards[1]}
                alt="Showcase Card 2"
                width={320}
                height={190}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Card 3: Right Bottom */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 30 }}
            animate={isLoaded ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 60, y: 30 }}
            transition={{ duration: 0.9, delay: 0.6, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            onClick={() => onOpenVideo(`${product.name} Master Timelapse`, "CREATIVE TIMELAPSE")}
            className="absolute right-4 xl:right-12 bottom-8 xl:bottom-10 z-10 w-48 sm:w-56 xl:w-60 cursor-pointer group will-change-transform"
          >
            <div className="relative filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_20px_40px_rgba(234,168,56,0.5)] transition-all">
              <Image
                src={product.cards[2]}
                alt="Showcase Card 3"
                width={320}
                height={190}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Bottom Badge: Adventure in 4K */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="absolute bottom-6 right-1/4 translate-x-12 z-20 flex flex-col items-center"
          >
            <span className="font-script text-2xl xl:text-3xl text-gold-shimmer transform -rotate-12 mb-1 drop-shadow-[0_2px_10px_rgba(234,168,56,0.5)]">
              Adventure in 4K
            </span>
            <div className="w-16 h-16 rounded-full border-2 border-[#EAA838] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-1 shadow-[0_0_20px_rgba(234,168,56,0.5)]">
              <span className="text-xs font-black text-white">4K</span>
              <span className="text-[7px] text-[#F4C463] font-bold text-center tracking-tighter">ULTRA HD CLARITY</span>
            </div>
          </motion.div>

          {/* Bottom Right Explore Tag */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-4 right-0 z-20 text-right hidden xl:block"
          >
            <p className="font-script text-4xl text-gold-shimmer transform -rotate-12 mb-2 drop-shadow-[0_2px_12px_rgba(234,168,56,0.6)]">
              Explore Without Limits
            </p>
            <p className="text-[10px] tracking-[0.2em] text-gray-200 font-bold uppercase">
              Compact. Powerful. Everywhere.
            </p>
            <div className="w-6 h-[2px] bg-[#EAA838] ml-auto mt-1" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar: Value Props & Switch Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative max-w-[1540px] w-full mx-auto z-10 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2 text-xs">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-gray-400 font-bold uppercase">Life Looks Better In</p>
            <p className="text-sm font-extrabold text-[#F4C463]">4K</p>
          </div>
          <div className="w-6 h-[1.5px] bg-[#EAA838]" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 xl:gap-8 text-xs text-gray-300">
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-[#EAA838] shrink-0" />
            <div>
              <p className="font-semibold text-white">Free Shipping</p>
              <p className="text-[11px] text-gray-400">Across India</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#EAA838] shrink-0" />
            <div>
              <p className="font-semibold text-white">Secure Payment</p>
              <p className="text-[11px] text-gray-400">100% Safe</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-[#EAA838] shrink-0" />
            <div>
              <p className="font-semibold text-white">Easy Returns</p>
              <p className="text-[11px] text-gray-400">Hassle Free</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Headphones className="w-4 h-4 text-[#EAA838] shrink-0" />
            <div>
              <p className="font-semibold text-white">Dedicated Support</p>
              <p className="text-[11px] text-gray-400">We&apos;re Here to Help</p>
            </div>
          </div>
        </div>

        {/* 3 Switcher Buttons */}
        <div className="flex items-center gap-2.5">
          {PRODUCTS.map((prod, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <button
                key={prod.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[#EAA838] text-black shadow-[0_0_12px_#EAA838]"
                    : "bg-white/10 text-gray-400 hover:text-white"
                }`}
              >
                <span>{prod.headline}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

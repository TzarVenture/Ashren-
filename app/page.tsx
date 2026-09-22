"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useWeather } from "./components/weather-context";
import SplashScreen from "./components/splash-screen";
import Header from "./components/header";
import HeroDesktop from "./components/hero-desktop";
import HeroMobile from "./components/hero-mobile";
import WeatherOverlay from "./components/weather-overlay";
import Categories from "./components/categories";
import MainContent from "./components/main-content";
import VideoModal from "./components/video-modal";
import CartDrawer, { CartItem } from "./components/cart-drawer";
import { PRODUCTS, Product } from "./components/data";

export default function HomePage() {
  const { bgMobileImage, condition } = useWeather();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoInfo, setVideoInfo] = useState({
    title: "Ashren 4K Ultra HD Gimbal Showcase",
    category: "CINEMATIC DEMO",
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "ashren-4k-camera",
      name: "Ashren 4K Pocket Gimbal Camera",
      variant: "Midnight Onyx • 128GB Bundle",
      price: 24999,
      quantity: 1,
      image: "/product/camera.png",
    },
  ]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleOpenVideo = (title?: string, category?: string) => {
    if (title && category) {
      setVideoInfo({ title, category });
    }
    setIsVideoOpen(true);
  };

  const handleShopNow = (product?: Product | CartItem) => {
    const p = product || PRODUCTS[0];
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === p.id);
      if (existing) {
        return prev.map((item) =>
          item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: p.id,
          name: p.name,
          variant: "variant" in p ? p.variant : "Midnight Onyx • 128GB Bundle",
          price: p.price,
          quantity: 1,
          image: p.image,
        },
      ];
    });

    setToastMessage(`Added ${p.name} to your cart!`);
    setTimeout(() => setToastMessage(null), 3500);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="relative min-h-screen text-white flex flex-col justify-between overflow-x-hidden font-sans">
      {/* 1. Splash Screen */}
      <SplashScreen onComplete={() => setIsLoaded(true)} minDuration={1800} />

      {/* 2. Fixed Background Landscape */}
      <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden">
        {/* Dynamic Background Image with Smooth Cross-fade (PC & Mobile) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={bgMobileImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={bgMobileImage}
              alt={`Ashren Cinematic Landscape - ${condition}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top lg:object-center scale-[1.01]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Weather Particle & Atmosphere Overlay (PC & Mobile) */}
        <WeatherOverlay condition={condition} />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* 3. Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[150] px-4 py-2.5 rounded-full bg-[#12151f] border border-[#EAA838]/60 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(234,168,56,0.35)] backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-[#EAA838]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Global Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVideo={() => handleOpenVideo()}
        isLoaded={isLoaded}
      />

      {/* 5. Responsive Hero Section */}
      <div className="w-full flex-1 flex flex-col justify-center">
        <div className="hidden lg:block w-full">
          <HeroDesktop
            onShopNow={handleShopNow}
            onOpenVideo={handleOpenVideo}
            isLoaded={isLoaded}
          />
        </div>
        <div className="block lg:hidden w-full">
          <HeroMobile
            onShopNow={handleShopNow}
            onOpenVideo={handleOpenVideo}
            isLoaded={isLoaded}
          />
        </div>
      </div>

      {/* 6. Curated Categories */}
      <Categories />

      {/* 7. Flagship Trio & Main Content */}
      <MainContent
        onShopNow={handleShopNow}
        onOpenVideo={handleOpenVideo}
      />

      {/* 8. Modals: Video & Cart Drawer */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoTitle={videoInfo.title}
        videoCategory={videoInfo.category}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </main>
  );
}

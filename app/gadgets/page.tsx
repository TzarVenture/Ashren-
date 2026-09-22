"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import Header from "../components/header";
import MainContent from "../components/main-content";
import CartDrawer, { CartItem } from "../components/cart-drawer";
import VideoModal from "../components/video-modal";
import { PRODUCTS, Product } from "../components/data";

export default function GadgetsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoInfo, setVideoInfo] = useState({
    title: "Ashren 4K Ultra HD Gimbal Showcase",
    category: "CINEMATIC DEMO",
  });
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

  return (
    <main className="relative min-h-screen text-white flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Fixed Background Landscape */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
        <Image
          src="/product/gadegetbackground.png"
          alt="Ashren Creator Tech Cinematic Drone Landscape Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/65 pointer-events-none" />
      </div>

      {/* Toast Notification */}
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

      {/* Global Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVideo={() => handleOpenVideo()}
        isLoaded={true}
      />

      {/* Breadcrumbs Navigation */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link
            href="/"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-[#F4C463] font-semibold">Creator Gadgets & Cameras</span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="flex-1">
        <MainContent
          onShopNow={handleShopNow}
          onOpenVideo={handleOpenVideo}
        />
      </div>

      {/* Modals: Video & Cart Drawer */}
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
        onUpdateQuantity={(id, delta) => {
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
        }}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((item) => item.id !== id))}
      />
    </main>
  );
}

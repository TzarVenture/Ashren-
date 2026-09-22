"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Sparkles,
  Heart,
  Share2,
  Check,
  X,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Header from "../components/header";
import CartDrawer, { CartItem } from "../components/cart-drawer";
import VideoModal from "../components/video-modal";
import Footer from "../components/footer";
import { buildProductWhatsAppUrl, openWhatsApp } from "../lib/whatsapp";
import { DRESSES_DATA, Dress } from "../components/data";

interface VirtualTryOnModalProps {
  dress: Dress | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (dress: Dress, size: string, color: string) => void;
}

function VirtualTryOnModal({
  dress,
  isOpen,
  onClose,
  onAddToCart,
}: VirtualTryOnModalProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "craftsmanship" | "fit">("details");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!dress) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ y: "100%", opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-[#0c0e14] border border-[#EAA838]/40 rounded-t-3xl sm:rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col my-auto z-10 text-white"
          >
            {/* Top Action Icons */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2500);
                  }
                }}
                aria-label="Share Dress"
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-gray-300 hover:text-white backdrop-blur-md transition-colors"
              >
                {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Add to Wishlist"
                className={`p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 backdrop-blur-md transition-colors ${
                  isWishlisted ? "text-red-500 border-red-500/50" : "text-gray-300 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
              </button>
              <button
                onClick={onClose}
                aria-label="Close details"
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-gray-300 hover:text-white backdrop-blur-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto overflow-x-hidden flex-1 grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Image & Tag */}
              <div className="relative bg-gradient-to-b from-[#161a24] to-[#0a0d13] p-6 flex items-center justify-center min-h-[360px] sm:min-h-[460px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,168,56,0.15),transparent_70%)] pointer-events-none" />
                {dress.tag && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#EAA838]/20 border border-[#EAA838]/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#F4C463] shadow-[0_0_15px_rgba(234,168,56,0.3)]">
                    {dress.tag}
                  </div>
                )}
                <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black/40">
                  <Image
                    src={dress.image}
                    alt={dress.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right Column: Details & Customizer */}
              <div className="p-5 sm:p-7 flex flex-col justify-between space-y-5 bg-[#0c0e14]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold tracking-widest text-[#EAA838] uppercase">
                      {dress.category}
                    </span>
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[11px] text-amber-300">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span className="font-bold">{dress.rating}</span>
                      <span className="text-gray-400">({dress.reviewsCount})</span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {dress.name}
                  </h2>
                  <p className="text-xs text-gray-300 mt-1">{dress.subtitle}</p>

                  <div className="flex items-baseline gap-2.5 mt-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#F4C463] tracking-tight">
                      ₹{dress.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{dress.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                      {dress.discount}
                    </span>
                  </div>

                  {/* Colors Swatches */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-300 mb-2">
                      Color:{" "}
                      <span className="text-[#F4C463]">
                        {dress.colors[selectedColorIdx]?.name || "Default"}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      {dress.colors.map((c: { name: string; hex: string }, i: number) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColorIdx(i)}
                          title={c.name}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${
                            selectedColorIdx === i
                              ? "border-[#EAA838] scale-110 shadow-[0_0_10px_rgba(234,168,56,0.6)]"
                              : "border-white/20 hover:border-white/60"
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-300">Select Size:</span>
                      <span className="text-[11px] text-[#EAA838] hover:underline cursor-pointer">
                        Size Guide
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {dress.sizes.map((s: string) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`min-w-[40px] h-9 px-3 rounded-lg text-xs font-bold transition-all border ${
                            selectedSize === s
                              ? "bg-[#EAA838] text-black border-[#EAA838] shadow-[0_0_12px_rgba(234,168,56,0.5)]"
                              : "bg-white/5 text-gray-200 border-white/15 hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Details Tabs */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                      <button
                        onClick={() => setActiveTab("details")}
                        className={`text-xs font-semibold pb-1 transition-colors relative ${
                          activeTab === "details" ? "text-[#EAA838]" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Overview
                        {activeTab === "details" && (
                          <motion.div
                            layoutId="tabLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAA838]"
                          />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("craftsmanship")}
                        className={`text-xs font-semibold pb-1 transition-colors relative ${
                          activeTab === "craftsmanship" ? "text-[#EAA838]" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Fabric & Work
                        {activeTab === "craftsmanship" && (
                          <motion.div
                            layoutId="tabLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAA838]"
                          />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("fit")}
                        className={`text-xs font-semibold pb-1 transition-colors relative ${
                          activeTab === "fit" ? "text-[#EAA838]" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Silhouette & Package
                        {activeTab === "fit" && (
                          <motion.div
                            layoutId="tabLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAA838]"
                          />
                        )}
                      </button>
                    </div>

                    <div className="pt-2 text-xs text-gray-300 leading-relaxed min-h-[60px]">
                      {activeTab === "details" && <p>{dress.description}</p>}
                      {activeTab === "craftsmanship" && (
                        <div className="space-y-1">
                          <p>
                            <strong className="text-white">Fabric:</strong> {dress.fabric}
                          </p>
                          <p>
                            <strong className="text-white">Work:</strong> {dress.embroideryWork}
                          </p>
                        </div>
                      )}
                      {activeTab === "fit" && (
                        <div className="space-y-1">
                          <p>
                            <strong className="text-white">Silhouette:</strong> {dress.silhouette}
                          </p>
                          <p>
                            <strong className="text-white">In Box:</strong> {dress.included}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3 Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-white/5 border border-white/10 mt-4 text-[10px] text-gray-300 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#EAA838]" />
                      <span>Free Express Shipping</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-[#EAA838]" />
                      <span>7-Day Easy Return</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#EAA838]" />
                      <span>100% Authentic Handcraft</span>
                    </div>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-2.5">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const colorName = dress.colors[selectedColorIdx]?.name || "Default";
                      const url = buildProductWhatsAppUrl({
                        title: dress.name,
                        category: dress.category,
                        price: dress.price,
                        quantity: 1,
                        size: selectedSize,
                        color: colorName,
                        variant: `${dress.fabric} • Size ${selectedSize} • Color: ${colorName}`,
                        url: typeof window !== "undefined" ? window.location.href : undefined,
                      });
                      openWhatsApp(url);
                    }}
                    className="flex-1 py-3 px-3 sm:px-4 rounded-xl bg-gold-gradient text-black font-extrabold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,168,56,0.4)] hover:bg-gold-gradient-hover transition-all group"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-1.077-.074-.537-.154-1.226-.457-2.096-1.326-.87-.87-1.173-1.559-1.327-2.096-.127-.443-.119-.765-.074-1.077.05-.333.419-1.026.824-1.17.14-.05.289-.074.428-.074.139 0 .288.024.428.074.167.06.273.187.336.312.167.333.568 1.385.618 1.488.05.104.084.225.014.364-.07.139-.105.225-.21.348-.104.124-.219.277-.313.372-.104.104-.212.218-.091.425.121.208.539.889 1.157 1.44.795.708 1.464.928 1.672 1.032.208.104.33.087.452-.052.122-.139.521-.607.66-.815.139-.208.278-.174.468-.104.19.07 1.206.568 1.414.673.208.104.347.156.399.243.052.087.052.503-.092.908z" />
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.526 3.66 1.438 5.178L2 22l4.98-1.39A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.63 0-3.14-.49-4.41-1.33l-.32-.21-2.96.83.83-2.88-.23-.36A8.176 8.176 0 013.8 12c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z" />
                    </svg>
                    <span>BUY NOW • ₹{dress.price.toLocaleString("en-IN")}</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const colorName = dress.colors[selectedColorIdx]?.name || "Default";
                      onAddToCart(dress, selectedSize, colorName);
                    }}
                    className="py-3 px-3 sm:px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-1.5 transition-all whitespace-nowrap"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function DressesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
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

  const filteredDresses = useMemo(() => {
    return DRESSES_DATA.filter((item) => {
      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (item: {
    id: string;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, item];
    });
    setToastMessage(`Added ${item.name} to your cart!`);
    setTimeout(() => setToastMessage(null), 3500);
    setIsCartOpen(true);
  };

  const handleModalAddToCart = (dress: Dress, size: string, color: string) => {
    handleAddToCart({
      id: `${dress.id}-${size}-${color}`,
      name: dress.name,
      variant: `${color} • Size ${size}`,
      price: dress.price,
      quantity: 1,
      image: dress.image,
    });
    setSelectedDress(null);
  };

  return (
    <main className="relative min-h-screen text-white flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Fixed Luxury Background */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
        <Image
          src="/product/dress/background.png"
          alt="Ashren Haute Couture Royal Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none" />
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
        onOpenVideo={() => setIsVideoOpen(true)}
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
          <span className="text-[#F4C463] font-semibold">Haute Couture Dresses</span>
        </div>
      </div>

      {/* Catalog Container */}
      <section
        id="dresses"
        className="relative w-full py-12 sm:py-20 px-3 sm:px-6 lg:px-12 max-w-[1540px] mx-auto z-10 scroll-mt-20 font-sans"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#EAA838]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3 backdrop-blur-md shadow-[0_0_20px_rgba(234,168,56,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>Haute Couture Collection</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Handcrafted Luxury <br />
            <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.5)]">
              Dresses & Royal Ensembles
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2.5 max-w-xl mx-auto leading-relaxed">
            Explore {DRESSES_DATA.length} masterfully curated ethnic silhouettes featuring pure Mulberry silk, Italian velvet, and hand-embossed zari threadwork.
          </p>
        </motion.div>

        {/* Filters & Search Toolbar */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {[
              "All",
              "Anarkali & Gowns",
              "Festive Silk",
              "Embroidered Suits",
              "Bridal & Luxury",
              "Chikankari & Organza",
            ].map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border shrink-0 ${
                    isActive
                      ? "bg-[#EAA838] text-black border-[#EAA838] shadow-[0_0_15px_rgba(234,168,56,0.4)] font-bold"
                      : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {cat === "All" ? `All Designs (${DRESSES_DATA.length})` : cat}
                </button>
              );
            })}
          </div>

          {/* Search and Sort Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by silhouette, silk, zari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#EAA838]/60 focus:ring-1 focus:ring-[#EAA838]/40 backdrop-blur-md transition-all"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 text-xs text-gray-300">
              <span className="font-medium text-gray-400">
                Showing <strong className="text-[#F4C463]">{filteredDresses.length}</strong> of{" "}
                {DRESSES_DATA.length} dresses
              </span>
              <div className="flex items-center gap-1.5 bg-black/60 border border-white/15 px-3 py-2 rounded-xl backdrop-blur-md">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#EAA838]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-[#12151f] text-white">
                    Featured
                  </option>
                  <option value="price-low" className="bg-[#12151f] text-white">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="bg-[#12151f] text-white">
                    Price: High to Low
                  </option>
                  <option value="rating" className="bg-[#12151f] text-white">
                    Top Rated
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Dress Catalog Grid */}
        {filteredDresses.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-400 text-sm">
              No royal dresses found matching &ldquo;{searchQuery}&rdquo;. Try another search term or filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredDresses.map((dress) => (
              <motion.div
                key={dress.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedDress(dress)}
                className="group relative rounded-2xl bg-gradient-to-b from-[#141824]/90 via-[#0e1017]/95 to-[#090b10] border border-white/15 hover:border-[#EAA838]/60 backdrop-blur-xl shadow-xl hover:shadow-[0_15px_35px_rgba(234,168,56,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full bg-black/40 overflow-hidden">
                  <Image
                    src={dress.image}
                    alt={dress.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {dress.tag && (
                    <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-[#EAA838] text-black text-[9px] font-extrabold tracking-wider uppercase shadow-md">
                      {dress.tag}
                    </div>
                  )}

                  {/* Virtual Try-On Hover Badge */}
                  <div className="absolute bottom-2 inset-x-2 z-10 opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 hidden sm:block pointer-events-none">
                    <div className="w-full py-1.5 px-2.5 rounded-xl bg-black/85 border border-[#EAA838]/80 backdrop-blur-md font-bold text-[10px] sm:text-[11px] flex items-center justify-center gap-1.5 shadow-xl text-[#F4C463]">
                      <Sparkles className="w-3 h-3 text-[#EAA838] animate-pulse" />
                      <span>Virtual Try-On</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Details Row */}
                <div className="p-2 sm:p-3 flex flex-col justify-between flex-1 space-y-2 mt-1">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#EAA838] tracking-wider truncate max-w-[68%]">
                        {dress.category}
                      </span>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-[9px] sm:text-[10px] text-[#F4C463] font-bold shrink-0">
                        <Star className="w-2.5 h-2.5 fill-[#F4C463] text-[#F4C463]" />
                        <span>{dress.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-[#F4C463] transition-colors">
                      {dress.name}
                    </h3>
                    <p className="text-[9.5px] sm:text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                      {dress.subtitle}
                    </p>
                  </div>

                  {/* Price & Quick Add */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-1.5">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1 sm:gap-1.5">
                        <span className="text-xs sm:text-base font-extrabold text-[#F4C463] tracking-tight">
                          ₹{dress.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[9px] sm:text-xs text-gray-500 line-through">
                          ₹{dress.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-[8.5px] sm:text-[9.5px] text-emerald-400 font-bold">
                        {dress.discount}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = buildProductWhatsAppUrl({
                            title: dress.name,
                            category: dress.category,
                            price: dress.price,
                            quantity: 1,
                            variant: `${dress.fabric} • Size M`,
                            url: typeof window !== "undefined" ? window.location.href : undefined,
                          });
                          openWhatsApp(url);
                        }}
                        aria-label="Buy Now via WhatsApp"
                        title="Buy Now via WhatsApp"
                        className="p-1.5 sm:p-2 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-black transition-all shrink-0 shadow-md flex items-center justify-center"
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-1.077-.074-.537-.154-1.226-.457-2.096-1.326-.87-.87-1.173-1.559-1.327-2.096-.127-.443-.119-.765-.074-1.077.05-.333.419-1.026.824-1.17.14-.05.289-.074.428-.074.139 0 .288.024.428.074.167.06.273.187.336.312.167.333.568 1.385.618 1.488.05.104.084.225.014.364-.07.139-.105.225-.21.348-.104.124-.219.277-.313.372-.104.104-.212.218-.091.425.121.208.539.889 1.157 1.44.795.708 1.464.928 1.672 1.032.208.104.33.087.452-.052.122-.139.521-.607.66-.815.139-.208.278-.174.468-.104.19.07 1.206.568 1.414.673.208.104.347.156.399.243.052.087.052.503-.092.908z" />
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.526 3.66 1.438 5.178L2 22l4.98-1.39A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.63 0-3.14-.49-4.41-1.33l-.32-.21-2.96.83.83-2.88-.23-.36A8.176 8.176 0 013.8 12c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z" />
                        </svg>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart({
                            id: dress.id,
                            name: dress.name,
                            variant: `${dress.fabric} • Size M`,
                            price: dress.price,
                            quantity: 1,
                            image: dress.image,
                          });
                        }}
                        aria-label="Add to cart"
                        title="Add to cart"
                        className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-[#EAA838] text-gray-200 hover:text-black border border-white/20 hover:border-[#EAA838] transition-all shrink-0 shadow-md"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Luxury Footer with Giant Watermark */}
      <Footer />

      {/* Virtual Try-On Modal */}
      <VirtualTryOnModal
        dress={selectedDress}
        isOpen={selectedDress !== null}
        onClose={() => setSelectedDress(null)}
        onAddToCart={handleModalAddToCart}
      />

      {/* Video Modal & Cart Drawer */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoTitle="Ashren Haute Couture Runway Showcase"
        videoCategory="ROYAL COLLECTION"
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

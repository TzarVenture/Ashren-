"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildGeneralWhatsAppUrl, openWhatsApp } from "../lib/whatsapp";

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
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

export default function WhatsAppCTA() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const url = buildGeneralWhatsAppUrl();
    openWhatsApp(url);
  };

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] flex items-center gap-2.5 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Clean Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative hidden sm:flex items-center px-3.5 py-2 rounded-xl bg-[#0d1017]/95 border border-[#25D366]/40 text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-pointer whitespace-nowrap"
            onClick={handleClick}
          >
            <span className="text-xs font-semibold text-gray-200">
              Chat on WhatsApp
            </span>
            <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-[#25D366]/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#1ea84f] via-[#25D366] to-[#46e67e] text-black flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_35px_rgba(37,211,102,0.7)] border-2 border-white/25 transition-all"
      >
        {/* Soft Ambient Glow */}
        <div className="absolute -inset-1 rounded-full bg-[#25D366]/25 blur-md group-hover:bg-[#25D366]/45 transition-all pointer-events-none -z-10" />

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
      </motion.button>
    </div>
  );
}

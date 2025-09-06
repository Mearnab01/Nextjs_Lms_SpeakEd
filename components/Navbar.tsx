"use client";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import NavItems from "@/components/NavItems";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-20 bg-slate-800 shadow-lg border-b border-slate-700/50 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-4 w-full max-w-lg"
            >
              <motion.div
                className="flex items-center gap-2.5 cursor-pointer group transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <Image
                    src="/icons/cap.svg"
                    alt="logo"
                    width={46}
                    height={44}
                    className="relative z-10 drop-shadow-lg"
                  />
                </div>
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold text-3xl tracking-tight hidden md:block">
                  SpeakEd
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex justify-between items-center gap-6 w-full max-w-full">
              <NavItems />

              <SignedOut>
                <SignInButton>
                  <Button className="px-6 py-2  bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105 cursor-pointer">
                    <span className="relative z-10 flex items-center gap-2">
                      Sign In
                      <Sparkles
                        size={16}
                        className="group-hover:rotate-12 transition-transform"
                      />
                    </span>
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 border-2 border-slate-600 shadow-lg",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;

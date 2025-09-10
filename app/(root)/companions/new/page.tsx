import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import { GraduationCap, Lock, Sparkles, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const CanCreateCompanion = await newCompanionPermissions();

  return (
    <main className="flex justify-center px-4 py-10 bg-transparent">
      <article className="w-full max-w-7xl flex flex-col gap-8 mt-20">
        {/* Header Section */}
        <div className="relative text-center">
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-5 shadow-lg shadow-blue-500/30 group hover:shadow-blue-500/50 transition-all duration-500">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <GraduationCap className="h-8 w-8 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent inline-block relative mb-2">
            Companion Designer
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-md mx-auto leading-relaxed">
            Create and customize your own AI companion to help with learning.
          </p>
        </div>

        {CanCreateCompanion ? (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="absolute -top-4 -right-4">
              <Zap className="h-8 w-8 text-yellow-400 opacity-20 animate-ping" />
            </div>
            <CompanionForm />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            <div className="absolute -bottom-4 -left-4 rotate-45">
              <Lock className="h-16 w-16 text-slate-700 opacity-20" />
            </div>

            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Upgrade Your Plan
              </h2>
            </div>

            <p className="text-slate-300 max-w-md mb-8 text-lg leading-relaxed">
              You have reached the limit of companions you can create on your
              current plan. Upgrade to unlock more companion slots and advanced
              features.
            </p>

            <Link
              href="/subscriptions"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <span className="relative">Upgrade Plan</span>
              <ArrowRight className="h-5 w-5 relative transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </article>
    </main>
  );
};

export default NewCompanion;

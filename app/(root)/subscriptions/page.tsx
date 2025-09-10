import { testimonials } from "@/constants";
import { PricingTable } from "@clerk/nextjs";
import { Star, Sparkles, Home } from "lucide-react";
import Link from "next/link";

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center p-4 mt-40">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Return to Home Button */}
      <Link href="/" className="absolute top-6 left-6 z-20 group">
        <button className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm transition-all duration-300 group-hover:-translate-x-1">
          <Home
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Return Home</span>
        </button>
      </Link>

      <div className="relative w-full max-w-6xl mt-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            Premium Plans
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Unlock the full potential of voice-driven learning with our premium
            subscription plans
          </p>
        </div>

        {/* Pricing Table Container */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 md:p-8 shadow-2xl z-20">
          <PricingTable />
        </div>

        {/* Testimonials */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-slate-300 mb-6">
            Loved by Thousands of Learners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/30"
              >
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-300 italic mb-4">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

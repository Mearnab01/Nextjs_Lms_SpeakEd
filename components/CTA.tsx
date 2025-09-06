"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus, Sparkles, ArrowRight } from "lucide-react";

const Cta = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 border border-slate-700 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full translate-y-24 -translate-x-24 blur-3xl"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
        {/* Content section */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles size={16} />
            Start learning your way
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-md">
            Build and Personalize Your Learning Companion
          </h2>

          <p className="text-slate-300 text-lg max-w-md">
            Pick a name, subject, voice, & personality — and start learning
            through voice conversations that feel natural and fun.
          </p>
          {/* Image section */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
                <Image
                  src="/images/cta.svg"
                  alt="Voice learning companion"
                  width={362}
                  height={250}
                  className="transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Animated voice waves */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-end gap-1 h-6">
                {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((height, index) => (
                  <div
                    key={index}
                    className="w-1 bg-gradient-to-t from-blue-400 to-purple-400 rounded-t-full animate-voice"
                    style={{
                      height: `${height * 4}px`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/companions/new">
            <button className="group relative flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 mt-20">
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              <span>Build a New Companion</span>
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes voice {
          0%,
          100% {
            height: 4px;
          }
          50% {
            height: 16px;
          }
        }
        .animate-voice {
          animation: voice 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Cta;

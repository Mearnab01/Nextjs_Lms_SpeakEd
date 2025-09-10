import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="relative h-[90vh] w-full bg-transparent overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/system_de.PNG"
          alt="background"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/40 to-slate-900/80 backdrop-blur-xs"></div>
      </div>

      {/* Content Container with Glassmorphism Effect */}
      <div className="relative z-10 h-full w-full flex items-center justify-center p-4 md:p-8">
        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl shadow-slate-900/50 p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;

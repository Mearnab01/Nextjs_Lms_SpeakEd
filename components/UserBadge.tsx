import { Sparkles, Zap, BookOpen } from "lucide-react";

export const UserBadge = ({ companionsCount }: { companionsCount: number }) => {
  let icon, label, containerClass, textClass, pulseClass;

  if (companionsCount > 10) {
    icon = <Zap size={18} className="text-purple-300" />;
    label = "Pro Learner";
    containerClass =
      "bg-gradient-to-r from-purple-900/30 to-purple-700/20 border-l-4 border-purple-500 shadow-purple-500/20";
    textClass = "text-purple-300";
    pulseClass = "bg-purple-500";
  } else if (companionsCount > 2) {
    icon = <Sparkles size={18} className="text-amber-300" />;
    label = "Active Learner";
    containerClass =
      "bg-gradient-to-r from-amber-900/30 to-amber-700/20 border-l-4 border-amber-500 shadow-amber-500/20";
    textClass = "text-amber-300";
    pulseClass = "bg-amber-500";
  } else {
    icon = <BookOpen size={18} className="text-slate-300" />;
    label = "New Learner";
    containerClass =
      "bg-gradient-to-r from-slate-800/30 to-slate-700/20 border-l-4 border-slate-500 shadow-slate-500/20";
    textClass = "text-slate-300";
    pulseClass = "bg-slate-500";
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${containerClass} backdrop-blur-sm transition-all duration-500 hover:scale-105 group relative overflow-hidden`}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Pulsing dot indicator */}
      <div className={`relative flex items-center justify-center`}>
        <div
          className={`h-3 w-3 rounded-full ${pulseClass} opacity-70 animate-ping absolute`}
        ></div>
        <div
          className={`h-3 w-3 rounded-full ${pulseClass} relative z-10`}
        ></div>
      </div>

      {/* Icon with subtle rotation on hover */}
      <div className="transition-transform duration-500 group-hover:rotate-12">
        {icon}
      </div>

      {/* Text with gradient effect for Pro Learner */}
      <span
        className={`font-medium ${textClass} ${
          companionsCount > 10
            ? "bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
            : ""
        }`}
      >
        {label}
      </span>

      {/* Companion count badge */}
      <div
        className={`ml-auto px-2.5 py-1 rounded-full text-xs font-semibold ${textClass} bg-white/10 backdrop-blur-sm`}
      >
        {companionsCount} {companionsCount === 1 ? "Companion" : "Companions"}
      </div>
    </div>
  );
};

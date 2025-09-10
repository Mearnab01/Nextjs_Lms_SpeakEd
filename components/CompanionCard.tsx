"use client";
import Link from "next/link";
import { Clock, Play } from "lucide-react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  return (
    <article
      className="relative bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg group"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className="text-xs font-medium px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: `${color}40` }}
        >
          {subject}
        </div>
        {/* <button
          className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors cursor-pointer"
          onClick={handleBookmark}
        >
          <Bookmark
            size={16}
            className={
              bookmarked ? "fill-amber-400 text-amber-400" : "text-slate-400"
            }
          />
        </button> */}
      </div>

      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
        {name}
      </h2>
      <p className="text-slate-400 text-sm mb-4">
        {topic.length > 50 ? topic.substring(0, 50) + "..." : topic}
      </p>

      <div className="flex items-center gap-2 text-slate-400 mb-5">
        <Clock size={14} />
        <p className="text-xs">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:gap-3 cursor-pointer"
          style={{ backgroundColor: color }}
        >
          <Play size={16} />
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;

"use client";
import { Search, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl);
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });

          router.push(newUrl);
        }
      }
    }, 500);
  }, [searchQuery, router, searchParams, pathname]);
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative group">
      <div
        className={`
        relative border border-slate-700 rounded-xl items-center flex gap-3 px-4 py-3 h-fit
        bg-slate-800/50 backdrop-blur-sm transition-all duration-300
        ${
          isFocused
            ? "ring-2 ring-blue-500/50 border-blue-400/30 shadow-lg"
            : "border-slate-700 group-hover:border-slate-600 group-hover:shadow-md"
        }
      `}
      >
        <Search className="h-4 w-4 text-slate-400 transition-colors group-hover:text-blue-400" />

        <input
          placeholder="Search companions by topic or name..."
          className="outline-none bg-transparent text-slate-200 placeholder:text-slate-500 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {searchQuery && (
          <button
            onClick={clearSearch}
            className="p-1 rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors"
          >
            <X className="h-3 w-3 text-slate-400" />
          </button>
        )}
      </div>

      {/* Floating label animation */}
      {isFocused && (
        <div className="absolute -top-2 left-3 px-1 bg-slate-900">
          <span className="text-xs text-blue-400 font-medium">Search</span>
        </div>
      )}

      {/* Micro-interaction indicator */}
      <div
        className={`
        absolute bottom-0 left-1/2 transform -translate-x-1/2
        w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500
        transition-all duration-300 rounded-full
        ${isFocused ? "w-4/5" : "w-0"}
      `}
      ></div>
    </div>
  );
};

export default SearchInput;

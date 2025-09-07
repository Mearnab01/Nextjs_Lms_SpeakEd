"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { BookOpen, ChevronDown, X } from "lucide-react";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";

  const [subject, setSubject] = useState(query);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let newUrl = "";
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [subject]);

  const clearFilter = () => {
    setSubject("all");
  };

  return (
    <div className="relative group">
      <Select
        onValueChange={setSubject}
        value={subject}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger
          className={`
            w-full min-w-[180px] bg-slate-800 border border-slate-700 rounded-xl px-4 py-3
            text-slate-200 hover:border-slate-600 hover:shadow-md transition-all duration-300
          focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/30
                    ${
                      isOpen
                        ? "ring-2 ring-blue-500/30 border-blue-400/30 shadow-lg"
                        : ""
                    }
                    flex items-center justify-between
                `}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <SelectValue placeholder="Filter by subject" />
          </div>
          <div className="flex items-center gap-2">
            {subject && subject !== "all" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter();
                }}
                className="p-1 rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors"
              >
                <X className="h-3 w-3 text-slate-400" />
              </button>
            )}
          </div>
        </SelectTrigger>

        <SelectContent
          className={`
             bg-slate-800 border border-slate-700 rounded-xl shadow-xl mt-1
             animate-in fade-in-80 duration-200
                `}
        >
          <SelectItem
            value="all"
            className={`
             text-slate-300 hover:bg-slate-700/50 hover:text-white focus:bg-slate-700/50
             transition-colors duration-200 cursor-pointer
                  ${subject === "all" ? "bg-blue-500/20 text-blue-300" : ""}
                        `}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-xs text-white">All</span>
              </div>
              All subjects
            </div>
          </SelectItem>

          {subjects.map((subj) => (
            <SelectItem
              key={subj}
              value={subj}
              className={`
                  capitalize text-slate-300 hover:bg-slate-700/50 hover:text-white 
                 focus:bg-slate-700/50 transition-colors duration-200 cursor-pointer
                    ${subject === subj ? "bg-blue-500/20 text-blue-300" : ""}
                            `}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-slate-700/50 rounded-md flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-400">
                    {subj.charAt(0).toUpperCase()}
                  </span>
                </div>
                {subj}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Active filter indicator */}
      {subject && subject !== "all" && (
        <div className="absolute -top-2 -right-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full ring-2 ring-slate-900"></div>
        </div>
      )}
    </div>
  );
};

export default SubjectFilter;

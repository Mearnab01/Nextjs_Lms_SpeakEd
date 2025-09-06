"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Clock, Play, ArrowRight } from "lucide-react";

interface Companion {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number;
}

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({
  title,
  companions,
  classNames,
}: CompanionsListProps) => {
  return (
    <article
      className={cn(
        "bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl",
        classNames
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="flex items-center text-slate-400 text-sm">
          <span className="bg-slate-800 px-3 py-1 rounded-full">
            {companions?.length || 0} lessons
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-slate-800">
        <Table>
          <TableHeader className="bg-slate-800/50">
            <TableRow className="border-b border-slate-700 hover:bg-transparent">
              <TableHead className="text-slate-300 text-lg py-4 font-medium pl-6">
                Lessons
              </TableHead>
              <TableHead className="text-slate-300 text-lg py-4 font-medium">
                Subject
              </TableHead>
              <TableHead className="text-slate-300 text-lg py-4 font-medium text-right pr-6">
                Duration
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {companions && companions.length > 0 ? (
              companions.map(({ id, subject, name, topic, duration }) => (
                <TableRow
                  key={id}
                  className="border-b border-slate-800 last:border-b-0 group hover:bg-slate-800/30 transition-all duration-300"
                >
                  {/* Lesson Name */}
                  <TableCell className="pl-6 py-5">
                    <Link href={`/companions/${id}`}>
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div
                          className="size-16 flex items-center justify-center rounded-xl shadow-lg transition-all duration-300"
                          style={{
                            backgroundColor: getSubjectColor(subject) + "40",
                          }}
                        >
                          <div className="size-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <Image
                              src={`/icons/${subject}.svg`}
                              alt={subject}
                              width={24}
                              height={24}
                              className="filter brightness-0 invert"
                            />
                          </div>
                        </div>

                        {/* Text */}
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-white text-lg group-hover:text-blue-300 transition-colors">
                            {name}
                          </p>
                          <p className="text-slate-400 text-sm line-clamp-1">
                            {topic}
                          </p>
                        </div>

                        {/* Arrow Icon */}
                        <ArrowRight className="text-slate-500 ml-2" size={16} />
                      </div>
                    </Link>
                  </TableCell>

                  {/* Subject */}
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className="subject-badge hidden md:block px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{
                          backgroundColor: getSubjectColor(subject) + "40",
                          color: getSubjectColor(subject),
                        }}
                      >
                        {subject}
                      </div>
                      <div
                        className="flex items-center justify-center rounded-lg w-10 h-10 md:hidden"
                        style={{
                          backgroundColor: getSubjectColor(subject) + "40",
                        }}
                      >
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={18}
                          height={18}
                          className="filter brightness-0 invert opacity-80"
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Duration + Play Button */}
                  <TableCell className="pr-6 py-5">
                    <div className="flex items-center gap-2 w-full justify-end">
                      <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg">
                        <Clock size={16} className="text-slate-400" />
                        <p className="text-white font-medium">
                          {duration}
                          <span className="text-slate-400 ml-1">min</span>
                        </p>
                      </div>
                      <Link
                        href={`/companions/${id}`}
                        className="hidden md:block"
                      >
                        <button className="ml-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors group/btn">
                          <Play size={16} className="text-white" />
                        </button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-12 text-slate-400">
                  No companions available yet
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </article>
  );
};

export default CompanionsList;

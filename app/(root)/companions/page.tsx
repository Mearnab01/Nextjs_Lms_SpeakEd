import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import { BookOpen, Search, Filter, Sparkles } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({ subject, topic });

  return (
    <main className="min-h-screen mt-40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Companion Library
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl">
            Discover and explore AI companions to guide your learning journey
            through voice conversations.
          </p>
        </div>

        {/* Filters Section */}
        <section className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-2">
                <Search className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300 font-medium">
                  Find your companion
                </span>
              </div>
              <SearchInput />
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-4 w-4 text-purple-400" />
                <span className="text-slate-300 font-medium">
                  Filter by subject
                </span>
              </div>
              <SubjectFilter />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-700/30">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-slate-400 text-sm">
              {companions.length}{" "}
              {companions.length === 1 ? "companion" : "companions"} found
              {subject && ` in ${subject}`}
              {topic && ` for "${topic}"`}
            </span>
          </div>
        </section>

        {/* Companions Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>

        {/* Empty State */}
        {companions.length === 0 && (
          <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700/50 rounded-2xl mb-4">
              <BookOpen className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No companions found
            </h3>
            <p className="text-slate-400 max-w-md mx-auto">
              {subject || topic
                ? `Try adjusting your filters to see more companions.`
                : `Be the first to create a companion and start learning!`}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CompanionsLibrary;

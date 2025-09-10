import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";
import { Clock, BookOpen } from "lucide-react";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  const { name, subject, title, topic, duration } = companion;

  if (!user) redirect("/sign-in");
  if (!name) redirect("/companions");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 mt-40">
      {/* Header Section */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 mb-6 shadow-xl">
          <div className="flex items-start justify-between max-md:flex-col max-md:gap-6">
            <div className="flex items-start gap-4">
              {/* Subject Icon */}
              <div
                className="size-16 flex items-center justify-center rounded-xl shadow-lg transition-all duration-300 hover:scale-105 max-md:size-14"
                style={{ backgroundColor: getSubjectColor(subject) + "40" }}
              >
                <div className="size-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm max-md:size-8">
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={28}
                    height={28}
                    className="filter brightness-0 invert max-md:w-6 max-md:h-6"
                  />
                </div>
              </div>

              {/* Companion Info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent max-md:text-2xl">
                    {name}
                  </h1>
                  <div
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{
                      backgroundColor: getSubjectColor(subject) + "40",
                      color: getSubjectColor(subject),
                    }}
                  >
                    {subject}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <BookOpen size={16} className="text-blue-400" />
                  <p className="text-lg max-md:text-base">{topic}</p>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-xl border border-slate-600/50">
              <Clock size={20} className="text-blue-400" />
              <span className="text-xl font-semibold text-white">
                {duration}
                <span className="text-slate-400 text-sm ml-1">min</span>
              </span>
            </div>
          </div>

          {/* Progress Bar (optional) */}
          <div className="mt-6">
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: "15%" }}
              ></div>
            </div>
            <p className="text-slate-400 text-sm mt-2 text-center">
              Session starting...
            </p>
          </div>
        </div>

        {/* Companion Component */}
        <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/30 p-6 shadow-xl">
          <CompanionComponent
            {...companion}
            companionId={id}
            userName={user.firstName!}
            userImage={user.imageUrl!}
          />
        </div>

        {/* User Info Footer */}
        <div className="flex items-center justify-center mt-8 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {user.firstName?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <span>Learning with {user.firstName}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanionSession;

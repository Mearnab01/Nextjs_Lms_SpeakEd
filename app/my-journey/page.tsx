import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
import {
  Bookmark,
  Clock,
  User,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { DeleteButton } from "@/components/DeleteButton";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = (await getUserSessions(user.id)).flat();
  return (
    <main className="max-w-6xl mx-auto p-6 mt-40 bg-transparent">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50 shadow-xl mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6">
          {/* User Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-sm opacity-50"></div>
              <Image
                src={user.imageUrl}
                alt={user.firstName!}
                width={120}
                height={120}
                className="relative rounded-2xl border-4 border-slate-800 shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-slate-400 text-lg">
                {user.emailAddresses[0].emailAddress}
              </p>
              <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-slate-300 text-sm">Active Learner</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4 max-sm:flex-col">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/30 flex flex-col items-center min-w-[140px] group hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex gap-2 items-center mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {sessionHistory.length}
                </p>
              </div>
              <div className="text-slate-400 text-sm text-center">
                Lessons completed
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/30 flex flex-col items-center min-w-[140px] group hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex gap-2 items-center mb-2">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {companions.length}
                </p>
              </div>
              <div className="text-slate-400 text-sm text-center">
                Companions created
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Sections */}
      <Accordion type="multiple" className="space-y-4">
        {/* My Companions*/}
        <AccordionItem
          value="companions"
          className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 overflow-hidden"
        >
          <AccordionTrigger className="text-xl text-purple-100 font-semibold p-6 hover:bg-slate-700/20 transition-colors">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-purple-400" />
              <span>My Companions</span>
              <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-sm">
                {companions.length}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-300">
                Created Companions
              </h3>
              {companions.length > 0 && (
                <DeleteButton companions={companions} userId={user.id} />
              )}
            </div>
            <CompanionsList
              title=""
              companions={companions}
              classNames="border-none shadow-none bg-transparent"
              showDelete={true}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="recent"
          className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 overflow-hidden"
        >
          <AccordionTrigger className="text-xl text-teal-200 font-semibold p-6 hover:bg-slate-700/20 transition-colors">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-400" />
              <span>Recent Sessions</span>
              <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-sm">
                {sessionHistory.length}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <CompanionsList
              title="Learning History"
              companions={sessionHistory}
              classNames="border-none shadow-none bg-transparent"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Empty State */}
      {companions.length === 0 && sessionHistory.length === 0 && (
        <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/30 mt-8">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            Start Your Learning Journey
          </h3>
          <p className="text-slate-400 max-w-md mx-auto">
            You haven't created any companions or started any sessions yet.
            Begin your voice learning adventure!
          </p>
        </div>
      )}
    </main>
  );
};

export default Profile;

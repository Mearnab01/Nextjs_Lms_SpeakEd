import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
// import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { GraduationCap } from "lucide-react";
import React from "react";

const Homepage = async () => {
  const companions = await getAllCompanions({ limit: 4 });
  const recentSessionCompanions = (await getRecentSessions(10)).flat();

  return (
    <>
      <main className="min-h-screen mt-24 bg-transparent">
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Featured Guides</h1>
        </div>

        <section className="home-section">
          <section className="home-section">
            {companions.map((comp) => (
              <CompanionCard
                key={comp.id}
                {...comp}
                color={getSubjectColor(comp.subject)}
              />
            ))}
          </section>
        </section>

        <section className="home-section">
          <CompanionsList
            title="Recently completed Lessons"
            companions={recentSessionCompanions}
            classNames="w-2/3 max-lg:w-full"
          />
          <CTA />
        </section>
      </main>
    </>
  );
};

export default Homepage;

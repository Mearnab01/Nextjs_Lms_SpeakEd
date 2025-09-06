import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import { Mic } from "lucide-react";
import React from "react";

const Homepage = () => {
  return (
    <main className="min-h-screen mt-24 bg-transparent">
      <div className="flex items-center justify-center mb-8">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
          <Mic className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Featured Guides</h1>
      </div>

      <section className="home-section">
        <section className="home-section">
          <CompanionCard
            id="1"
            name="Neura the Brainy Explorer"
            topic="The Wonders of Quantum Physics"
            subject="Science"
            duration={45}
            color="#A78BFA"
            bookmarked={true}
          />
          <CompanionCard
            id="2"
            name="Codey the Logic Hacker"
            topic="Building Your First JavaScript Game"
            subject="Coding"
            duration={30}
            color="#F472B6"
            bookmarked={false}
          />
          <CompanionCard
            id="3"
            name="Memo the Memory Keeper"
            topic="The Rise and Fall of Ancient Empires"
            subject="History"
            duration={20}
            color="#FBBF24" // Warm gold
            bookmarked={false}
          />
          <CompanionCard
            id="4"
            name="Verba the Wordsmith"
            topic="Mastering English Idioms & Expressions"
            subject="Language"
            duration={25}
            color="#38BDF8" // Sky blue
            bookmarked={false}
          />
        </section>
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed Lessons"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Homepage;

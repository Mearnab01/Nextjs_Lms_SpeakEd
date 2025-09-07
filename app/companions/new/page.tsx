import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { Mic } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    <main className="min-lg:w-1/2 min-md:w-2/3 items-center justify-center bg-transparent mt-20">
      <article className="w-full flex flex-col gap-4">
        <div className="relative text-center mb-5">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
            <Mic className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white inline-block relative ml-6">
            Companion Designer
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </h1>
        </div>

        <CompanionForm />
      </article>
    </main>
  );
};

export default NewCompanion;

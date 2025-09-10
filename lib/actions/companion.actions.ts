"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { GoogleGenAI } from "@google/genai";

export const createCompanion = async (formData: CreateCompanion) => {
  const user = await currentUser();
  const supabase = createSupabaseClient();

  if (!user?.id) {
    console.warn("Missing userId");
    return null;
  }

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author: user.id })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
};

export const deleteCompanion = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  if (!userId) {
    console.warn("Unauthorized: You must be logged in to delete a companion.");
    return null;
  }

  const { error } = await supabase
    .from("companions")
    .delete()
    .eq("id", companionId)
    .eq("author", userId);
  if (error) throw new Error(error.message);

  return { success: true, message: "Companion deleted successfully!" };
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const user = await currentUser();
  if (!user?.id) {
    console.warn("Unauthorized: You must be logged in");
  }
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: user?.id,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const user = await currentUser();
  if (!user?.id) return [];
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: You must be logged in");
  }
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "2_companion_limit" })) {
    limit = 2;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length;

  if (companionCount >= limit) {
    return { allowed: false, limit };
  } else {
    return { allowed: true, limit };
  }
};

// Transcripts
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export const saveTranscripts = async (
  companionId: string,
  chat: string,
  summary?: string
) => {
  const supabase = createSupabaseClient();
  const user = await currentUser();

  if (!user?.id) throw new Error("User not logged-in");
  const { data, error } = await supabase
    .from("transcripts")
    .insert({
      user_id: user.id,
      companion_id: companionId,
      transcript: chat,
      summary: summary || null,
    })
    .select();

  if (error) throw new Error(error.message);

  return data[0];
};

export const getUserTranscripts = async () => {
  const supabase = createSupabaseClient();
  const user = await currentUser();

  if (!user?.id) return [];

  const { data, error } = await supabase
    .from("transcripts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const summarizeTranscript = async (chat: string) => {
  try {
    console.log("Generating summary for transcript:", chat);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: chat,
    });
    console.log("Summary response:", response.text);
    return response.text || "Summary not available";
  } catch (error) {
    console.error("Error summarizing chat:", error);
    throw new Error("Failed to generate summary");
  }
};

// Bookmarks
/* export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: You must be logged in");
  }
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  // Revalidate the path to force a re-render of the page

  revalidatePath(path);
  return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error(
      "Unauthorized: You must be logged in to delete a companion."
    );
  }
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    console.error("Remove bookmark error:", error);
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  // We don't need the bookmarks data, so we return only the companions
  return data.map(({ companions }) => companions);
}; */

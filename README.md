# 🗣️ Speaked – AI-Powered Learning Companions  

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://speaked-by-arnab.vercel.app/)  
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)  
[![Supabase](https://img.shields.io/badge/Supabase-DB-3ECF8E?logo=supabase)](https://supabase.com/)  
[![Clerk](https://img.shields.io/badge/Auth-Clerk-purple?logo=clerk)](https://clerk.com/)  

Speaked is an **AI-driven LMS (Learning Management System)** where you can **create, bookmark, and interact with smart AI companions**.  
Each companion acts like a personalized tutor to guide you through **coding, economics, science**, and more — with **chat history, bookmarks, and transcripts** saved for later review.

🌐 **Live App:** [speaked-by-arnab.vercel.app](https://speaked-by-arnab.vercel.app/)

---

## ✨ Features

- 🤖 **AI Companions:** Create custom AI tutors with a specific **topic, style, and voice**.
- 🔐 **Authentication:** Secure login and user management via **Clerk**.
- 💾 **Supabase Integration:** Store **sessions, bookmarks, and transcripts** in a PostgreSQL database.
- 🌟 **User Plans:**  
  - Free users → Limited companions and session time.  
  - Pro users → Unlimited access and extended session time.
- 🎨 **Beautiful UI:** Built with **Tailwind CSS** and **shadcn/ui** components.

---

## 🖥️ Tech Stack

| Technology     | Purpose                       |
|----------------|------------------------------|
| **Next.js 15** | Frontend framework & API routes |
| **Supabase**   | Database & backend services   |
| **Clerk**      | Authentication & user management |
| **Gemini**     | AI summaries & chat processing |
| **Tailwind CSS** | Styling & responsive design |
| **Lucide Icons** | Clean, modern icons |

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Mearnab01/speaked.git
cd speaked
npm install

Create a .env.local file in the root and add:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_VAPI_WEB_TOKEN=
GEMINI_API_KEY=
```

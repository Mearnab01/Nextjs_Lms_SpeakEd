import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LayoutWrapper from "./LayoutWrapper";
import { dark } from "@clerk/themes";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpeakEd | Speak to learn. Speak to grow.",
  description:
    "SpeakEd makes learning interactive and conversational. From AI-generated quizzes to voice-activated navigation, it provides a hands-free, immersive experience. Students can discuss concepts with an AI tutor, making learning feel like a friendly chat",
  icons: {
    icon: "/icons/cap.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: "#1e293b",
            colorPrimary: "#60a5fa",
            colorText: "#f8fafc",
            colorTextSecondary: "#e2e8f0",
            colorInputBackground: "#334155",
            colorInputText: "#f8fafc",
          },
        }}
      >
        <body className={`${bricolage.variable} antialiased bg-slate-900`}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
      </ClerkProvider>
    </html>
  );
}

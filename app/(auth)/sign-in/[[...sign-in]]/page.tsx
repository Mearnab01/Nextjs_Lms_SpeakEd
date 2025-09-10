import { SignIn } from "@clerk/nextjs";
export default function SignInPage() {
  return (
    <main className="flex items-center justify-center mt-20 bg-transparent">
      <SignIn />
    </main>
  );
}

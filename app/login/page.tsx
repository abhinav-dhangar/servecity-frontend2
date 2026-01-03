import { LoginForm } from "@/components/ui/loginForm";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[url('/bg/drops.jpeg')] bg-cover bg-center bg-no-repeat">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative flex min-h-screen items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm heading="Welcome back" />
        </div>
      </div>
    </div>
  );
}

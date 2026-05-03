import LoginForm from "@/app/features/auth/components/login";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center px-6 py-20">
        <div className="w-full">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-semibold text-slate-100">
              Welcome back
            </h1>
            <p className="text-base text-slate-400">
              Sign in to manage your wholesale operations.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

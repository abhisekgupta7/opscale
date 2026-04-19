import SignupForm from "@/app/features/auth/components/signup";

export default function SignUpPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-slate-50 p-2 overflow-auto">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>
      <div className="w-full max-w-sm my-auto">
        <SignupForm />
      </div>
    </div>
  );
}

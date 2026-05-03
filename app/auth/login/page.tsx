import LoginForm from "@/app/features/auth/components/login";

export default function LoginPage() {
  return (
    <div className="min-h-full px-6 py-12">
      <div className="mx-auto w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

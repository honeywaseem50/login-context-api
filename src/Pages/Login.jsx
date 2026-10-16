 
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/dashboard" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard", { replace: true });
  }

  return (
    <AuthLayout eyebrow="WELCOME BACK">
      <h1 className="text-4xl font-bold text-[#111827]">Login</h1>
      <p className="mt-3 text-lg text-gray-500">
        Enter your details to continue.
      </p>

      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-9 space-y-6">
        <div>
          <label htmlFor="login-email" className="mb-3 block font-semibold text-gray-700">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="mb-3 block font-semibold text-gray-700">
            Password (8 digits)
          </label>
          <input
            id="login-password"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            placeholder="Enter exactly 8 digits"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            maxLength={8}
            pattern="[0-9]{8}"
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          />

          <div className="mt-3 text-right">
            <Link to="/forgot-password" className="font-semibold text-[#087d98] hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-[#087d98] px-5 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#06677e]"
        >
          Login to Dashboard →
        </button>
      </form>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <p className="font-bold text-gray-800">New to DashFlow?</p>
        <p className="mt-1 text-sm text-gray-500">Create your account to get started.</p>
        <Link
          to="/signup"
          className="mt-4 flex w-full items-center justify-center rounded-xl border-2 border-[#087d98] px-4 py-3 font-bold text-[#087d98] hover:bg-cyan-50"
        >
          Sign Up — Create Account
        </Link>
      </div>
    </AuthLayout>
  );
}

 
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/dashboard" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!/^\d{8}$/.test(password)) {
      setError("Password must contain exactly 8 digits.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = signup(name, email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard", { replace: true });
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100";

  return (
    <AuthLayout eyebrow="GET STARTED">
      <h1 className="text-4xl font-bold text-[#111827]">Sign Up</h1>
      <p className="mt-3 text-lg text-gray-500">
        Create your account to get started.
      </p>

      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
          <label htmlFor="signup-name" className="mb-2 block font-semibold text-gray-700">
            Full Name
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-2 block font-semibold text-gray-700">
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-2 block font-semibold text-gray-700">
            Password (8 digits)
          </label>
          <input
            id="signup-password"
            type="password"
            inputMode="numeric"
            autoComplete="new-password"
            placeholder="Enter exactly 8 digits"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={8}
            pattern="[0-9]{8}"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="signup-confirm" className="mb-2 block font-semibold text-gray-700">
            Confirm Password
          </label>
          <input
            id="signup-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            maxLength={8}
            required
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-[#087d98] px-5 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#06677e]"
        >
          Create Account →
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-[#087d98] hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

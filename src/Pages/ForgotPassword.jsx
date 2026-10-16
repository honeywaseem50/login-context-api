 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!/^\d{8}$/.test(password)) {
      setError("New password must contain exactly 8 digits.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = resetPassword(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100";

  return (
    <AuthLayout eyebrow="ACCOUNT RECOVERY">
      <h1 className="text-4xl font-bold text-[#111827]">Forgot Password?</h1>
      <p className="mt-3 text-lg text-gray-500">
        Enter your registered email and choose a new password.
      </p>

      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-700">
          Password changed successfully! Redirecting to login...
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="reset-email" className="mb-3 block font-semibold text-gray-700">
            Registered email address
          </label>
          <input
            id="reset-email"
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
          <label htmlFor="reset-password" className="mb-3 block font-semibold text-gray-700">
            New Password (8 digits)
          </label>
          <input
            id="reset-password"
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
          <label htmlFor="reset-confirm" className="mb-3 block font-semibold text-gray-700">
            Confirm new password
          </label>
          <input
            id="reset-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password again"
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
          Reset Password →
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link to="/login" className="font-bold text-[#087d98] hover:underline">
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}

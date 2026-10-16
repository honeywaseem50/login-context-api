 
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const validPassword = /^\d{8}$/;

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dashflow_accounts") || "[]");
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dashflow_user") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("dashflow_accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("dashflow_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("dashflow_user");
    }
  }, [user]);

  function signup(name, email, password) {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return { success: false, message: "Please enter your name." };
    }

    if (!validPassword.test(password)) {
      return {
        success: false,
        message: "Password must contain exactly 8 digits.",
      };
    }

    if (accounts.some((account) => account.email === cleanEmail)) {
      return {
        success: false,
        message: "This email is already registered. Please log in.",
      };
    }

    const account = {
      name: cleanName,
      email: cleanEmail,
      password,
    };

    setAccounts((previous) => [...previous, account]);
    setUser({ name: cleanName, email: cleanEmail });

    return { success: true };
  }

  function login(email, password) {
    if (!validPassword.test(password)) {
      return {
        success: false,
        message: "Password must contain exactly 8 digits.",
      };
    }

    const cleanEmail = email.trim().toLowerCase();
    const account = accounts.find(
      (item) => item.email === cleanEmail && item.password === password
    );

    if (!account) {
      return {
        success: false,
        message: "Incorrect email or password.",
      };
    }

    setUser({ name: account.name, email: account.email });
    return { success: true };
  }

  function resetPassword(email, newPassword) {
    if (!validPassword.test(newPassword)) {
      return {
        success: false,
        message: "New password must contain exactly 8 digits.",
      };
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!accounts.some((account) => account.email === cleanEmail)) {
      return {
        success: false,
        message: "No account found with this email.",
      };
    }

    setAccounts((previous) =>
      previous.map((account) =>
        account.email === cleanEmail
          ? { ...account, password: newPassword }
          : account
      )
    );

    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

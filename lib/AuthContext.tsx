"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Ensure we handle case where undefined might occur without env keys
    if (!auth) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
      
      // Protect admin routes
      if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        if (!currentUser) {
          router.push("/admin/login");
        }
      }
      
      // Auto-redirect from login to admin if already logged in
      if (pathname === "/admin/login" && currentUser) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [auth, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// import { supabase } from "@/lib/supabase";
// import { Session } from "@supabase/supabase-js";
// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type AuthContext = {
//   session: Session | null;
//   profile: any;
//   loading: boolean;
//   isAdmin: boolean;
// };
// export const AuthContext = createContext<AuthContext>({
//   session: null,
//   profile: null,
//   loading: true,
//   isAdmin: false,
// });

// export default function AuthProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useState<Session | null>(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setSession(session);

//       if (session) {
//         const { data } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", session.user.id)
//           .single();
//         setProfile(data || null);
//       }
//       setLoading(false);
//     };
//     fetchSession();

//     supabase.auth.onAuthStateChange((_event, session) => setSession(session)); // eslint-disable-line @typescript-eslint/no-unused-expression
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ session, loading, profile, isAdmin: profile?.group === "ADMIN" }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch session and profile on mount
  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user?.id) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setProfile(data || null);
      } else {
        setProfile(null);
      }

      setLoading(false);
    };

    fetchSessionAndProfile();

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session?.user?.id) {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          setProfile(data || null);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        isAdmin: profile?.group === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

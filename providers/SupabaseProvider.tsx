"use client";

import { Database } from "@/types_db";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

interface SupabaseProviderProps {
    children: React.ReactNode;
}
// SupabaseProvider component
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
    //this state will be used to store the supabase client instance
    const [supabaseClient] = useState(() => createBrowserClient<Database>());

    return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider >;
};

export default SupabaseProvider;
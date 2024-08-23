"use client";

import { createClient } from "@/packages/supabase/src/client/client";
import { Button } from "@/components/ui/components/button";
import { Icons } from "@/components/ui/components/icons";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export function GithubSignIn() {
  const [isLoading, setLoading] = useState(false);
  const supabase = createClient();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("return_to");

  const handleSignIn = async () => {
    setLoading(true);
    /* 
        if (isDesktopApp()) {
          const redirectTo = new URL("/api/auth/callback", window.location.origin);
    
          redirectTo.searchParams.append("provider", "github");
          redirectTo.searchParams.append("client", "desktop");
    
          await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo: redirectTo.toString(),
              queryParams: {
                client: "desktop",
              },
            },
          });
        } else { */
    const redirectTo = new URL("/api/auth/callback", window.location.origin);

    if (returnTo) {
      redirectTo.searchParams.append("return_to", returnTo);
    }

    redirectTo.searchParams.append("provider", "github");

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: redirectTo.toString(),
      },
    });
    /* } */
  };

  return (
    <Suspense>
      <Button
        onClick={handleSignIn}
        className="active:scale-[0.98] bg-primary px-6 py-4 text-secondary font-medium flex space-x-2 h-[40px] w-full"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Icons.Github />
            <span>Continue with Github</span>
          </>
        )}
      </Button>
    </Suspense>

  );
}

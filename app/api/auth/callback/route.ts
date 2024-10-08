// @ts-nocheck

import { createClient } from "@/packages/supabase/src/client/server";
import { getSession } from "@/packages/supabase/src/queries/cached-queries";

import { Cookies } from "@/utils/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { addYears } from "date-fns";
import { cookies, headers } from "next/headers";

export const preferredRegion = ["fra1", "sfo1", "iad1"];

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const client = requestUrl.searchParams.get("client");
  const returnTo = requestUrl.searchParams.get("return_to");
  const provider = requestUrl.searchParams.get("provider");
  /*   const mfaSetupVisited = cookieStore.has(Cookies.MfaSetupVisited);
   */
  if (client === "desktop") {
    return NextResponse.redirect(`${requestUrl.origin}/verify?code=${code}`);
  }

  if (provider) {
    cookieStore.set(Cookies.PreferredSignInProvider, provider, {
      expires: addYears(new Date(), 1),
    });
  }

  if (code) {
    const supabase = createClient(cookieStore);
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { session },
    } = await getSession();

    if (session) {
      const userId = session.user.id;

      /*  const analytics = await setupAnalytics({
         userId,
         fullName: session?.user?.user_metadata?.full_name,
       }); */
      /* 
            await analytics.track({
              event: LogEvents.SignIn.name,
              channel: LogEvents.SignIn.channel,
            }); */
    }
  }

  /*  if (!mfaSetupVisited) {
     cookieStore.set(Cookies.MfaSetupVisited, "true", {
       expires: addYears(new Date(), 1),
     });
 
     return NextResponse.redirect(`${requestUrl.origin}/mfa/setup`);
   } */

  if (returnTo) {
    return NextResponse.redirect(`${requestUrl.origin}/${returnTo}`);
  }

  return NextResponse.redirect(requestUrl.origin);
}

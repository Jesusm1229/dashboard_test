/* import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'


export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
} */


/* import { updateSession } from "@midday/supabase/middleware";
import { createClient } from "@midday/supabase/server"; */
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from './utils/supabase/middleware'
import { createClient } from "./packages/supabase/src/client/server";



export async function middleware(request: NextRequest) {
    const response = await updateSession(request);
    const supabase = createClient();
    const url = new URL("/", request.url);
    const nextUrl = request.nextUrl;

    const pathnameLocale = nextUrl.pathname.split("/", 2)?.[1];

    // Remove the locale from the pathname
    const pathnameWithoutLocale = nextUrl.pathname.slice(
        pathnameLocale.length + 1,
    );

    // Create a new URL without the locale in the pathname
    const newUrl = new URL(pathnameWithoutLocale || "/", request.url);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Not authenticated
    if (
        !session &&
        newUrl.pathname !== "/sign-in" &&
        !newUrl.pathname.includes("/report")
    ) {
        const encodedSearchParams = `${newUrl.pathname.substring(1)}${newUrl.search
            }`;

        const url = new URL("/sign-in", request.url);

        if (encodedSearchParams) {
            url.searchParams.append("return_to", encodedSearchParams);
        }

        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api|monitoring).*)"],
};

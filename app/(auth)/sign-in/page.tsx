import { Loader2 } from "lucide-react"
import Image from "next/image";
import { login, signup } from "./actions";



export default function Page() {

    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div
                className="flex-col items-center justify-center h-full px-4 lg:flex" >
                <div className="pt-16 space-y-4 text-center">
                    <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
                    <p className="text-base text-[#7E8CA0]">
                        Log in or Create account to get to your dashboard!
                    </p>
                </div>
                <div className="flex items-center justify-center mt-8">
                    {/*  <ClerkLoaded>
                        <SignIn path="/sign-in" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="animete-spin text-muted-foreground" />
                    </ClerkLoading> */}
                    <form>
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email" required />
                        <label htmlFor="password">Password:</label>
                        <input id="password" name="password" type="password" required />
                        <button formAction={login}>Log in</button>
                        <button formAction={signup}>Sign up</button>
                    </form>
                </div>
            </div>
            <div className="items-center justify-center hidden h-full bg-blue-700 lg:flex">
                <Image src="/logo.svg" height={100} width={100} alt="logo" />
            </div>
        </div>
    );
}
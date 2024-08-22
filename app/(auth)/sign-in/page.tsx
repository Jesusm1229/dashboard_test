import { Loader2 } from "lucide-react"
import Image from "next/image";
import { login, signup } from "./actions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/packages/ui/src/components/accordion";
import { GithubSignIn } from "@/components/github-sign-in";



export default function Page() {

    let preferredSignInOption = <GithubSignIn />;
    let moreSignInOptions = (
        <>
            {/* <OTPSignIn className="border-t-[1px] border-border pt-8" /> */}
        </>
    );

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
                    {/* <form>
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email" required />
                        <label htmlFor="password">Password:</label>
                        <input id="password" name="password" type="password" required />
                        <button formAction={login}>Log in</button>
                        <button formAction={signup}>Sign up</button>
                    </form> */}
                    <div className="flex flex-col mt-6 mb-6 pointer-events-auto">
                        {preferredSignInOption}
                        {/* <Accordion
                            type="single"
                            collapsible
                            className="border-t-[1px] pt-2 mt-6"
                        >
                            <AccordionItem value="item-1" className="border-0">
                                <AccordionTrigger className="flex justify-center space-x-2 text-sm">
                                    <span>More options</span>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    <div className="flex flex-col space-y-4">
                                        {moreSignInOptions}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion> */}
                    </div>
                </div>
            </div>
            <div className="items-center justify-center hidden h-full bg-blue-700 lg:flex">
                <Image src="/logo.svg" height={100} width={100} alt="logo" />
            </div>
        </div>
    );
}
import Image from "next/image";
import { GithubSignIn } from "@/components/github-sign-in";
import { Suspense } from "react";



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
                    <div className="flex flex-col mt-6 mb-6 pointer-events-auto">
                        <Suspense>
                            {preferredSignInOption}
                        </Suspense>
                    </div>
                </div>
            </div>
            <div className="items-center justify-center hidden h-full bg-blue-700 lg:flex">
                <Image src="/logo.svg" height={100} width={100} alt="logo" />
            </div>
        </div>

    );
}
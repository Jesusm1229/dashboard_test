import { Loader2 } from 'lucide-react'
import React from 'react'
import { HeaderLogo } from './header-logo'
import { WelcomeMsg } from './welcome-msg'
import { Navigation } from './navigation'

const Header = () => {
    return (
        <header className="px-4 py-8 bg-gradient-to-b from-blue-700 to-blue-500 lg:px-14 pb-36">
            <div className="mx-auto max-w-screen-2xl">
                <div className="flex items-center justify-between w-full mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    {/*   <ClerkLoaded>
                        <UserButton />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="size-8 animate-spin text-slate-400" />
                    </ClerkLoading> */}
                </div>
                <WelcomeMsg />
            </div>
        </header>
    )
}

export default Header
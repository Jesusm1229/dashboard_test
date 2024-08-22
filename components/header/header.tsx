import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'
import { HeaderLogo } from './header-logo'
import { WelcomeMsg } from './welcome-msg'
import { Navigation } from './navigation'
import { Skeleton } from '@/packages/ui/src/components/skeleton'
import { UserMenu } from './user-menu'

const Header = () => {
    return (
        <header className="px-4 py-8 bg-gradient-to-b from-blue-700 to-blue-500 lg:px-14 ">
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
                    <Suspense fallback={<Skeleton className="w-8 h-8 rounded-full" />}>
                        <UserMenu onlySignOut={true} />
                    </Suspense>
                </div>
            </div>
        </header>
    )
}

export default Header
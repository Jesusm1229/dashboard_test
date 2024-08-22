import Header from '@/components/header/header'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <div className="relative">
            <Header />
            <main className="mx-4  md:mx-10 pb-8">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
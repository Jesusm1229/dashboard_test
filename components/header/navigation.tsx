"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { useState } from "react";
import { Menu } from "lucide-react";


/* import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; */
import { Button } from "@/components/ui/button";
import { NavButton } from "./nav-button";

const routes = [
    {
        href: "/",
        label: "Overview",
    },
    /*     {
            href: "/transactions",
            label: "Transactions",
        },
        {
            href: "/accounts",
            label: "Accounts",
        },
        {
            href: "/categories",
            label: "Categories",
        },
        {
            href: "/settings",
            label: "Settings",
        }, */
];

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname(); //path name of the current page
    const isMobile = useMedia("(max-width: 1024px)", false);//check if the screen is mobile

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };


    return (
        <nav className="items-center hidden overflow-x-auto lg:flex gap-x-2">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                />
            ))}
        </nav>
    );
};
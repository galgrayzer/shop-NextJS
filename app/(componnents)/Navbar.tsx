"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface link {
    href: string;
    label: string;
}

interface NavbarProps {
    links: link[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
    const currentPath: string = usePathname();    
    const linkCss: string = "font-bold no-underline hover:text-slate-400"; 
    return (
        <nav className="flex justify-center p-4 bg-gray-800">
            <ul className="list-none flex gap-4">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} className={
                            currentPath === link.href ?
                                `text-lime-300 ${linkCss}` :
                                `text-white ${linkCss}`
                            }>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link href="/signin" className={
                currentPath === "/signin" ?
                    `text-lime-300 fixed left-[95vw] w-[55px] ${linkCss}` :
                    `fixed left-[95vw] w-[55px] text-white ${linkCss}`
                }>
                Sign In
            </Link>
        </nav>
    );
};

export default Navbar;

'use client'

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

export default function MainContainer({ child }: { child: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            {
                pathname !== '/sign-in' && pathname !== '/sign-up' ? <div>
                    <Navbar />
                    <main>
                        <div className='main-container'>
                            <div className="theme-toggle-container">
                                <ThemeToggle />
                            </div>
                            {child}
                        </div>
                    </main>
                </div>
                    :
                    <main>
                        <div className='auth'>
                            {child}
                        </div>
                    </main>
            }
        </>
    )
}
'use client'

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function MainContainer({ child }: { child: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            {
                pathname !== '/sign-in' && pathname !== '/sign-up' ? <div>
                    <Navbar />
                    <main>
                        <div className='main-container'>
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
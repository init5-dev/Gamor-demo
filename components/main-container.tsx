import { usePathname } from 'next/navigation'
import Navbar from '@/components/navbar'

export default function MainContainer({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

    return (
        <>
            {
                pathname !== '/sign-up' && pathname !== '/sign-in' && <div>
                    <Navbar />
                    <main>
                        <div className='main-container'>
                            {children}
                        </div>
                    </main>
                </div>
            }
        </>
    )
}
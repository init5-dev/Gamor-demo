'use client'

import Link from "next/link"
import Image from "next/image"
import styles from './styles.module.css'
import { Bars, Multiply, AngleDown, AngleUp } from "styled-icons/fa-solid"
import { useEffect, useState } from "react"
import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs";

function NavbarDesktop() {

    const { isLoaded, isSignedIn, user } = useUser();

    function dropdownMouseEnter(id: string) {

        const dropdown = document.getElementById(id)

        if (!dropdown) {
            throw Error("Error al cargar el dropdown")
        }

        dropdown.className = styles.dropdown

    }

    function dropdownMouseLeave(id: string) {

        const dropdown = document.getElementById(id)

        if (!dropdown) {
            throw Error("Error al cargar el dropdown")
        }

        dropdown.className = styles.dropdownHidden

    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.home}>
                <Link href='/'>
                    <Image src='/media/home.png' width={84} height={84} alt="" />
                </Link>
            </div>
            <div className={styles.linksContainerLeft}>
                <ul className={styles.linksList}>
                    <li className={styles.link}>
                        <Link href='/#'>Stream</Link>
                    </li>
                    <li className={styles.link}>
                        <Link href='/#'>Party</Link>
                    </li>
                    <li className={styles.link}>
                        <Link href='/#'>Premium</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.titleContainer}>
                <strong>Gamor</strong>
            </div>
            <div className={styles.linksContainerRight}>
                {
                    isLoaded && isSignedIn ? <UserButton afterSignOutUrl="/" /> :
                        <ul className={styles.linksList}>

                            <li className={styles.link}>
                                <Link href='/sign-in'>Sign In</Link>
                            </li>
                            <li className={styles.linkBtn}>
                                <Link href='/sign-up'>Create account</Link>
                            </li>
                        </ul>
                }
            </div>
        </nav>
    )
}

function AngleIcon({ down = true }) {

    return (
        down ? <AngleDown size='1em' color="black" /> : <AngleUp size='1em' color="black" />
    )
}

function NavbarMobile() {
    const [opened, setOpened] = useState(false)
    const [funcionesDown, setFuncionesDown] = useState(true)
    const [descargasDown, setDescargasDown] = useState(true)
    const { isLoaded, isSignedIn, user } = useUser();

    function toggleMenu() {
        const accordion = document.getElementById('accordion')

        if (!accordion) {
            throw Error("Error al cargar el accordion del menú movil")
        }

        if (accordion.className === styles.accordionHidden) {
            accordion.className = styles.accordion
            setOpened(true)
            return
        }

        if (accordion.className === styles.accordion) {
            accordion.className = styles.accordionHidden
            setOpened(false)
        }

    }

    function dropdownClick(id: string) {

        const dropdown = document.getElementById(id)

        if (!dropdown) {
            throw Error("Error al cargar el dropdown en menú móvil")
        }

        if (id === "descargas-dropdown") {
            setDescargasDown(!descargasDown)
        } else if (id == "funciones-dropdown") {
            setFuncionesDown(!funcionesDown)
        }

        if (dropdown.className === styles.accordionDropdownHidden) {
            dropdown.className = styles.accordionDropdown
            return
        }

        if (dropdown.className === styles.accordionDropdown) {
            dropdown.className = styles.accordionDropdownHidden
        }
    }

    return (
        <nav>
            <div className={styles.navbarMobile}>
                <div className={styles.mobileTitleContainer}>
                    <strong>Gamor</strong>
                </div>
                <div className={styles.hamburguer}>
                    <button onClick={toggleMenu}>
                        {
                            opened ? <Multiply style={{color: `var(--black)`}} size={24}  /> : <Bars size={24} style={{color: `var(--black)`}} />
                        }
                    </button>
                </div>
            </div>
            <div>
                <ul id='accordion' className={styles.accordionHidden}>
                    <li className={styles.mobileHome} onClick={toggleMenu}>
                        <Link href='/'>
                            <Image src='/media/home.png' width={64} height={64} alt="" />
                        </Link>
                    </li>
                    <li className={styles.link} onClick={toggleMenu}>
                        <Link href='/#'>Stream</Link>
                    </li>
                    <li className={styles.link} onClick={toggleMenu}>
                        <Link href='/#'>Party</Link>
                    </li>
                    <li className={styles.link} onClick={toggleMenu}>
                        <Link href='/#'>Premium</Link>
                    </li>
                    {
                        isLoaded && isSignedIn ? <li className={styles.user}><UserButton afterSignOutUrl="/" /></li>:
                            <div>
                                <li className={styles.link} onClick={toggleMenu}>
                                    <Link href='/sign-in'>Sign In</Link>
                                </li>
                                <li className={styles.linkBtn} onClick={toggleMenu}>
                                    <Link href='/sign-up'>Create account</Link>
                                </li>
                            </div>
                    }
                </ul>
            </div>

        </nav>
    )
}

export default function Navbar() {
    const [windowSize, setWindowSize] = useState([0, 0]);

    useEffect(() => {
        setWindowSize([window.innerWidth, window.innerHeight])

        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        windowSize[0] < 760 ? <NavbarMobile /> : <NavbarDesktop />
    );
}
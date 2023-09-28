import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import styles from './styles.module.css'

export default function Page() {
    return (
        <>
            <SignUp />
            <Link className={styles.link} href="/">Return to home</Link>
        </>
  )
}
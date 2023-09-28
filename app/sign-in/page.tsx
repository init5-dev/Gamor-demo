import { SignIn } from "@clerk/nextjs";
import styles from './styles.module.css'
import Link from "next/link";
 
export default function SignInPage() {
  return (
    <>
      <SignIn />
      <Link className={styles.link} href="/">Return to home</Link>
    </>
  );
}
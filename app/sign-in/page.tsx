import { SignIn } from "@clerk/nextjs";
import styles from './styles.module.css'
 
export default function Page() {
  return (
    <div className={styles.auth}>
      <SignIn />
    </div>
  );
}
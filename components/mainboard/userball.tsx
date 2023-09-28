'use client'

import { useUser } from "@clerk/nextjs";
import styles from './styles.module.css'
import { UserPlus } from "styled-icons/fa-solid";

export default function UserBall({added = false} : {added:boolean}) {
    const { isLoaded, isSignedIn, user } = useUser();

    if (user && user.username && isLoaded && isSignedIn) {
        if(added) {
            return (
                <img className={styles.userBall} src={user?.imageUrl} width={100} height={100} alt={user?.username} />
            )
        } else {
            return (
                <div className={styles.genericUserBall}>
                    <UserPlus color="white" size={16} />
                </div>
            )
        }
    } 

    return (
        <></>
    )
}
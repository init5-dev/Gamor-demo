'use client'

import { useState, useEffect } from "react";
import styles from './styles.module.css'

export default function Clock() {
    const [time, setTime] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date()
            const formatedTime = `${date.getHours()} : ${date.getMinutes()}` 
            setTime(formatedTime)
        }, 1000);

        return () => clearInterval(interval)
    }, []);

    return (
        <p className={styles.clock}>{time}</p>
    );
}

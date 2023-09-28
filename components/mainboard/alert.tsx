import styles from './styles.module.css'
import { Multiply } from 'styled-icons/fa-solid'

export default function Alert({ message, onClose }: { message: string, onClose: () => void }) {
    return (
        <div className={styles.alert}>
            <button onClick={onClose} className={styles.alertCloseBtn}>
                <Multiply size={16} color="#000" />
            </button>
            <p>{message}</p>
        </div>
    )
}
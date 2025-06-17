import styles from "./Information.module.css";

export default function Information({
    currentPlayer,
    isGameEnded,
    winner,
    isDraw,
}) {
    let message, cls;

    if (isGameEnded) {
        if (isDraw) {
            message = "Ничья!";
            cls = `${styles.information} ${styles.draw}`;
        } else {
            message = `Победил ${winner}!`;
            cls = `${styles.information} ${styles.winner}`;
        }
    } else {
        message = `Ходит ${currentPlayer}`;
        cls = `${styles.information} ${styles.currentPlayer}`;
    }

    return <h2 className={cls}>{message}</h2>;
}

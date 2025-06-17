import styles from "./Field.module.css";

export default function Field({ field, onCellClick, isGameEnded }) {
    return (
        <div className={styles.gameField}>
            {field.map((value, idx) => (
                <button
                    key={idx}
                    onClick={() => onCellClick(idx)}
                    disabled={isGameEnded || value !== null}
                    className={`${styles.gameBtn} ${
                        value === "X" ? styles.x : ""
                    } ${value === "O" ? styles.o : ""}`}
                >
                    {value}
                </button>
            ))}
        </div>
    );
}

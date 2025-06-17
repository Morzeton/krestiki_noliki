import styles from "./Game.module.css";
import Information from "./Information.jsx";
import Field from "./Field.jsx";

export default function Game({
    field,
    currentPlayer,
    isGameEnded,
    winner,
    isDraw,
    dispatch,
}) {
    const handleCellClick = (index) => {
        dispatch({ type: "MAKE_MOVE", payload: index });
    };

    const handleReset = () => {
        dispatch({ type: "RESET_GAME" });
    };

    return (
        <div className={styles.gameContainer}>
            <Information
                currentPlayer={currentPlayer}
                isGameEnded={isGameEnded}
                winner={winner}
                isDraw={isDraw}
            />
            <Field
                field={field}
                onCellClick={handleCellClick}
                isGameEnded={isGameEnded}
            />
            <button onClick={handleReset} className={styles.resetButton}>
                Играть снова
            </button>
        </div>
    );
}

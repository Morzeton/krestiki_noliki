import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field } from "./Field";
import { Information } from "./Information";
import styles from "./Game.module.css";

const GameLayout = ({ gameMessage, field, handleBtnClick, resetGame }) => (
    <div className={styles.gameContainer}>
        <Information gameMessage={gameMessage} />
        <Field field={field} onBtnClick={handleBtnClick} />
        <button className={styles.resetButton} onClick={resetGame}>
            Играть заново
        </button>
    </div>
);

GameLayout.propTypes = {
    gameMessage: PropTypes.shape({
        text: PropTypes.string.isRequired,
        status: PropTypes.oneOf(["playing", "winner", "draw"]).isRequired,
    }).isRequired,
    field: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleBtnClick: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
};

const Game = () => {
    const [currentPlayer, setCurrentPlayer] = useState("x");
    const [isGameEnded, setIsGameEnded] = useState(false);
    const [isDraw, setIsDraw] = useState(false);
    const [field, setField] = useState(["", "", "", "", "", "", "", "", ""]);

    const WIN_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Горизонтали
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Вертикали
        [0, 4, 8],
        [2, 4, 6], // Диагонали
    ];

    const checkWin = (currentField) => {
        for (let i = 0; i < WIN_PATTERNS.length; i++) {
            const [a, b, c] = WIN_PATTERNS[i];
            if (
                currentField[a] &&
                currentField[a] === currentField[b] &&
                currentField[a] === currentField[c]
            ) {
                return currentField[a];
            }
        }
        return null;
    };

    const handleBtnClick = (index) => {
        if (isGameEnded || field[index] !== "") return;

        const newField = [...field];
        newField[index] = currentPlayer;
        setField(newField);

        const winner = checkWin(newField);
        if (winner) {
            setIsGameEnded(true);
            return; 
        }

        if (!newField.includes("")) {
            setIsDraw(true);
            setIsGameEnded(true);
            return;
        }

        setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
    };

    const checkGameStatus = () => {
        if (isGameEnded && !isDraw) {
            return { text: `Победил игрок: ${currentPlayer}`, status: "winner" };
        }
        if (isDraw) {
            return { text: "Ничья!", status: "draw" };
        }
        return { text: `Ход игрока: ${currentPlayer}`, status: "playing" };
    };

    const resetGame = () => {
        if (
            window.confirm(
                "Вы уверены, что хотите закончить текущую игру и начать заново?"
            )
        ) {
            setField(["", "", "", "", "", "", "", "", ""]);
            setCurrentPlayer("x");
            setIsGameEnded(false); 
            setIsDraw(false);
        }
    };

    const gameMessage = checkGameStatus();

    return (
        <GameLayout
            gameMessage={gameMessage}
            field={field}
            handleBtnClick={handleBtnClick}
            resetGame={resetGame}
        />
    );
};

export default Game;
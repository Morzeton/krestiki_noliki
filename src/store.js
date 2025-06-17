import { createStore } from "redux";

export const initialState = {
    field: Array(9).fill(null),
    currentPlayer: "X",
    isGameEnded: false,
    winner: null,
    isDraw: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "MAKE_MOVE": {
            if (state.isGameEnded) return state;
            const idx = action.payload;
            if (state.field[idx] !== null) return state;
            const newField = [...state.field];
            newField[idx] = state.currentPlayer;
            const nextPlayer = state.currentPlayer === "X" ? "O" : "X";
            const WIN_PATTERNS = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            let winner = null;
            for (const [a, b, c] of WIN_PATTERNS) {
                if (
                    newField[a] &&
                    newField[a] === newField[b] &&
                    newField[a] === newField[c]
                ) {
                    winner = state.currentPlayer;
                    break;
                }
            }
            const isGameEnded =
                winner !== null || newField.every((cell) => cell !== null);
            const isDraw = winner === null && isGameEnded;
            return {
                field: newField,
                currentPlayer: winner ? state.currentPlayer : nextPlayer,
                isGameEnded,
                winner,
                isDraw,
            };
        }
        case "RESET_GAME": {
            return initialState;
        }
        default:
            return state;
    }
};

export const store = createStore(reducer);

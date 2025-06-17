import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Game from "./components/Game.jsx";
import { store } from "./store";

const root = createRoot(document.getElementById("root"));

const renderApp = () => {
    const state = store.getState();
    root.render(
        <StrictMode>
            <Game
                field={state.field}
                currentPlayer={state.currentPlayer}
                isGameEnded={state.isGameEnded}
                winner={state.winner}
                isDraw={state.isDraw}
                dispatch={store.dispatch}
            />
        </StrictMode>
    );
};

renderApp();
store.subscribe(renderApp);

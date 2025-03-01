import React from "react";
import PropTypes from "prop-types";
import styles from "./Information.module.css";

export const Information = ({ gameMessage }) => {
    const { text, status } = gameMessage;
    return (
        <div
            className={`${styles.information} ${
                status === "winner"
                    ? styles.winner
                    : status === "draw"
                    ? styles.draw
                    : styles.currentPlayer
            }`}
        >
            {text}
        </div>
    );
};

Information.propTypes = {
    gameMessage: PropTypes.shape({
        text: PropTypes.string.isRequired,
        status: PropTypes.oneOf(["playing", "winner", "draw"]).isRequired,
    }).isRequired,
};
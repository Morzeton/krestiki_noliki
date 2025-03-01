import React from "react";
import PropTypes from "prop-types";
import styles from "./Field.module.css";

export const FieldLayout = ({ field, onBtnClick }) => {
    return (
        <div className={styles.gameField}>
            {field.map((btn, index) => (
                <button
                    key={index}
                    className={`${styles.gameBtn} ${
                        btn === "x" ? styles.x : btn === "o" ? styles.o : ""
                    }`}
                    onClick={() => onBtnClick(index)}
                    disabled={btn !== ""}
                >
                    {btn}
                </button>
            ))}
        </div>
    );
};

FieldLayout.propTypes = {
    field: PropTypes.arrayOf(PropTypes.string).isRequired,
    onBtnClick: PropTypes.func.isRequired,
};

export const Field = ({ field, onBtnClick }) => {
    return <FieldLayout field={field} onBtnClick={onBtnClick} />;
};

Field.propTypes = {
    field: PropTypes.arrayOf(PropTypes.string).isRequired,
    onBtnClick: PropTypes.func.isRequired,
};
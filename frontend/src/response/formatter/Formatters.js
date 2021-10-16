import {TRANSFORMATION_HELMERT_CONST, TRANSFORMATION_POLYNOMIAL_CONST} from "../const";
import PolynomialFormatter from "./PolynomialFormatter";
import React from "react";

export function parametersFormatter(cell) {
    return (
        <span>
                {cell && cell[TRANSFORMATION_HELMERT_CONST] ?
                    Object.entries(cell[TRANSFORMATION_HELMERT_CONST]).map((element) => (
                        <p>
                            <strong>{element[0]}</strong>:
                            <span title={element} className="float-right"> {element[1].toFixed(6)}</span>
                        </p>)) :
                    <PolynomialFormatter cell={cell[TRANSFORMATION_POLYNOMIAL_CONST]}/>
                }
            </span>
    );
}

export function arrayFormatter(cell) {
    return (
        <span>
                {cell.length > 0 && cell.map((element) => (
                    <p title={element}>{element.toFixed(4)}</p>
                ))}
            </span>
    );
}

export function convertedPointsFormatter(cell) {
    return (
        <span>
                {cell.length > 0 && cell.map((element) => (
                    <p title={element}>{element[0]}, {element[1]}</p>
                ))}
            </span>
    );
}

export function mseFormatter(cell) {
    return (
        <>
            {cell.toFixed(8)}
        </>
    )
}
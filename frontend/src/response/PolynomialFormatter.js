import React from "react";

const PolynomialFormatter = ({cell, row}) => {

    const SQUARE = "²"
    const CUBE = "³"
    const ADD = (param) => <>{param >= 0 ? "+" + param : param}</>

    const aParams = cell["least_squared_x"].map(item => item === 0 ? 0 : item.toFixed(7));
    const bParams = cell["least_squared_y"].map(item => item === 0 ? 0 : item.toFixed(7));

    let equationX = "";
    let equationY = "";
    switch (cell.order) {
        case 1:
            equationX = (<pre>X={aParams[0]}{ADD(aParams[1])}x{ADD(aParams[2])}y</pre>)
            equationY = (<pre>Y={bParams[0]}{ADD(bParams[1])}x{ADD(bParams[2])}y</pre>)
            break;
        case 2:
            equationX = (
                <pre>X={aParams[0]}{ADD(aParams[1])}x{ADD(aParams[2])}y{ADD(aParams[3])}xy{ADD(aParams[4])}x{SQUARE}{ADD(aParams[5])}y{SQUARE}</pre>)
            equationY = (
                <pre>Y={bParams[0]}{ADD(bParams[1])}x{ADD(bParams[2])}y{ADD(bParams[3])}xy{ADD(bParams[4])}x{SQUARE}{ADD(bParams[5])}y{SQUARE}</pre>)
            break;
        case 3:
            equationX = (
                <pre>X={aParams[0]}{ADD(aParams[1])}x{ADD(aParams[2])}y{ADD(aParams[3])}xy{ADD(aParams[4])}x{SQUARE}{ADD(aParams[5])}y{SQUARE}{ADD(aParams[6])}x{CUBE}{ADD(aParams[7])}x{SQUARE}y{ADD(aParams[8])}xy{SQUARE}{ADD(aParams[9])}y{CUBE}</pre>)
            equationY = (
                <pre>Y={bParams[0]}{ADD(bParams[1])}x{ADD(bParams[2])}y{ADD(bParams[3])}xy{ADD(bParams[4])}x{SQUARE}{ADD(bParams[5])}y{SQUARE}{ADD(bParams[6])}x{CUBE}{ADD(bParams[7])}x{SQUARE}y{ADD(bParams[8])}xy{SQUARE}{ADD(bParams[9])}y{CUBE}</pre>)
            break;
        default:
            equationX = aParams
            equationX = bParams
    }

    return (
        <div className="text-monospace font-weight-lighter">
            {equationX}
            {equationY}
        </div>
    );
}

export default PolynomialFormatter;
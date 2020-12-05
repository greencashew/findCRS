import React from "react";

function HowTo() {
    return (
        <div>
            <h2>Usage:</h2>
            <ol>
                <li>Load historical map</li>
                <li>Add matching markers for both maps
                    <ol>
                        <li>Choose some characteristic point on historical map</li>
                        <li>Put coordinates of the point from historical map</li>
                        <li>Find same characteristic point on the map on right side</li>
                        <li>Choose point on the map or write it's coordinate</li>
                    </ol>
                </li>
                <li>If number of points less than 2 back to point <strong>2</strong></li>
                <li>Click <strong>Find Coordinates</strong> button</li>
            </ol>
        </div>
    )
}

export default HowTo;

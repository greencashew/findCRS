import markerIcons from "../interactive_map/MarkerIcons";
import {Image} from "react-konva";
import React from "react";

const MarkerImage = () => {

    const handlePosition = e => {
        const x = e.target.x();
        const y = e.target.y();
        console.log("POINT: x: " + x + ", y: " + y)
    }

    function createHtmlImage(imageSource) {
        let img = new window.Image();
        img.src = imageSource;
        return img;
    }

    return (
        <Image
            offset={{x: 12, y: 41}}
            width={25} height={41}
            image={createHtmlImage(markerIcons[0])}
            draggable={true}
            onDragEnd={handlePosition}
        />
    );
}

export default MarkerImage;

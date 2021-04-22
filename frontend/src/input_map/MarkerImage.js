import markerIcons from "../interactive_map/MarkerIcons";
import {Image} from "react-konva";
import React from "react";

const MarkerImage = ({idx, markers, updateMarkers, position, draggable}) => {

    const MARKER_ICON_HEIGHT = 41;
    const MARKER_ICON_WIDTH = 25;
    const MARKER_ICON_OFFSET = {x: 12, y: MARKER_ICON_HEIGHT};

    const handlePosition = e => {
        if (idx == null) {
            return;
        }
        const x = e.target.x();
        const y = e.target.y();
        console.log("POINT: x: " + x + ", y: " + y)

        let newMarkers = [...markers];
        newMarkers[idx].inputMap = [x, y]
        updateMarkers(newMarkers);
    }

    function createHtmlImage(imageSource) {
        let img = new window.Image();
        img.src = imageSource;
        return img;
    }

    return (
        <Image
            x={position[0]}
            y={position[1]}
            offset={MARKER_ICON_OFFSET}
            width={MARKER_ICON_WIDTH} height={MARKER_ICON_HEIGHT}
            image={createHtmlImage(markerIcons[idx])}
            draggable={draggable}
            onDragEnd={handlePosition}
        />
    );
}

export default MarkerImage;

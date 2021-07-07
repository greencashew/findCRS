import React, {useEffect, useRef, useState} from "react";
import {Col, FormGroup, Input, Label} from "reactstrap";
import {Image, Layer, Stage} from "react-konva";

import './inputMap.css'
import MarkerImage from "./MarkerImage";

const old_map = require('./old-map-england.jpg')

const InputMap = ({markers, updateMarkers, onEditMarker, resetCoordinates, activeTab, shiftInputMarkers}) => {

    const [image, setImage] = useState()

    const [stageX, setStageX] = useState(0);
    const [stageY, setStageY] = useState(0);
    const [stageScale, setStageScale] = useState(1);
    const [stageWidth, setStageWidth] = useState(0);
    const [stageHeight, setStageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(1600);
    const [imageHeight, setImageHeight] = useState(900);

    const stageCanvasRef = useRef(null);
    const stageCanvasParentRef = useRef(null);

    window.addEventListener('resize', updateMapSize)

    useEffect(() => {
        loadMap(old_map.default);
        updateMapSize();
        // eslint-disable-next-line
    }, []);


    function updateMapSize() {
        if (stageCanvasParentRef.current) {
            setStageHeight(stageCanvasParentRef.current.offsetHeight);
            setStageWidth(stageCanvasParentRef.current.offsetWidth);
        }
    }

    function loadMap(imageSource) {
        let img = new window.Image();
        img.src = imageSource;
        img.addEventListener("load", () => {
            setImageWidth(img.width);
            setImageHeight(img.height);
            setImage(img);
        });
    }


    const dragBoundFunc = pos => {
        return boundFunc(pos, stageScale);
    };

    const boundFunc = function (pos, scale) {
        // const x = Math.min(0, Math.max(pos.x, (stageWidth - imageWidth) - stageWidth * (1 - scale)));
        // const y = Math.min(0, Math.max(pos.y, (stageHeight - imageHeight) - stageHeight * (1 - scale)));
        const deltaWidth = stageWidth - imageWidth;
        const deltaHeight = stageHeight - imageHeight;
        const x = Math.min(0, Math.max(pos.x, deltaWidth - (pos.x * (1 - scale))));
        const y = Math.min(0, Math.max(pos.y, deltaHeight - (pos.y * (1 - scale))));
        // console.log("pos x: " + pos.x, ",pos y: " + pos.y + ",sc: " + (1 - scale) + ",width: " + deltaWidth + ",height: " + deltaHeight + ",wsc: " + deltaWidth * (1 - scale) + ",hsc: " + deltaHeight * (1 - scale) + ",x: " + x + ",y: " + y);
        // console.log("PosY: " + pos.y + ",sc: " + scale + ",height: " + deltaHeight + ",hsc: " + deltaHeight * (1 - scale) + ",y: " + y);
        return {x, y};
    }

    const handleSetPhoto = e => {
        if (e.target.files.length) {
            loadMap(URL.createObjectURL(e.target.files[0]))
        }
    };

    const handleWheel = e => {
        e.evt.preventDefault();
        const stage = stageCanvasRef.current;
        zoom(stage.getPointerPosition().x, stage.getPointerPosition().y, e.evt.deltaY);
    };

    const zoomIn = () => {
        zoom(stageWidth / 2, stageHeight / 2, -1);
    }

    const zoomOut = () => {
        zoom(stageWidth / 2, stageHeight / 2, 1);
    }

    function zoom(positionX, positionY, zoomDirection) {
        const scaleBy = 1.2;
        // const stage = e.target.getStage();
        const stage = stageCanvasRef.current;
        const oldScale = stage.scaleX();

        const newScale = zoomDirection > 0 ? oldScale / scaleBy : oldScale * scaleBy;

        if (newScale < 0.1) {
            return;
        }

        const mousePointTo = {
            x: positionX / oldScale - stage.x() / oldScale,
            y: positionY / oldScale - stage.y() / oldScale
        };

        let x = -(mousePointTo.x - positionX / newScale) * newScale;
        let y = -(mousePointTo.y - positionY / newScale) * newScale;

        const pos = boundFunc({x, y}, newScale);

        setStageScale(newScale)
        setStageX(pos.x);
        setStageY(pos.y);
    }

    function isNullMarker(marker) {
        return marker == null || marker.inputMap[0] === null || marker.inputMap[1] === null;
    }

    const changeMarkerLocationOnMapClick = (event) => {
        if (onEditMarker == null) {
            return;
        }
        const transform = event.target.parent.getAbsoluteTransform().copy();
        transform.invert();
        const pos = transform.point(event.target.getStage().getPointerPosition());

        let newMarkers = [...markers];
        newMarkers[onEditMarker].inputMap = [pos.x, pos.y]
        updateMarkers(newMarkers);
    }

    return (
        <>
            <div className="map" ref={stageCanvasParentRef}>
                <div className="map-control">
                    <span onClick={zoomIn} title="Zoom in" role="button" aria-label="Zoom in">+</span>
                    <span onClick={zoomOut} title="Zoom out" role="button" aria-label="Zoom out">−</span>
                </div>
                <Stage
                    ref={stageCanvasRef}
                    x={stageX}
                    y={stageY}
                    scaleX={stageScale}
                    scaleY={stageScale}
                    width={stageWidth}
                    height={stageHeight}
                    onWheel={handleWheel}
                >
                    <Layer draggable={true} dragBoundFunc={dragBoundFunc}>
                        <Image image={image} onClick={changeMarkerLocationOnMapClick}/>
                        {markers.map((marker, idx) => !isNullMarker(marker) &&
                            <MarkerImage key={`marker-${idx}`} idx={idx} position={marker.inputMap}
                                         draggable={onEditMarker === idx}
                                         markers={markers} updateMarkers={updateMarkers} zoom={stageScale}
                            />
                        )}
                        {shiftInputMarkers && shiftInputMarkers.map((marker, idx) =>
                            <MarkerImage key={`marker-prim-${idx}`} idx={idx} position={marker}
                                         markers={shiftInputMarkers} draggable={false} is_prim={true} zoom={stageScale}
                            />
                        )}
                    </Layer>
                </Stage>
            </div>
            {activeTab === 'inputCoordinatesTab' &&
            <Col xs={12} sm={12} md={5} className="mt-2">
                <FormGroup>
                    <Label for="upload-button">Add your map:</Label>
                    <Input type="file" id="upload-button" onChange={handleSetPhoto}/>
                </FormGroup>
            </Col>
            }
        </>
    )
}

export default InputMap;

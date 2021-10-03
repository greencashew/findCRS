import React, {useEffect, useRef, useState} from "react";
import {Col, FormGroup, Input, Label} from "reactstrap";

import L from "leaflet";
import {markerIcons, markerPrimIcons} from "../interactive_map/MarkerIcons";
import {FeatureGroup, ImageOverlay, Map, Marker} from "react-leaflet";

const old_map = require('./old-map-england.jpg')

const InputMap = ({markers, updateMarkers, onEditMarker, resetCoordinates, activeTab, shiftInputMarkers}) => {

    const [image, setImage] = useState()
    const [zoom, setZoom] = useState(10);
    const [bounds, setBounds] = useState([[0, 0], [900, 1600]])
    const stageCanvasParentRef = useRef(null);


    useEffect(() => {
        setImage(old_map.default);
        // eslint-disable-next-line
    }, []);

    const changeMarkerLocationOnMapClick = (event) => {
        if (onEditMarker == null) {
            return;
        }
        setZoom(event.target._zoom)
        let newMarkers = [...markers];
        newMarkers[onEditMarker].inputMap = [event.latlng.lat, event.latlng.lng]
        updateMarkers(newMarkers);
    }

    const updateMarkerLocation = (event) => {
        if (onEditMarker == null) {
            return;
        }
        let newMarkers = [...markers];
        const id = event.target.options.id;
        const latLng = event.target.getLatLng();
        newMarkers[id].inputMap = [latLng.lat, latLng.lng];
        updateMarkers(newMarkers);
    }

    const handleSetPhoto = e => {
        if (e.target.files.length) {
            const img = new window.Image();
            img.src = URL.createObjectURL(e.target.files[0]);
            img.onload = function () {
                setBounds([[0, 0], [img.width, img.height]])
                setImage(img.src)
            }
        }
    };

    const getLeafletIcon = (index) => new L.Icon({
        iconUrl: markerIcons[index],
        shadowUrl: 'img/markers/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const getPrimLeafletIcon = (index) => new L.Icon({
        iconUrl: markerPrimIcons[index],
        shadowUrl: 'img/markers/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    function isNullMarker(marker) {
        return marker == null || marker.inputMap[0] === null || marker.inputMap[1] === null;
    }

    const myCRS = L.extend({}, L.CRS.Simple, {
        transformation: new L.Transformation(1, 0, 1, 0)
    });


    return (
        <>
            <div className="map" ref={stageCanvasParentRef}>
                <Map crs={myCRS} minZoom={-20} bounds={bounds}
                     onClick={changeMarkerLocationOnMapClick}
                     zoom={zoom}
                >
                    <ImageOverlay
                        bounds={bounds}
                        url={image}
                    />
                    <FeatureGroup>
                        {markers.map((marker, idx) => !isNullMarker(marker) &&
                            <Marker key={`marker-${idx}`} id={idx} position={marker.inputMap}
                                    icon={getLeafletIcon(idx)} draggable={true} ondragEnd={updateMarkerLocation}/>
                        )}
                        {shiftInputMarkers && shiftInputMarkers.map((marker, idx) =>
                            <Marker key={`marker-prim-${idx}`} idx={idx} position={marker}
                                    icon={getPrimLeafletIcon(idx)}/>
                        )}
                    </FeatureGroup>
                </Map>
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

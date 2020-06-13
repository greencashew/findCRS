import React from "react";
import {Button, Col, Row} from "reactstrap";
import Coordinate from "./Coordinate"

const Coordinates = ({markers, updateMarkers, onEditMarker, setOnEditMarker}) => {

    const DEFAULT_MARKER_STRUCTURE = {
        inputMap: [null, null],
        interactiveMap: [null, null],
    };

    const handleDeletion = (index) => {
        updateMarkers(markers.filter((item, i) => i !== index))
    };

    const handleEdit = (index) => {
        setOnEditMarker(index);
    }

    const handleOnAddItem = () => {
        updateMarkers(markers.concat(DEFAULT_MARKER_STRUCTURE));
        setOnEditMarker(markers.length)
    }

    const updateInputMapMarker = (id, lat, long) => {
        let newMarkers = [...markers];
        newMarkers[id].inputMap = [lat, long];
        updateMarkers(newMarkers);
    }

    const updateInteractiveMapMarker = (id, lat, long) => {
        let newMarkers = [...markers];
        newMarkers[id].interactiveMap = [lat, long];
        updateMarkers(newMarkers);
    }

    return (
        <div>
            <Row>
                <Col xs="hidden" md={1}/>
                <Col xs={12} sm={5} md={4}>
                    <p>Your map coordinates:</p>
                </Col>
                <Col xs={12} sm={5} md={4}>
                    <p>Interactive map coordinates: (You can choose on the map or type)</p>
                </Col>
                <Col xs="hidden" md={1}/>
            </Row>
            {markers.map((marker, index) =>
                <Row key={index} className="mt-2">
                    <Col xs="hidden" md={1}/>
                    <Col xs={12} sm={5} md={4}>
                        <Coordinate id={index} latitude={marker.inputMap[0]} longitude={marker.inputMap[1]}
                                    updateMarker={updateInputMapMarker} disabled={onEditMarker !== index}/>
                    </Col>
                    <Col xs={12} sm={5} md={4}>
                        <Coordinate id={index} latitude={marker.interactiveMap[0]}
                                    longitude={marker.interactiveMap[1]}
                                    updateMarker={updateInteractiveMapMarker} disabled={onEditMarker !== index}/>
                    </Col>
                    <Col xs={12} md={2}>
                        <Button color="info" disabled={marker.isEdit}
                                onClick={() => handleEdit(index)}>Edit</Button>
                        <Button color="danger" onClick={() => handleDeletion(index)}>Delete</Button>
                    </Col>
                </Row>
            )}
            <Row>
                <Col xs={12} md={{size: 2, offset: 9}} className="mt-4">
                    <Button color="primary" size="md" onClick={handleOnAddItem}>Add one more location</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Coordinates;
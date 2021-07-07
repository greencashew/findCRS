import React from "react";
import {Button, Col, Input, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAlt, faPencilAlt, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Coordinate from "./Coordinate"
import './Coordinates.scss'

const Coordinates = ({markers, updateMarkers, onEditMarker, setOnEditMarker}) => {
    const MAX_ITEM_NUMBER_TO_ADD = 8;
    const DEFAULT_MARKER_STRUCTURE = {
        label: null,
        inputMap: [null, null],
        interactiveMap: [null, null],
    };

    const handleDeletion = (index) => {
        if (index === onEditMarker) {
            setOnEditMarker(null);
        }
        updateMarkers(markers.filter((item, i) => i !== index))
    };

    const handleEdit = (index) => {
        setOnEditMarker(index);
    }

    const handleOnAddItem = () => {
        if (markers.length < MAX_ITEM_NUMBER_TO_ADD) {
            updateMarkers(markers.concat(DEFAULT_MARKER_STRUCTURE));
            setOnEditMarker(markers.length)
        }
    }

    const updateLabel = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        let newMarkers = [...markers];
        newMarkers[id].label = value;
        updateMarkers(newMarkers);
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
        <div className="coordinates">
            <Row className="justify-content-md-center">
                <Col xs={12} sm={2} md={2}>
                    Label (optional):
                </Col>
                <Col xs={12} sm={5} md={4}>
                    <span>Raster map coordinates:</span>
                </Col>
                <Col xs={12} sm={5} md={3}>
                    <span>Interactive map coordinates:</span>
                </Col>
                <Col xs={12} sm={2} md={2}>
                    <Button color="warning" title="Recenter marker">
                        <FontAwesomeIcon icon={faArrowsAlt}/> Recenter all markers
                    </Button>
                </Col>
            </Row>
            {markers.map((marker, index) =>
                <Row key={index} className="mt-2 justify-content-md-center">
                    <Col xs={12} sm={2} md={1}>
                        <Input id={index} type="text" name="label"
                               onChange={updateLabel}
                               value={marker.label || ""}
                               disabled={onEditMarker !== index}/>
                    </Col>
                    <Col xs={12} sm={5} md={4}>
                        <Coordinate id={index} latitude={marker.inputMap[0]} longitude={marker.inputMap[1]}
                                    updateMarker={updateInputMapMarker} disabled={onEditMarker !== index}
                                    latLong={false}/>
                    </Col>
                    <Col xs={12} sm={5} md={4}>
                        <Coordinate id={index} latitude={marker.interactiveMap[0]}
                                    longitude={marker.interactiveMap[1]}
                                    updateMarker={updateInteractiveMapMarker} disabled={onEditMarker !== index}
                                    latLong={true}/>
                    </Col>
                    <Col xs={12} md={2} className="coordinates-navigation">
                        <Button color="warning" title="Recenter marker">
                            <FontAwesomeIcon icon={faArrowsAlt}/>
                        </Button>
                        <Button color="info" title="Edit" disabled={onEditMarker === index}
                                onClick={() => handleEdit(index)}>
                            <FontAwesomeIcon icon={faPencilAlt}/>
                        </Button>
                        <Button color="danger" title="Delete" disabled={markers.length <= 1}
                                onClick={() => handleDeletion(index)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </Col>
                </Row>
            )}
            <Row>
                <Col xs={12} md={{size: 2, offset: 9}} className="mt-4">
                    <Button color="primary" size="md" onClick={handleOnAddItem}
                            disabled={markers.length >= MAX_ITEM_NUMBER_TO_ADD}>
                        <FontAwesomeIcon icon={faPlus}/> Add one more location</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Coordinates;
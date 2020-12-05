import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import React from "react";
import './Coordinate.css'
import "../interactive_map/MarkerIcons"
import markerIcons from "../interactive_map/MarkerIcons";

const Coordinate = ({id, latitude, longitude, updateMarker, disabled}) => {

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const isValid = target.validity.valid

        if (name === "latitude" && isValid && ((value >= -90 && value <= 90))) {
            updateMarker(
                id,
                value,
                longitude
            )
        }

        if (name === "longitude" && isValid && ((value >= -180 && value <= 180))) {
            updateMarker(
                id,
                latitude,
                value
            )
        }
    }

    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <InputGroupText><img alt="markerIcon" className="markerIcon" src={markerIcons[id]}/></InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon addonType="prepend">
                <InputGroupText>Latitude:</InputGroupText>
            </InputGroupAddon>
            <Input type="number" step="0.0000000001" name="latitude" value={latitude || ""} placeholder="00.00"
                   onChange={handleChange} disabled={disabled}
            />
            <InputGroupAddon addonType="prepend">
                <InputGroupText>Longitude:</InputGroupText>
            </InputGroupAddon>
            <Input type="number" step="0.0000000001" name="longitude" value={longitude || ""} placeholder="00.00"
                   onChange={handleChange} disabled={disabled}/>
        </InputGroup>
    )
}

export default Coordinate;

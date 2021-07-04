import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import React from "react";
import "../interactive_map/MarkerIcons"
import {markerIcons} from "../interactive_map/MarkerIcons";

const Coordinate = ({id, latitude, longitude, updateMarker, disabled, latLong}) => {

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const isValid = target.validity.valid

        if (name === "latitude" && isValid) {
            updateMarker(
                id,
                value,
                longitude
            )
        }

        if (name === "longitude" && isValid) {
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
                <InputGroupText>{latLong ? "Latitude:" : "Pixel X:"}</InputGroupText>
            </InputGroupAddon>
            <Input type="number" step="0.0000000000000001" name="latitude" value={latitude || ""} placeholder="00.00"
                   onChange={handleChange} disabled={disabled}
            />
            <InputGroupAddon addonType="prepend">
                <InputGroupText>{latLong ? "Longitude:" : "Pixel Y:"}</InputGroupText>
            </InputGroupAddon>
            <Input type="number" step="0.0000000000000001" name="longitude" value={longitude || ""} placeholder="00.00"
                   onChange={handleChange} disabled={disabled}/>
        </InputGroup>
    )
}

export default Coordinate;

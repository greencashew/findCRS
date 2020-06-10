import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import React from "react";
import './Coordinate.css'

const latitudeRegex = "^(-?[1-8]?\\d(?:\\.\\d{1,18})?|90(?:\\.0{1,18})?)$";
const longitudeRegex = "^(-?(?:1[0-7]|[1-9])?\\d(?:\\.\\d{1,18})?|180(?:\\.0{1,18})?)$";

const Coordinate = ({id, latitude, longitude, updateMarker, disabled}) => {

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
                <InputGroupText>Latitude:</InputGroupText>
            </InputGroupAddon>
            <Input type="number" step="0.0000000001" name="latitude" value={latitude || ""} placeholder="00.00"
                   onChange={handleChange} disabled={disabled} required pattern={latitudeRegex}
            />
            <InputGroupAddon addonType="prepend">
                <InputGroupText>Longitude:</InputGroupText>
            </InputGroupAddon>
            <Input type="number" step="0.0000000001" name="longitude" value={longitude || ""} placeholder="00.00"
                   onChange={handleChange} disabled={disabled} required pattern={longitudeRegex}/>
        </InputGroup>
    )
}

export default Coordinate;

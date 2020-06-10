import {InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import React from "react";
import {AvForm, AvInput} from 'availity-reactstrap-validation';

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
        <AvForm key={id}>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Latitude:</InputGroupText>
                </InputGroupAddon>
                <AvInput name="latitude" className="is-valid" value={latitude} placeholder="00.00"
                         onChange={handleChange} disabled={disabled} required validate={{
                    pattern: {value: latitudeRegex, errorMessage: "Latitude should be between -90 to 90 degrees"}
                }}
                />
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Longitude:</InputGroupText>
                </InputGroupAddon>
                <AvInput name="longitude" className="is-valid" value={longitude} placeholder="00.00"
                         onChange={handleChange} disabled={disabled} required validate={{
                    pattern: {
                        value: longitudeRegex,
                        errorMessage: "Longitude should be between -180 to 180 degrees"
                    }
                }}/>
            </InputGroup>
        </AvForm>
    )
}

export default Coordinate;

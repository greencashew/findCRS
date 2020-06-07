import {InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import React, {PureComponent} from "react";
import {AvForm, AvInput} from 'availity-reactstrap-validation';

const latitudeRegex = "^(-?[1-8]?\\d(?:\\.\\d{1,18})?|90(?:\\.0{1,18})?)$";
const longitudeRegex = "^(-?(?:1[0-7]|[1-9])?\\d(?:\\.\\d{1,18})?|180(?:\\.0{1,18})?)$";

class Coordinate extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            latitudeValue: null,
            latitudeIsValid: false,
            longitudeValue: null,
            longitudeIsValid: false,
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const isValid = target.validity.valid

        if (name === "latitude") {
            this.changeLatitude(value, isValid);
            this.props.updateMarker(
                this.props.id,
                isValid ? value : null,
                this.state.longitudeIsValid ? this.state.latitudeValue : null
            )
        }

        if (name === "longitude") {
            this.changeLongitude(value, isValid);
            this.props.updateMarker(
                this.props.id,
                this.state.latitudeIsValid ? this.state.latitudeValue : null,
                isValid ? value : null
            )
        }
    }

    changeLatitude = (latitude, isValid) => this.setState({latitudeValue: latitude, latitudeIsValid: isValid});
    changeLongitude = (longitude, isValid) => this.setState({longitudeValue: longitude, longitudeIsValid: isValid});


    render() {
        return (
            <AvForm>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Latitude:</InputGroupText>
                    </InputGroupAddon>
                    <AvInput name="latitude" className="is-valid" value={this.state.latitude} placeholder="00.00"
                             onChange={this.handleChange} required validate={{
                        pattern: {value: latitudeRegex, errorMessage: "Latitude should be between -90 to 90 degrees"}
                    }}
                    />
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Longitude:</InputGroupText>
                    </InputGroupAddon>
                    <AvInput name="longitude" className="is-valid" value={this.state.longitude} placeholder="00.00"
                             onChange={this.handleChange} required validate={{
                        pattern: {
                            value: longitudeRegex,
                            errorMessage: "Longitude should be between -180 to 180 degrees"
                        }
                    }}/>
                </InputGroup>
            </AvForm>
        )
    }
}

export default Coordinate;

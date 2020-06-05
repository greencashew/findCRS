import {Button, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import React from "react";

const old_map = require('./old-map-england.jpg')


function inputMap() {
    return (
        <div>
            <img src={old_map} alt="old map" className="map"/>
            <br/><br/>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    For which continent is this map?
                </InputGroupAddon>
                <Input type="select">
                    <option>Any</option>
                    <option>Europe</option>
                    <option>Asia</option>
                    <option>Africa</option>
                    <option>North America</option>
                    <option>South America</option>
                    <option>Australia</option>
                </Input>
            </InputGroup>
            <h4>Choose location from map above, </h4>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>1</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Latitude:</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="00.00"/>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Longitude:</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="00.00"/>
                <Button color="success">Save</Button>
            </InputGroup>
            <InputGroup>
                <Button color="primary" size="md">Add one more location</Button>
            </InputGroup>
        </div>
    )
}

export default inputMap;

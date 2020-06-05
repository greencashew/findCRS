import {Button, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import React, {PureComponent} from "react";
import SelectContinent from "./SelectContinent"

const old_map = require('./old-map-england.jpg')


class InputMap extends PureComponent {
    render() {
        return (
            <div>
                <img src={old_map} alt="old map" className="map"/>
                <br/><br/>
                <SelectContinent setContinent={this.props.setContinent}/>
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
}

export default InputMap;

import React, {Fragment, PureComponent} from 'react';
import {Input, InputGroup, InputGroupAddon} from "reactstrap";

class SelectContinent extends PureComponent {
    state = {
        options: [
            {
                name: 'Any',
            },
            {
                name: 'Europe',
            },
            {
                name: 'Asia',
            },
            {
                name: 'Africa',
            },
            {
                name: 'North America',
            },
            {
                name: 'South America',
            },
            {
                name: 'Australia',
            },
        ],
    };

    handleChange = (event) => {
        const continentName = event.target.value;
        this.setState({name: continentName});
        this.props.setContinent(continentName);
    };

    render() {
        const {options, name} = this.state;

        return (
            <Fragment>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        For which continent is this map?
                    </InputGroupAddon>
                    <Input type="select" onChange={this.handleChange} value={name}>
                        {options.map(item => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </Input>
                </InputGroup>
            </Fragment>
        );
    }
}

export default SelectContinent;

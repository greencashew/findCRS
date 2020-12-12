import React, {Fragment} from 'react';
import {Input, InputGroup, InputGroupAddon} from "reactstrap";

const SelectContinent = (continent, setContinent) => {
    const state = {
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

    const handleChange = (event) => {
        const continentName = event.target.value;
        setContinent(continentName);
    };

    const {options} = state;

    return (
        <Fragment>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    For which continent is this map?
                </InputGroupAddon>
                <Input type="select" onChange={handleChange} value={continent}>
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

export default SelectContinent;

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
            </div>
        )
    }
}

export default InputMap;

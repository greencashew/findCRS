import React, {Component} from "react";
import {Map, Marker, TileLayer, withLeaflet} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './InteractiveMap.css'
import Search from "./LeafletGeoSearch"

class InteractiveMap extends Component {
    constructor() {
        super();
        this.state = {
            markers: [[51.505, -0.09]]
        };
    }

    addMarker = (e) => {
        console.log("Marker added " + e.latlng)
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
    }

    render() {
        const GeoSearch = withLeaflet(Search);
        return (
            <Map center={[52.5134, 13.4225]} zoom={12} onClick={this.addMarker}>
                {this.state.markers.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position}></Marker>
                )}
                <GeoSearch/>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; '
                />
            </Map>
        )
    }
}

export default InteractiveMap;
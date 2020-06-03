import React, {Component} from "react";
import {Map, TileLayer, withLeaflet} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './InteractiveMap.css'
import Search from "./LeafletGeoSearch"

class InteractiveMap extends Component {

    render() {
        const GeoSearch = withLeaflet(Search);
        {
        }
        return (
            <Map center={[45.4, -75.7]} zoom={12}>
                <GeoSearch/>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        )
    }
}

export default InteractiveMap;
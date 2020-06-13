import React from "react";
import {Map, Marker, TileLayer, withLeaflet} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './InteractiveMap.css'
import Search from "./LeafletGeoSearch"
import L from "leaflet";


const InteractiveMap = ({markers, updateMarkers}) => {

    const markerIcons = [
        "img/markers/marker-icon-2x-blue.png",
        "img/markers/marker-icon-2x-gold.png",
        "img/markers/marker-icon-2x-green.png",
        "img/markers/marker-icon-2x-red.png",
        "img/markers/marker-icon-2x-orange.png",
        "img/markers/marker-icon-2x-grey.png",
        "img/markers/marker-icon-2x-yellow.png",
        "img/markers/marker-icon-2x-violet.png",
        "img/markers/marker-icon-2x-black.png",
    ]

    const getLeafletIcon = (index) => new L.Icon({
        iconUrl: markerIcons[index],
        shadowUrl: 'img/markers/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const addMarker = (e) => {
        // console.log("Marker added " + e.latlng)
        // const {markers} = this.state
        // markers.push(e.latlng)
        // this.setState({markers})
    }

    const GeoSearch = withLeaflet(Search);

    return (
        <Map center={[52.5134, 13.4225]} zoom={12} onClick={addMarker}>
            {markers.map((position, idx) =>
                (position.interactiveMap[0] !== null && position.interactiveMap[1] !== null) &&
                <Marker key={`marker-${idx}`} position={position.interactiveMap} icon={getLeafletIcon(idx)}/>
            )}
            <GeoSearch/>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; '
            />
        </Map>
    )
}

export default InteractiveMap;
import React from "react";
import {Map, Marker, TileLayer, withLeaflet} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './InteractiveMap.css'
import Search from "./LeafletGeoSearch"
import L from "leaflet";


const InteractiveMap = ({markers, updateMarkers, onEditMarker}) => {

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

    const updateMarkerLocation = (event) => {
        let newMarkers = [...markers];
        const id = event.target.options.id;
        const latLng = event.target.getLatLng();
        newMarkers[id].interactiveMap = [latLng.lat, latLng.lng];
        updateMarkers(newMarkers);
    }

    const changeMarkerLocationOnMapClick = (event) => {
        let newMarkers = [...markers];
        newMarkers[onEditMarker].interactiveMap = [event.latlng.lat, event.latlng.lng]
        updateMarkers(newMarkers);
    }

    function isNullMarker(marker) {
        return marker == null || marker.interactiveMap[0] === null || marker.interactiveMap[1] === null;
    }

    const GeoSearch = withLeaflet(Search);
    return (
        <div>
            <Map
                center={isNullMarker(markers[onEditMarker]) ? [52.5134, 13.4225] : markers[onEditMarker].interactiveMap}
                zoom={10} onClick={changeMarkerLocationOnMapClick}>
                {markers.map((marker, idx) => !isNullMarker(marker) &&
                    <Marker key={`marker-${idx}`} id={idx} position={marker.interactiveMap} icon={getLeafletIcon(idx)}
                            draggable={true} onDragend={updateMarkerLocation}/>
                )}
                <GeoSearch/>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; '
                />
            </Map>
        </div>
    )
}

export default InteractiveMap;
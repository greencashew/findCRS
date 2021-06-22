import React, {useState} from "react";
import {Map, Marker, TileLayer, withLeaflet} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './InteractiveMap.css'
import Search from "./LeafletGeoSearch"
import L from "leaflet";
import MapScale from "./MapScale";
import {markerIcons} from "./MarkerIcons";


const InteractiveMap = ({markers, updateMarkers, onEditMarker}) => {

    const [zoom, setZoom] = useState(10);

    const getLeafletIcon = (index) => new L.Icon({
        iconUrl: markerIcons[index],
        shadowUrl: 'img/markers/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const updateMarkerLocation = (event) => {
        if (onEditMarker == null) {
            return;
        }
        let newMarkers = [...markers];
        const id = event.target.options.id;
        const latLng = event.target.getLatLng();
        newMarkers[id].interactiveMap = [latLng.wrap().lat, latLng.wrap().lng];
        updateMarkers(newMarkers);
    }

    const changeMarkerLocationOnMapClick = (event) => {
        if (onEditMarker == null) {
            return;
        }
        setZoom(event.target._zoom)
        let newMarkers = [...markers];
        newMarkers[onEditMarker].interactiveMap = [event.latlng.wrap().lat, event.latlng.wrap().lng]
        updateMarkers(newMarkers);
    }

    function isNullMarker(marker) {
        return marker == null || marker.interactiveMap[0] === null || marker.interactiveMap[1] === null;
    }

    const GeoSearch = withLeaflet(Search);

    function setDefaultPositionIfPreviousAlsoNull() {
        return onEditMarker - 1 < 0 || isNullMarker(markers[onEditMarker - 1]) ? [51.10283426063734, 17.064867493793372] : markers[onEditMarker - 1].interactiveMap;
    }

    return (
        <div>
            <Map
                center={isNullMarker(markers[onEditMarker]) ? setDefaultPositionIfPreviousAlsoNull() : markers[onEditMarker].interactiveMap}
                zoom={zoom} onClick={changeMarkerLocationOnMapClick}>
                {markers.map((marker, idx) => !isNullMarker(marker) &&
                    <Marker key={`marker-${idx}`} id={idx} position={marker.interactiveMap} icon={getLeafletIcon(idx)}
                            draggable={onEditMarker === idx} onDragend={updateMarkerLocation}/>
                )}
                <GeoSearch/>
                <MapScale/>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; '
                />
            </Map>
        </div>
    )
}

export default InteractiveMap;
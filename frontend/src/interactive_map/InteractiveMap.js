import React, {useRef, useState} from "react";
import {FeatureGroup, Map, Marker, TileLayer, withLeaflet} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './InteractiveMap.css'
import Search from "./LeafletGeoSearch"
import L from "leaflet";
import MapScale from "./MapScale";
import {markerIcons} from "./MarkerIcons";


const InteractiveMap = ({markers, updateMarkers, onEditMarker}) => {

    const interactiveMapRef = useRef(null);
    const markersRef = useRef(null);
    const [zoom, setZoom] = useState(10);
    const [center] = useState([51.10283426063734, 17.064867493793372]);

    const getLeafletIcon = (index) => new L.Icon({
        iconUrl: markerIcons[index],
        shadowUrl: 'img/markers/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const changeMarkerLocationOnMapClick = (event) => {
        if (onEditMarker == null) {
            return;
        }
        setZoom(event.target._zoom)
        let newMarkers = [...markers];
        newMarkers[onEditMarker].interactiveMap = [event.latlng.wrap().lat, event.latlng.wrap().lng]
        updateMarkers(newMarkers);
    }

    const setBoundariesForMarkers = () => {
        const map = interactiveMapRef?.current.leafletElement;
        const group = markersRef?.current.leafletElement;
        map.fitBounds(group.getBounds());
    }

    function isNullMarker(marker) {
        return marker == null || marker.interactiveMap[0] === null || marker.interactiveMap[1] === null;
    }

    const GeoSearch = withLeaflet(Search);
    return (
        <div>
            <Map
                center={center}
                zoom={zoom}
                onClick={changeMarkerLocationOnMapClick}
                ref={interactiveMapRef}
            >
                <FeatureGroup ref={markersRef}>
                    {markers.map((marker, idx) => !isNullMarker(marker) &&
                        <Marker key={`marker-${idx}`} id={idx} position={marker.interactiveMap}
                                icon={getLeafletIcon(idx)}/>
                    )}
                </FeatureGroup>
                <GeoSearch/>
                <MapScale/>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; '
                />
            </Map>

            <button onClick={setBoundariesForMarkers}>Recenter to all points</button>
        </div>
    )
}

export default InteractiveMap;
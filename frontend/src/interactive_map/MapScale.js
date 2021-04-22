import {useEffect} from "react";
import L from "leaflet";
import {useLeafletMap} from "use-leaflet";

const MapScale = ({options}) => {
    const map = useLeafletMap();

    useEffect(() => {
        L.control.scale(options).addTo(map);
    }, [map, options]);

    return null;
};

export default MapScale;
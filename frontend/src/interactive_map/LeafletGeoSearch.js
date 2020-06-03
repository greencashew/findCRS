import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import {MapControl} from "react-leaflet";

class Search extends MapControl {

    createLeafletElement(_props: Props) {
        return GeoSearchControl({
            provider: new OpenStreetMapProvider(),
            style: 'bar',
            showMarker: true,
            showPopup: true,
            autoClose: true,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: false,
            autoComplete: true,
            searchLabel: 'search'
        });
    }
}

export default Search;
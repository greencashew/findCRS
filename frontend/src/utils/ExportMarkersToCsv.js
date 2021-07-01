import React from 'react';
import {CSVDownloader} from 'react-papaparse';
import {getInputAndInteractiveMapAsArrayOfCoordinates, getInteractiveMapAsArrayOfCoordinates} from "./Coordinates";

const ExportMarkersToCsv = ({markers}) => {

    const CSV_HEADER = ["Pixel X", "Pixel Y", "Reference Lat", "Reference Lng"];
    return <div className="col-md-4 col-sm-6">
        <CSVDownloader
            type="button"
            filename={'interactive-map-input'}
            data={getInteractiveMapAsArrayOfCoordinates(markers).map(el => [el[0] + " " + el[1]])}
            bom={true}
        >
            Export interactive map inputs to CSV
        </CSVDownloader>


        <CSVDownloader
            type="button"
            filename={'coordinates-input'}
            data={[CSV_HEADER, ...getInputAndInteractiveMapAsArrayOfCoordinates(markers)]}
            bom={true}
        >
            Export inputs as CSV
        </CSVDownloader>
    </div>;
}

export default ExportMarkersToCsv;
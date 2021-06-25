import React from 'react';
import {CSVDownloader} from 'react-papaparse';
import {getInputAndInteractiveMapAsArrayOfCoordinates} from "./Coordinates";

const ExportMarkersToCsv = ({markers}) => {

    const CSV_HEADER = ["PixelX", "PixelY", "ReferenceX", "ReferenceY"];
    return <CSVDownloader
        type="button"
        filename={'interactive-map-input.csv'}
        data={[CSV_HEADER, ...getInputAndInteractiveMapAsArrayOfCoordinates(markers)]}
        bom={true}
    >
        Export inputs as CSV
    </CSVDownloader>;
}

export default ExportMarkersToCsv;
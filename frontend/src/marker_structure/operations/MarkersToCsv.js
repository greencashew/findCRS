import React, {useState} from 'react';
import {CSVDownloader, CSVReader} from 'react-papaparse';
import {getInputAndInteractiveMapAsArrayOfCoordinates} from "../CoordinateUtils";
import {NotificationManager} from "react-notifications";

const CSV_HEADER = ["Pixel X", "Pixel Y", "Reference Lat", "Reference Lng"];


const MarkersToCsv = ({markers}) => {
    return <>
        <CSVDownloader
            type="link"
            filename={'coordinates-input'}
            data={[CSV_HEADER, ...getInputAndInteractiveMapAsArrayOfCoordinates(markers)]}
            bom={true}
        >
            Export inputs as CSV
        </CSVDownloader>
    </>;
}

export default MarkersToCsv;

export const ImportMarkersFromCsv = ({markers}) => {

    const [reset, setReset] = useState(false);

    const handleOnDrop = (data) => {
        setReset(false)
        console.log(data);

        NotificationManager.success("Coordinates loaded.", 'Success');
        setReset(true)
    };

    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err);

        NotificationManager.error("Unable to load file.", 'Error');
    };

    return <>
        <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            noProgressBar
            noDrag
            isReset={reset}
            style={{
                dropArea: {
                    border: 'none',
                    borderRadius: 0,
                    padding: 0,
                    background: 'none',
                    height: 'auto',
                    width: 'auto',
                },
                dropAreaActive: {
                    borderColor: 'red',
                },
                dropFile: {
                    padding: 0,
                    background: 'none',
                    height: 'auto',
                    width: 'auto',
                },
                fileSizeInfo: {
                    display: 'none',
                },
                fileNameInfo: {
                    color: '#000',
                },
            }}
            config={{}}

        >
            Load Coordinates from csv
        </CSVReader>
    </>;
}


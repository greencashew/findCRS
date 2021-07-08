import React, {useState} from 'react';
import {CSVDownloader, CSVReader} from 'react-papaparse';
import {getMarkersAsArrayOfCoordinates} from "../CoordinateUtils";
import {NotificationManager} from "react-notifications";

const CSV_HEADER = ["Label", "PixelX", "PixelY", "ReferenceLat", "ReferenceLng"];

const MarkersToCsv = ({markers}) => {
    return <>
        <CSVDownloader
            type="link"
            filename={'coordinates-input'}
            data={[CSV_HEADER, ...getMarkersAsArrayOfCoordinates(markers)]}
            bom={true}
        >
            Export inputs as CSV
        </CSVDownloader>
    </>;
}

export default MarkersToCsv;

export const ImportMarkersFromCsv = ({updateMarkers}) => {

    const [reset, setReset] = useState(false);

    const handleOnDrop = (response) => {
        setReset(false);
        setReset(true);

        if (JSON.stringify(response[0].data) !== JSON.stringify(CSV_HEADER)) {
            NotificationManager.error("File structure is unsupported. Expected: " + CSV_HEADER, 'Unable to load coordinates.');
            return;
        }

        let newMarkers = []
        for (let i = 1; i < response.length; i++) {
            const data = response[i].data;
            const label = data[0];
            const pixelX = data[1];
            const pixelY = data[2];
            const referenceLat = data[3];
            const referenceLng = data[4];

            if (!pixelX && !pixelY && !referenceLat && !referenceLng) {
                continue;
            }

            newMarkers.push({
                label: label,
                inputMap: [pixelX, pixelY],
                interactiveMap: [referenceLat, referenceLng]
            })
        }

        updateMarkers(newMarkers);
        setReset(true);

        NotificationManager.success("Coordinates loaded.", 'Success');
    };

    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err);

        NotificationManager.error("Unable to load file." + reason, 'Error');
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
            Load Coordinates from CSV
        </CSVReader>
    </>;
}


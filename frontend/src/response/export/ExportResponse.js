import React from 'react';
import {CSVDownloader} from 'react-papaparse';
import {
    getInputMapMapAsArrayOfCoordinates,
    getInteractiveMapAsArrayOfCoordinates,
} from "../../data_structure/input/CoordinateUtils";

const CSV_HEADER = [
    "Name",
    "Epsg",
    "Mean Square Error",
    "Input Map Coordinates",
    "Interactive Map Coordinates",
    "Converted Points",
    "Pred Y",
    "Pred X",
    "Shift vector X",
    "Shift vector Y",
    "Parameters",
    "Units",
    "Area",
    "Details",
];

const ExportResponse = ({transformation, markers, transformation_name}) => {

    const reformattedData = transformation.map(el =>
        [
            el.crs.crs.name,
            el.epsg,
            el.mse,
            getInputMapMapAsArrayOfCoordinates(markers).join("\n"),
            getInteractiveMapAsArrayOfCoordinates(markers).join("\n"),
            el.crs.converted_points.join("\n"),
            el.pred_y.join("\n"),
            el.pred_x.join("\n"),
            el.shift_vector_x.join("\n"),
            el.shift_vector_y.join("\n"),
            Object.keys(el.parameters[transformation_name]).map(k => k + ": " + el.parameters[transformation_name][k]).join("\n"),
            el.crs.units,
            el.crs.crs.area,
            el.crs.crs.details,
        ]
    )

    return <>
        <CSVDownloader
            type="button"
            className={"btn-dark"}
            filename={transformation_name + '-results'}
            data={[CSV_HEADER, ...reformattedData]}
            bom={true}
        >
            Export results as CSV
        </CSVDownloader>
    </>;
}

export default ExportResponse;
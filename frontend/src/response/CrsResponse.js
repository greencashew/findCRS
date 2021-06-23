import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {ColumnToggle, CSVExport, Search} from 'react-bootstrap-table2-toolkit';
import {Badge, Input, InputGroup, InputGroupAddon} from "reactstrap";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './CrsResponse.scss'
import {getInputMapMapAsArrayOfCoordinates, sumPointsArrays, toArrayOfPoints} from "../utils/Coordinates";
import {TRANSFORMATION_HELMERT_CONST, TRANSFORMATION_POLYNOMIAL_CONST} from "../config/const";
import PolynomialFormatter from "./PolynomialFormatter";

const CrsResponse = ({response, markers, setShiftInputMarkers}) => {

    console.log(response)

    const [transformation, setTransformation] = useState(TRANSFORMATION_HELMERT_CONST);

    const changeTransformationResults = (event) => {
        setTransformation(event.target.value);
    };

    function parametersFormatter(cell, row) {
        return (
            <span>
                {cell && cell[TRANSFORMATION_HELMERT_CONST] ?
                    Object.entries(cell[TRANSFORMATION_HELMERT_CONST]).map((element) => (
                        <p>
                            <strong>{element[0]}</strong>:
                            <span title={element} className="float-right"> {element[1].toFixed(4)}</span>
                        </p>)) :
                    <PolynomialFormatter cell={cell[TRANSFORMATION_POLYNOMIAL_CONST]} row={row}/>
                }
            </span>
        );
    }

    function arrayFormatter(cell, row) {
        return (
            <span>
                {cell.length > 0 && cell.map((element) => (
                    <p title={element}>{element.toFixed(4)}</p>
                ))}
            </span>
        );
    }

    function convertedPointsFormatter(cell, row) {
        return (
            <span>
                {cell.length > 0 && cell.map((element) => (
                    <p title={element}>{element[0]}, {element[1]}</p>
                ))}
            </span>
        );
    }

    function mseFormatter(cell, row) {
        return (
            <>
                {cell.toFixed(8)}
            </>
        )
    }

    const {SearchBar} = Search;
    const {ExportCSVButton} = CSVExport;
    const {ToggleList} = ColumnToggle;

    const columns = [{
        text: 'Name',
        dataField: "crs.crs.name",
    },
        {
            text: 'EPSG',
            dataField: 'crs.crs.epsg',
            headerTitle: () => 'EPSG Geodetic Parameter Dataset',
        },
        {
            text: 'MSE',
            dataField: 'mse',
            sort: true,
            headerTitle: () => 'Mean Square Error',
            formatter: mseFormatter
        },
        {
            text: 'Converted Points',
            dataField: 'crs.converted_points',
            formatter: convertedPointsFormatter
        },
        {
            text: 'PredX',
            dataField: 'pred_x',
            hidden: true,
            formatter: arrayFormatter,
        },
        {
            text: 'PredY',
            dataField: 'pred_y',
            hidden: true,
            formatter: arrayFormatter,
        },
        {
            text: 'ShiftX',
            dataField: 'shift_vector_x',
            formatter: arrayFormatter,
        },
        {
            text: 'ShiftY',
            dataField: 'shift_vector_y',
            formatter: arrayFormatter,
        },
        {
            text: 'Parameters',
            dataField: 'parameters',
            formatter: parametersFormatter
        },
        {
            text: 'Area',
            dataField: 'crs.crs.area',
        },
        {
            text: 'Details',
            dataField: 'crs.crs.details',
            hidden: true,
        }
    ];

    const defaultSorted = [{dataField: 'mse', order: 'asc'}];
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: '#c8e6c9',
        onSelect: (row) => {
            const sumPointsArrays1 = sumPointsArrays(getInputMapMapAsArrayOfCoordinates(markers), toArrayOfPoints(
                row['shift_vector_x'], row['shift_vector_y']
            ));

            // console.log("Input: ", getInputMapMapAsArrayOfCoordinates(markers), ", shift:", toArrayOfPoints(
            //     row['shift_vector_x'], row['shift_vector_y']
            // ), ", sum: ", sumPointsArrays1)
            setShiftInputMarkers(sumPointsArrays1)
        },
    };


    return (
        <div>
            <ToolkitProvider
                keyField='epsg'
                data={response[transformation]}
                columns={columns}
                search
                exportCSV={{
                    fileName: 'calculated_crs_systems.csv',
                }}
                columnToggle
            >
                {
                    props => (
                        <div>
                            <div className="clearfix">
                                <Badge color="success" className="float-right">
                                    Processed {response[transformation].length} potential CRS</Badge>
                                <InputGroup className="float-left transformation-select">
                                    <InputGroupAddon addonType="prepend">
                                        Choose transformation:
                                    </InputGroupAddon>
                                    <Input type="select" onChange={changeTransformationResults} value={transformation}>
                                        {Object.keys(response).map(item => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Input>
                                </InputGroup>
                            </div>
                            <div className="clearfix">
                                <ToggleList {...props.columnToggleProps} className="float-left"/>
                                <ExportCSVButton className="btn btn-warning btn-md float-right" {...props.csvProps}>Export
                                    CSV</ExportCSVButton>
                                <div className="float-right">
                                    <SearchBar {...props.searchProps} />
                                </div>
                            </div>

                            <BootstrapTable
                                {...props.baseProps}
                                defaultSorted={defaultSorted}
                                hover
                                bordered
                                selectRow={selectRow}
                                classes="table-responsive table-response table-fixed"
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default CrsResponse;
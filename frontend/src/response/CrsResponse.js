import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {ColumnToggle, CSVExport, Search} from 'react-bootstrap-table2-toolkit';
import {Badge, Input, InputGroup, InputGroupAddon} from "reactstrap";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './CrsResponse.scss'

const CrsResponse = (response) => {

    const [transformation, setTransformation] = useState('helmert_four');

    const changeTransformationResults = (event) => {
        setTransformation(event.target.value);
    };

    function objectFormatter(cell, row) {
        return (
            <span>
                {Object.entries(cell).length > 0 && Object.entries(cell).map((element) => (
                    <p><strong>{element[0]}</strong>: {Array.isArray(element[1]) ?
                        element[1].map((element) => <span title={element}>{element.toFixed(6)} </span>) :
                        element[1].toFixed(4)}</p>
                ))}
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
                    <p title={element}>{element[0].toFixed(4)}, {element[1].toFixed(4)}</p>
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
        },
        {
            text: 'MSE',
            dataField: 'mse',
            sort: true,
            formatter: mseFormatter
        },
        {
            text: 'Converted Points',
            dataField: 'crs.converted_points',
            hidden: true,
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
            formatter: objectFormatter
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

    return (
        <div>
            <ToolkitProvider
                keyField='epsg'
                data={response.data[transformation]}
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
                                    Processed {response.data[transformation].length} potential CRS</Badge>
                                <InputGroup className="float-left transformation-select">
                                    <InputGroupAddon addonType="prepend">
                                        Choose transformation:
                                    </InputGroupAddon>
                                    <Input type="select" onChange={changeTransformationResults} value={transformation}>
                                        {Object.keys(response.data).map(item => (
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
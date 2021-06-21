import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {ColumnToggle, CSVExport, Search} from 'react-bootstrap-table2-toolkit';
import {Badge} from "reactstrap";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './CrsResponse.scss'


const CrsResponse = (response) => {

    function objectFormatter(cell, row) {
        return (
            <span>
                {Object.entries(cell).length > 0 && Object.entries(cell).map((element) => (
                    <p><strong>{element[0]}</strong>: {element[1].toFixed(4)}</p>
                ))}
            </span>
        );
    }

    function arrayFormatter(cell, row) {
        return (
            <span>
                {cell.length > 0 && cell.map((element) => (
                    <p>{element.toFixed(4)}</p>
                ))}
            </span>
        );
    }

    function convertedPointsFormatter(cell, row) {
        return (
            <span>
                {cell.length > 0 && cell.map((element) => (
                    <p>{element[0].toFixed(4)}, {element[1].toFixed(4)}</p>
                ))}
            </span>
        );
    }

    function mseFormatter(cell, row) {
        return (
            <>
                {cell.toFixed(4)}
            </>
        )
    }

    const {SearchBar} = Search;
    const {ExportCSVButton} = CSVExport;
    const {ToggleList} = ColumnToggle;

    const columns = [
        {
            text: 'Name',
            dataField: "crs.crs.name",
        },
        {
            text: 'EPSG',
            dataField: 'crs.crs.epsg',
        },
        {
            text: 'MSE',
            title: 'Mean Square Error',
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

    const defaultSorted = [{
        dataField: 'mse',
        order: 'asc'
    }];

    return (
        <div>
            <ToolkitProvider
                keyField='epsg'
                data={response.data}
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
                                <Badge color="success">Processed {response.data.length} potential CRS</Badge>
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
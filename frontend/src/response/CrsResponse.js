import React, {useState} from 'react'
import {useFilters, useSortBy, useTable} from "react-table";
import {Badge, Input, InputGroup, InputGroupAddon, Table} from "reactstrap";
import './CrsResponse.scss'
import {TRANSFORMATION_HELMERT_CONST} from "../config/const";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {arrayFormatter, convertedPointsFormatter, parametersFormatter} from "./Formatters";
import {DefaultColumnFilter, NumberRangeColumnFilter, SelectColumnFilter,} from "./ColumnFilters";
import {toArrayOfPoints} from "../marker_structure/CoordinateUtils";

function CrsResponse({response, setShiftInputMarkers}) {
    const [transformation, setTransformation] = useState(TRANSFORMATION_HELMERT_CONST);
    const [activeRow, setActiveRow] = useState(null)

    const changeTransformationResults = (event) => {
        setTransformation(event.target.value);
        resetSelectedRow()
    };

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const resetSelectedRow = () => {
        setActiveRow(null)
        setShiftInputMarkers(null)
    }

    const setPredictedPoints = (event, row) => {
        const index = row.index;
        const sumPointsArrays1 = toArrayOfPoints(
            response[transformation][index]['pred_x'], response[transformation][index]['pred_y']
        );
        setShiftInputMarkers(sumPointsArrays1)
        console.log(row)
        setActiveRow(index)
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: "crs.crs.name",
            },
            {
                Header: 'EPSG',
                accessor: 'crs.crs.epsg',
            },
            {
                Header: 'MSE',
                accessor: 'mse',
                disableFilters: true,
                // Cell: props => mseFormatter(props.value),
                Filter: NumberRangeColumnFilter,
            },
            {
                Header: 'Converted Points',
                accessor: 'crs.converted_points',
                disableFilters: true,
                Cell: props => convertedPointsFormatter(props.value)
            },
            {
                Header: 'PredX',
                accessor: 'pred_x',
                disableFilters: true,
                Cell: props => arrayFormatter(props.value)
            },
            {
                Header: 'PredY',
                accessor: 'pred_y',
                disableFilters: true,
                Cell: props => arrayFormatter(props.value)
            },
            {
                Header: 'ShiftX',
                accessor: 'shift_vector_x',
                disableFilters: true,
                Cell: props => arrayFormatter(props.value)
            },
            {
                Header: 'ShiftY',
                accessor: 'shift_vector_y',
                disableFilters: true,
                Cell: props => arrayFormatter(props.value)
            },
            {
                Header: 'Parameters',
                accessor: 'parameters',
                disableFilters: true,
                Cell: props => parametersFormatter(props.value)
            },
            {
                Header: 'Units [x y]',
                accessor: 'crs.units',
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
            // {
            //     Header: 'Area',
            //     accessor: 'crs.crs.area',
            // },
            // {
            //     Header: 'Details',
            //     accessor: 'crs.crs.details',
            // }
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data: response[transformation],
            defaultColumn, // Be sure to pass the defaultColumn option
            initialState: {
                // sortBy: [
                //     {
                //         id: 'mse',
                //         desc: false
                //     }
                // ],
                // filters: [
                //     {
                //         id: 'crs.units',
                //         value: 'metre metre',
                //     },
                // ],
            }
        },
        useFilters,
        useSortBy,
    )

    return (
        <div>
            <div className="clearfix">
                <Badge color="success" className="bg-success">
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
            <Table {...getTableProps()} bordered hover className="table-response">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        <th>#</th>
                        {headerGroup.headers.map(column => (
                            <th>
                                {column.render('Header')}
                                <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? <FontAwesomeIcon icon={faAngleDown}/>
                            : <FontAwesomeIcon icon={faAngleUp}/>
                        : ''}
                  </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps({onClick: (e) => setPredictedPoints(e, row)})}
                                className={row.index === activeRow ? "active" : ""}
                            >
                                <td>{i + 1}</td>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )
                    }
                )}
                </tbody>
            </Table>
        </div>
    )
}

export default CrsResponse;

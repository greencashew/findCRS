import React from "react";
import {Table} from "reactstrap";

const CrsTable = (response) => {

    console.log(response.data)
    return (
        <div>
            <h2>Most possible coordinate system:</h2>
            <Table responsive bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>EPSG</th>
                    <th>MSE</th>
                    <th>Shift X</th>
                    <th>Shift Y</th>
                    <th>Parameters</th>
                </tr>
                </thead>
                <tbody>
                {

                    response.response.crs_systems.map((element, index) => {
                        return <tr>
                            <th>{index}</th>
                            <td>{element.CRS}</td>
                            <td>{element.MSE}</td>
                            <td>{element.shift_vector_x}</td>
                            <td>{element.shift_vector_y}</td>
                            {/*<td>{element[2].map((coordinate) =>*/}
                            {/*    <p>Lat: <strong>{coordinate[0]}</strong><br/>Lon: <strong>{coordinate[1]}</strong></p>*/}
                            {/*)}</td>*/}
                            <td>{element.parameters}</td>
                        </tr>;
                    })
                }
                </tbody>
            </Table>
        </div>
    );
}

export default CrsTable;
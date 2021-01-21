import React from "react";
import {Table} from "reactstrap";

const CrsTable = (response) => {

    return (
        <div>
            <h2>Most possible coordinate system:</h2>
            <Table responsive bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>CRS Name</th>
                    <th>EPSG</th>
                    <th>Result CRS</th>
                    <th>Difference</th>
                </tr>
                </thead>
                <tbody>
                {

                    response.response.crs_systems.map((element, index) => {
                        return <tr>
                            <td>{index}</td>
                            <td>{element[0]}</td>
                            <td>{element[1]}</td>
                            <td>{element[2].map((coordinate) =>
                                <p>Lat: <strong>{coordinate[0]}</strong>, Lon: <strong>{coordinate[0]}</strong></p>
                            )}</td>
                            <td>{element[3]}</td>
                        </tr>;
                    })
                }
                </tbody>
            </Table>
        </div>
    );
}

export default CrsTable;
import React from "react";
import {Button} from "reactstrap";
import {NotificationManager} from "react-notifications";
import axios from "axios";

const Request = ({markers, setOnEditMarker, mapBounds, setResponse}) => {

    const requestForProjectionFind = (event) => {
        event.preventDefault();
        setOnEditMarker(-1);
        NotificationManager.info("Calculation started...", 'Please wait');

        axios.post(`${process.env.REACT_APP_API_URL}/api/projection`, {
            markers: markers,
            interactiveMapBounds: mapBounds
        })
            .then(res => {
                if (res.status === 200) {
                    NotificationManager.success('Result received.', 'Success!');
                    setResponse(res.data.crs_systems)
                }
            })
            .catch(err => {
                NotificationManager.error(err + " Try again.", 'Error');
            })
    }

    return (
        <Button color="success" size="md" onClick={requestForProjectionFind}>Find Coordinates</Button>
    );
}

export default Request;
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/dist/react-notifications.css';
import InteractiveMap from './interactive_map/InteractiveMap'
import InputMap from './input_map/InputMap'
import Coordinates from './coordinates/Coordinates'
import Header from "./partials/Header"
import Footer from "./partials/Footer";
import {NotificationContainer} from 'react-notifications';
import {useCookies} from 'react-cookie';
import {getCoordinatesBounds, getInteractiveMapAsArrayOfCoordinates} from "./utils/Coordinates";
import Request from "./request/Request";
import CrsResponse from "./response/CrsResponse";

const App = () => {
    const markersInitialValue = [
        {
            inputMap: [null, null],
            interactiveMap: [null, null],
        }
    ];

    const [cookies, setCookie] = useCookies(['find-coordinates']);
    const [markers, updateMarkers] = useState(markersInitialValue);
    const [mapBounds, setMapBounds] = useState(null);
    const [onEditMarker, setOnEditMarker] = useState(0);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        if (markers && markers !== markersInitialValue) {
            setMapBounds(getCoordinatesBounds(
                getInteractiveMapAsArrayOfCoordinates(markers)
                )
            )
        }
    }, [markers])


    useEffect(() => {
        if (cookies.Markers != null || cookies.Markers) {
            updateMarkers(cookies.Markers)
            setOnEditMarker(-1);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setCookie('Markers', markers, {path: '/'});
    }, [markers, setCookie]);


    const resetCoordinates = () => {
        updateMarkers(markersInitialValue);
        setCookie('Markers', null, {path: '/'});
        setOnEditMarker(0);
    }

    return (
        <div className="App">
            <Container fluid>
                <Header/>
                <Row className="mb-3">
                    <Col xs="hidden" md={1}/>
                    <Col xs={12} sm={4} md={4}>
                        <InputMap markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}
                                  resetCoordinates={resetCoordinates}/>
                    </Col>
                    <Col xs="hidden" md={1}/>
                    <Col xs={12} sm={4} md={4}>
                        <InteractiveMap markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}/>
                    </Col>
                    <Col xs="hidden" md={1}/>
                </Row>
                <Form>
                    <Coordinates markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}
                                 setOnEditMarker={setOnEditMarker}/>
                    <Row className="mt-4">
                        <Col xs="hidden" md={1}/>
                        <Col xs={6} md={2}>
                            <Button color="warning" size="md"
                                    onClick={resetCoordinates}>Reset all coordinates</Button>
                        </Col>
                        <Col xs={6} md={{size: 2, offset: 5}}>
                            <Request markers={markers}
                                     setOnEditMarker={setOnEditMarker}
                                     mapBounds={mapBounds}
                                     setResponse={setResponse}/>
                        </Col>
                    </Row>
                </Form>
                <Row className="mt-4">
                    <Col xs="hidden" md={1}/>
                    <Col xs={12} md={8}>
                        {response && <CrsResponse data={response}/>}
                    </Col>
                </Row>
                <Footer/>
            </Container>
            <NotificationContainer/>
        </div>
    );
}

export default App;

import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row, TabContent, TabPane} from 'reactstrap';
import './App.css';
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
import TabNavigation from "./partials/TabNavigation";

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
    const [activeTab, setActiveTab] = useState('inputCoordinatesTab');

    useEffect(() => {
        if (markers && markers !== markersInitialValue) {
            setMapBounds(getCoordinatesBounds(
                getInteractiveMapAsArrayOfCoordinates(markers)
                )
            )
        }
        // eslint-disable-next-line
    }, [markers])


    useEffect(() => {
        if (cookies.Markers != null || cookies.Markers) {
            updateMarkers(cookies.Markers)
            setOnEditMarker(null);
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
            <Container fluid className="justify-content-md-center">
                <Header/>
                <Row className="mb-3 justify-content-md-center">
                    <Col xs="hidden" md={1}/>
                    <Col xs={12} sm={4} md={4}>
                        <InputMap markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}
                                  resetCoordinates={resetCoordinates} activeTab={activeTab}/>
                    </Col>
                    <Col xs="hidden" md={1}/>
                    <Col xs={12} sm={4} md={4}>
                        <InteractiveMap markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}/>
                    </Col>
                    <Col xs="hidden" md={1}/>
                </Row>
                <Row className="justify-content-md-center mb-2">
                    <TabNavigation response={response} activeTab={activeTab} setActiveTab={setActiveTab}/>
                </Row>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="inputCoordinatesTab">
                        <Form>
                            <Coordinates markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}
                                         setOnEditMarker={setOnEditMarker}/>
                            <Row className="mt-4 justify-content-md-center">
                                <Col xs={6} md={2}>
                                    <Button color="warning" size="md"
                                            onClick={resetCoordinates}>Reset all coordinates</Button>
                                </Col>
                                <Col xs={6} md={{size: 2, offset: 5}}>
                                    <Request markers={markers}
                                             setOnEditMarker={setOnEditMarker}
                                             mapBounds={mapBounds}
                                             setResponse={setResponse}
                                             setActiveTab={setActiveTab}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>
                    <TabPane tabId="resultsTab">
                        <Row className="mt-4 justify-content-md-center">
                            <Col xs={12} md={9}>
                                {response && <CrsResponse data={response}/>}
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>

                <Footer/>
            </Container>
            <NotificationContainer/>
        </div>
    );
}

export default App;

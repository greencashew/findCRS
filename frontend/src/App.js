import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row, TabContent, TabPane} from 'reactstrap';
import './App.scss';
import 'react-notifications/dist/react-notifications.css';
import InteractiveMap from './interactive_map/InteractiveMap'
import InputMap from './input_map/InputMap'
import Coordinates from './coordinates/Coordinates'
import Header from "./partials/Header"
import Footer from "./partials/Footer";
import {NotificationContainer} from 'react-notifications';
import {useCookies} from 'react-cookie';
import {getCoordinatesBounds, getInteractiveMapAsArrayOfCoordinates} from "./data_structure/input/CoordinateUtils";
import Request from "./request/Request";
import CrsResponse from "./response/CrsResponse";
import TabNavigation, {INPUT_COORDINATES_TAB, RESULTS_TAB} from "./partials/TabNavigation";

const DEFAULT_MARKER_STRUCTURE_ARRAY = [
    {
        label: null,
        inputMap: [null, null],
        interactiveMap: [null, null],
    }
];

const App = () => {
    const [cookies, setCookie] = useCookies(['find-coordinates']);

    const [markers, updateMarkers] = useState(DEFAULT_MARKER_STRUCTURE_ARRAY);
    const [mapBounds, setMapBounds] = useState(null);
    const [onEditMarker, setOnEditMarker] = useState(0);
    const [onCenterMarker, setOnCenterMarker] = useState(null);
    const [response, setResponse] = useState(null);
    const [activeTab, setActiveTab] = useState(INPUT_COORDINATES_TAB);
    const [shiftInputMarkers, setShiftInputMarkers] = useState(null);

    useEffect(() => {
        if (markers && markers !== DEFAULT_MARKER_STRUCTURE_ARRAY) {
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
            setNoEditMarker();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setCookie('Markers', markers, {path: '/'});
    }, [markers, setCookie]);

    const resetCoordinates = () => {
        updateMarkers(DEFAULT_MARKER_STRUCTURE_ARRAY);
        resetShiftInputMarkers()
        resetOnEditMarker()
        resetCookies()
    }

    const resetCookies = () => {
        setCookie('Markers', null, {path: '/'});
    }

    const resetShiftInputMarkers = () => {
        setShiftInputMarkers(null)
    }

    const resetOnEditMarker = () => {
        setOnEditMarker(0);
    }

    const setNoEditMarker = () => {
        setOnEditMarker(null);
    }

    return (
        <div className="app">
            <Header markers={markers} updateMarkers={updateMarkers} response={response}/>
            <Container fluid className="justify-content-md-center main-container">
                <Row className="mb-3 justify-content-md-center">
                    <Col xs={12} sm={4} md={4}>
                        <InputMap markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}
                                  activeTab={activeTab}
                                  shiftInputMarkers={shiftInputMarkers} onCenterMarker={onCenterMarker}/>
                    </Col>
                    <Col xs="hidden" md={1}/>
                    <Col xs={12} sm={4} md={4}>
                        <InteractiveMap markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}
                                        onCenterMarker={onCenterMarker}/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-2">
                    <TabNavigation response={response} activeTab={activeTab} setActiveTab={setActiveTab}/>
                </Row>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={INPUT_COORDINATES_TAB}>
                        <Form>
                            <Coordinates markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}
                                         setOnEditMarker={setOnEditMarker} setOnCenterMarker={setOnCenterMarker}/>
                            <Row className="mt-4 justify-content-md-center">
                                <Col xs={6} md={2}>
                                    <Button color="warning" size="md"
                                            onClick={resetCoordinates}>Reset all coordinates</Button>
                                </Col>
                                <Col xs={6} md={{size: 2, offset: 5}}>
                                    <Request markers={markers}
                                             setNoEditMarker={setNoEditMarker}
                                             resetShiftInputMarkers={resetShiftInputMarkers}
                                             mapBounds={mapBounds}
                                             setResponse={setResponse}
                                             setActiveTab={setActiveTab}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>
                    <TabPane tabId={RESULTS_TAB}>
                        <Row className="mt-4 justify-content-md-center">
                            <Col xs={12} md={12}>
                                {response && <CrsResponse response={response} markers={markers}
                                                          setShiftInputMarkers={setShiftInputMarkers}/>}
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

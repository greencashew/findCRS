import React, {useState} from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import InteractiveMap from './interactive_map/InteractiveMap'
import InputMap from './input_map/InputMap'
import Coordinates from './coordinates/Coordinates'
import HowTo from './how_to/HowTo'
import axios from 'axios';

const App = () => {

    const markersInitialValue = [
        {
            inputMap: [null, null],
            interactiveMap: [null, null],
        }
    ];

    const [continent, setContinent] = useState("any");
    const [markers, updateMarkers] = useState(markersInitialValue);
    const [onEditMarker, setOnEditMarker] = useState(0);
    const [response, setResponse] = useState(null);

    const resetCoordinates = () => {
        updateMarkers(markersInitialValue)
    }
    const requestForProjectionFind = event => {
        event.preventDefault();

        axios.post(`/api/projection`, {continent: continent, markers: markers})
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setResponse(res.data)
                }
                console.log(res.data);
            })
    }

    return (
        <div className="App">
            <Container fluid>
                <Row>
                    <Col xs="hidden" md={1}/>
                    <Col xs={12} md={8}>
                        <header className="app-header">
                            <h1>Find projection for historical maps</h1>
                        </header>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs="hidden" md={1}/>
                    <Col xs={12} sm={5} md={4}>
                        <InputMap setContinent={setContinent}/>
                    </Col>
                    <Col xs={12} sm={5} md={4}>
                        <InteractiveMap markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}/>
                    </Col>
                    <Col xs={12} sm={12} md={2}>
                        <HowTo/>
                    </Col>
                </Row>
                <Coordinates markers={markers} updateMarkers={updateMarkers} onEditMarker={onEditMarker}
                             setOnEditMarker={setOnEditMarker}/>
                <Row className="mt-4">
                    <Col xs="hidden" md={1}/>
                    <Col xs={6} md={2}>
                        <Button color="warning" size="md"
                                onClick={resetCoordinates}>Reset all
                            coordinates</Button>
                    </Col>
                    <Col xs={6} md={{size: 2, offset: 5}}>
                        <Button color="success" size="md" onClick={requestForProjectionFind}>Find projection</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="hidden" md={1}/>
                    <div>Active edit: {JSON.stringify(onEditMarker)}</div>
                    <div>{JSON.stringify(markers)} </div>
                </Row>
                <Row>
                    <Col xs="hidden"/>
                    <Col>
                        <h2>Response:</h2>
                        <p>
                            {JSON.stringify(response)}
                        </p>
                    </Col>
                </Row>
                <footer className="bg-dark text-white mt-4 py-1">
                    <Col xs={12} md={{size: 2, offset: 1}}>
                        With support <a href="https://pyproj4.github.io/pyproj/stable/"
                                        className="text-left">PyProj</a>, &copy; 2020
                    </Col>
                </footer>
            </Container>
        </div>
    );
}

export default App;

import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import InteractiveMap from './interactive_map/InteractiveMap.js'

const old_map = require('./input_map/old-map-england.jpg')


function App() {
    return (
        <div className="App">
            <Container fluid>
                <Row>
                    <header className="App-header">
                        <h1>Find projection for historical maps</h1>
                    </header>
                </Row>
                <Row>
                    <Col xs={12} sm={5} md={4}>
                        <img src={old_map} alt="old map"/>
                        Add your points:
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                    </Col>
                    <Col xs={12} sm={2} md={2}>

                    </Col>
                    <Col xs={12} sm={5} md={4}>
                        <InteractiveMap/>
                    </Col>

                    <Col xs={12} sm={12} md={2}>
                        How to use:

                    </Col>
                </Row>
                <Row>
                    <footer>
                        With support <a href="https://pyproj4.github.io/pyproj/stable/"
                                        className="text-left">PyProj</a>, &copy; 2020
                    </footer>
                </Row>
            </Container>
        </div>
    );
}

export default App;

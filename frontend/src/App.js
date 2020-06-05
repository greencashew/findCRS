import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import InteractiveMap from './interactive_map/InteractiveMap'
import InputMap from './input_map/InputMap'
import HowTo from './how_to/HowTo'

class App extends Component {
    constructor() {
        super();
        this.state = {
            continent: "any",
            markers: [
                {
                    inputMapLatitude: null,
                    inputMapLongitude: null,
                    interactiveMapLatitude: null,
                    interactiveMapLongitude: null,
                    isEdit: true
                }
            ]
        };
    }

    setContinent = (continent) => {
        this.setState({
            continent: continent
        });
    }

    render() {
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
                            <InputMap setContinent={this.setContinent}/>
                    </Col>
                    <Col xs={12} sm={2} md={2}>

                    </Col>
                    <Col xs={12} sm={5} md={4}>
                        <InteractiveMap/>
                    </Col>

                    <Col xs={12} sm={12} md={2}>
                        <HowTo/>
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
}

export default App;

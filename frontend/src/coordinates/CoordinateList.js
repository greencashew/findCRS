import React, {Component} from "react";
import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Col, Container, Row} from "reactstrap";
import Coordinate from "./Coordinate"

class CoordinateList extends Component {

//     setInputMapCoordinates(i, lat, long) {
//         const updatedObj = Object.assign({}, this.state.markers[i], {inputMap: [lat, long]});
//         this.setState({
//             markers: [
//                 ...this.state.markers.slice(0, i),
//                 updatedObj,
//                 ...this.state.markers.slice(i + 1)
//             ]
//         })
//     }

    updateInputMapMarker = (id, lat, long) => {
        let markers = [...this.props.markers];
        markers[id].inputMap = [lat, long];
        this.updateMarkers(markers);
    }

    updateInteractiveMapMarker = (id, lat, long) => {
        let markers = [...this.props.markers];
        markers[id].interactiveMap = [lat, long];
        this.updateMarkers(markers);
    }

    updateMarkers = (markers) => {
        this.props.updateMarkers(markers)
    }

    render() {
        return (
        <div>
            <Row>
                <Col xs="hidden" md={1}/>
                <Col xs={12} sm={5} md={4}>
                    <p>Your map coordinates:</p>
                </Col>
                <Col xs="hidden" md={1}/>
                <Col xs={12} sm={5} md={4}>
                    <p>Interactive map coordinates: (You can choose on the map or type)</p>
                </Col>
                <Col xs="hidden" md={1}/>
            </Row>
        {this.props.markers.map((marker, index)  =>
                    <Row key={index}>
                        <Col xs="hidden" md={1}/>
                        <Col xs={12} sm={5} md={4}>
                            <Coordinate id={index} latitude={marker.inputMap[0]} longitude={marker.inputMap[1]} updateMarker={this.updateInputMapMarker}/>
                        </Col>
                        <Col xs="hidden" md={1}/>
                        <Col xs={12} sm={5} md={4}>
                            <Coordinate id={index} latitude={marker.interactiveMap[0]} longitude={marker.interactiveMap[1]} updateMarker={this.updateInteractiveMapMarker}/>
                        </Col>
                        <Col xs="hidden" md={1}/>
                    </Row>
        )}
        <Row>
            <Button color="primary" size="md">Add one more location</Button>
        </Row>
        </div>
        )
    }
}

export default CoordinateList;

import React, {Component} from "react";
import {Button, Col, Row} from "reactstrap";
import Coordinate from "./Coordinate"

const DEFAULT_MARKER_STRUCTURE = {
                    inputMap: [null, null],
                    interactiveMap: [null, null],
                    isEdit: true
                };

class CoordinateList extends Component {

  handleDeletion = index => {
    const markers = this.props.markers.filter((item, i) => i !== index);
    console.log("Markers: "+JSON.stringify(markers));
    this.updateMarkers(markers);
  };

  makeEditable(input ,index) {
      let markers = input.map((marker, i) =>
        {
            if(i === index){
                marker.isEdit = true;
            }else {
                marker.isEdit=false;
            }
            return marker;
        })
        return markers;
  }

  handleEdit = index => {
        this.updateMarkers(this.makeEditable(this.props.markers, index));
  }

  handleOnAddItem = () => {
      let markers = [...this.props.markers, DEFAULT_MARKER_STRUCTURE];
      this.updateMarkers(this.makeEditable(markers, markers.length - 1));
  }

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
                            <Coordinate id={index} latitude={marker.inputMap[0]} longitude={marker.inputMap[1]} updateMarker={this.updateInputMapMarker} disabled={!marker.isEdit}/>
                        </Col>
                        <Col xs="hidden" md={1}/>
                        <Col xs={12} sm={5} md={4}>
                            <Coordinate id={index} latitude={marker.interactiveMap[0]} longitude={marker.interactiveMap[1]} updateMarker={this.updateInteractiveMapMarker} disabled={!marker.isEdit}/>
                            <Button color="info" disabled={marker.isEdit} onClick={() => this.handleEdit(index)}>Edit</Button>
                            <Button color="danger" onClick={() => this.handleDeletion(index)}>Delete</Button>
                        </Col>
                        <Col xs="hidden" md={1}/>
                    </Row>
        )}
        <Row>
            <Button color="primary" size="md" onClick={this.handleOnAddItem}>Add one more location</Button>
        </Row>
        </div>
        )
    }
}

export default CoordinateList;

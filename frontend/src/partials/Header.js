import {Col, Row} from "reactstrap";
import React from "react";

const Header = () => {
    return (
        <Row>
            <Col xs="hidden" md={1}/>
            <Col xs={12} md={8}>
                <header className="app-header">
                    <h1>Find Coordinate System for historical maps</h1>
                </header>
            </Col>
        </Row>
    )
}

export default Header;
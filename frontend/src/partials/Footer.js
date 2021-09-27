import {Col, Row} from "reactstrap";
import React from "react";

const Footer = () => {
    return (
        <footer className="footer row bg-dark text-white mt-4 mb-0 py-1">
            <Row>
                <Col xs={6} md={{size: 8, offset: 1}}>
                    Found any bug or need some extra feature? <a
                    href="https://github.com/greencashew/findCRS/issues/new">Report issue</a>.
                </Col>
            </Row>
            <Col xs={6} md={{size: 8, offset: 1}}>
                &copy; 2021 <a href="https://greencashew.dev">Jan Górkiewicz</a>, All rights reserved.
            </Col>
            <Col xs={6} md={{size: 2, offset: 0}}>
                With
                <a href="https://pyproj4.github.io/pyproj/stable/"
                   className="text-left"> PyProj</a> library support.
            </Col>
        </footer>
    )
}

export default Footer;
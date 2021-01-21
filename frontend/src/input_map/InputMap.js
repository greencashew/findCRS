import React, {useState} from "react";
import {Col, FormGroup, Input, Label} from "reactstrap";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

import './inputMap.css'

const old_map = require('./old-map-england.jpg')

const InputMap = () => {

    const [image, setImage] = useState({preview: old_map, raw: ""})

    const handleSetPhoto = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    return (
        <div>
            <TransformWrapper
                defaultScale={1}
                defaultPositionX={200}
                defaultPositionY={100}
            >
                {({zoomIn, zoomOut}) => (
                    <React.Fragment>
                        <div className="map-control">
                            <span onClick={zoomIn} title="Zoom in" role="button" aria-label="Zoom in">+</span>
                            <span onClick={zoomOut} title="Zoom out" role="button" aria-label="Zoom out">−</span>
                        </div>

                        <TransformComponent>
                            <img src={image.preview} alt="Historical map preview" className="map"/>
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
            <Col xs={12} sm={12} md={5}>
                <FormGroup>
                    <Label for="upload-button">Add your map:</Label>
                    <Input type="file" id="upload-button" onChange={handleSetPhoto}/>
                </FormGroup>
            </Col>
        </div>
    )
}
export default InputMap;

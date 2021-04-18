import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function HowTo() {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    return (
        <div>
            <Button color="warning" size="md" onClick={toggle}>Help</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>Usage</ModalHeader>
                <ModalBody>
                    <ol>
                        <li>Load historical map</li>
                        <li>Add matching markers for both maps
                            <ol>
                                <li>Choose some characteristic point on historical map</li>
                                <li>Put coordinates of the point from historical map</li>
                                <li>Find same characteristic point on the map on right side</li>
                                <li>Choose point on the map or write it's coordinate</li>
                            </ol>
                        </li>
                        <li>If number of points less than 2 back to point <strong>2</strong></li>
                        <li>Click <strong>Find Coordinates</strong> button</li>
                    </ol>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Exit</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default HowTo;

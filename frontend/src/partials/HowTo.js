import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, NavLink} from 'reactstrap';


function HowTo() {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const closeBtn = <button className="btn-close" onClick={toggle}/>;

    return (
        <>
            <NavLink onClick={toggle}>Help</NavLink>
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
        </>
    )
}

export default HowTo;

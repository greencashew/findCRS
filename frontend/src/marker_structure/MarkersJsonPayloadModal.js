import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, NavLink} from 'reactstrap';
import {NotificationManager} from "react-notifications";


function MarkersJsonPayloadModal({markers}) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(markers, null, 2))
        NotificationManager.success("Payload copied.", 'Success');
    }

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    return (
        <>
            <NavLink onClick={toggle}>Show markers JSON payload</NavLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>Markers JSON payload</ModalHeader>
                <ModalBody>
                    <pre style={{height: 65 + "vh"}}>
                        <code>
                            {JSON.stringify(markers, null, 2)}
                        </code>
                    </pre>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={copyToClipboard}>Copy</Button>
                    <Button color="primary" onClick={toggle}>Exit</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default MarkersJsonPayloadModal;

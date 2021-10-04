import React, {useState} from 'react';
import {Button, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {NotificationManager} from "react-notifications";


function ViewDropDownItemJsonPayloadModal({title, disabled, json}) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(json, null, 2))
        NotificationManager.success("Payload copied.", 'Success');
    }

    const downloadFile = ({data, fileName, fileType}) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], {type: fileType})
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const exportToJson = e => {
        e.preventDefault()
        downloadFile({
            data: JSON.stringify(json),
            fileName: 'export.json',
            fileType: 'text/json',
        })
    }

    const closeBtn = <button className="btn-close" onClick={toggle}/>;

    return (
        <>
            <DropdownItem disabled={disabled} onClick={toggle}>Show {title}</DropdownItem>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
                <ModalBody>
                    <pre style={{height: 65 + "vh"}}>
                        <code>
                            {JSON.stringify(json, null, 2)}
                        </code>
                    </pre>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={copyToClipboard}>Copy</Button>
                    <Button color="primary" onClick={exportToJson}>Download</Button>
                    <Button color="primary" onClick={toggle}>Exit</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ViewDropDownItemJsonPayloadModal;

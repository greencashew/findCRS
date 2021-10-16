import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import React, {useState} from "react";
import HowTo from '../partials/HowTo'
import MarkersToCsv, {ImportMarkersFromCsv} from "./operations/MarkersToCsv";
import ViewDropDownItemJsonPayloadModal from "./ViewDropDownItemJsonPayloadModal";


const Header = ({markers, updateMarkers, response}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <header className="app-header bg-dark text-white">
            <Navbar className="mr-auto container-fluid" expand="sm">
                <NavbarBrand href="#" className="mr-auto"><h1>Find CRS</h1></NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Input Coordinates
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <ImportMarkersFromCsv updateMarkers={updateMarkers}/>
                                </DropdownItem>
                                <DropdownItem>
                                    <MarkersToCsv markers={markers}/>
                                </DropdownItem>
                                <ViewDropDownItemJsonPayloadModal title="Markers JSON payload" json={markers}/>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className={response == null ? "disabled" : ""}>
                                Results
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <ViewDropDownItemJsonPayloadModal title="Response JSON payload"
                                                                      json={response}/>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                <NavLink>
                    <HowTo/>
                </NavLink>
                <NavLink href="https://github.com/greencashew/findCRS">Source code <span><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24"
                    viewBox="0 0 24 24" fill="none"
                    stroke="currentcolor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                        <path
                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37.0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44.0 0020 4.77 5.07 5.07.0 0019.91 1S18.73.65 16 2.48a13.38 13.38.0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07.0 005 4.77a5.44 5.44.0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37.0 009 18.13V22"/>
                    </svg>
                    </span>
                </NavLink>
            </Navbar>
        </header>
    )
}

export default Header;
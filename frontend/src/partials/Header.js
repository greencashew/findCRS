import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    UncontrolledDropdown
} from "reactstrap";
import React, {useState} from "react";
import HowTo from './HowTo'
import MarkersToCsv, {ImportMarkersFromCsv} from "../marker_structure/operations/MarkersToCsv";


const Header = ({markers}) => {
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
                                    <ImportMarkersFromCsv markers={markers}/>
                                </DropdownItem>
                                <DropdownItem>
                                    <MarkersToCsv markers={markers}/>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <HowTo/>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
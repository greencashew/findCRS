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
import HowTo from '../how_to/HowTo'


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <header className="app-header bg-dark text-white mt-0 mb-3">
            <Navbar className="mr-auto container-fluid" expand="sm">
                <NavbarBrand href="#" className="mr-auto"><h1>Find CRS</h1></NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                File
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Load Coordinates from csv
                                </DropdownItem>
                                <DropdownItem>
                                    Export coordinates to csv
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
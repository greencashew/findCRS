import {Navbar} from "reactstrap";
import React from "react";
import HowTo from '../how_to/HowTo'


const Header = () => {
    return (
        <header className="app-header bg-dark text-white mt-0 mb-5">
            <Navbar className="mr-auto container-fluid">
                <h1>Find Coordinate System for historical maps</h1>
                <HowTo/>
            </Navbar>
        </header>
    )
}

export default Header;
import {Nav, NavItem, NavLink} from "reactstrap";
import classnames from "classnames";
import React from "react";

const INPUT_COORDINATES_TAB = 'inputCoordinatesTab';
const RESULTS_TAB = 'resultsTab';

const TabNavigation = ({response, activeTab, setActiveTab}) => {
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <Nav tabs xs={12} md={9} className="col-md-2 col-sm-4">
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === INPUT_COORDINATES_TAB})}
                    onClick={() => {
                        toggle(INPUT_COORDINATES_TAB);
                    }}
                >
                    Input Coordinates
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink disabled={response == null}
                         className={classnames({active: activeTab === RESULTS_TAB})}
                         onClick={() => {
                             toggle(RESULTS_TAB);
                         }}
                >
                    Results
                </NavLink>
            </NavItem>
        </Nav>
    )
}

export default TabNavigation;
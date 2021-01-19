import React, { useState } from 'react';
import { NavLink as NavvLink} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <NavbarBrand href={"/"}>Campus Manager</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={NavvLink} to="/campuses">Campuses</NavLink>
            </NavItem>
            <NavItem>
            <NavLink tag={NavvLink} to="/students">Students</NavLink>
            </NavItem>
          </Nav>
          <NavLink href="https://www.techtalentpipeline.nyc/">TTP</NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;

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
        <NavbarBrand href={"/TPP-BankOfReactRedux"}>Bank of React</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={NavvLink} to="/TPP-BankOfReactRedux/credits">Credits</NavLink>
            </NavItem>
            <NavItem>
            <NavLink tag={NavvLink} to="/TPP-BankOfReactRedux/debits">Debits</NavLink>
            </NavItem>
          </Nav>
          <NavLink href="https://www.techtalentpipeline.nyc/">TTP</NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;

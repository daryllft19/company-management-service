import apps from '../apps';
import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

class Main extends Component {
  render(){
    const navList = Object.keys(apps.services).map(route => {
      if ( route !== 'home' )
        return <Nav.Link href={ `/${route}` } key={ route }>{ `${route[0].toUpperCase()}${route.slice(1)}` }</Nav.Link>;
    })

    return (
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
        <Navbar.Brand href="/">NF CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            { navList }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Main

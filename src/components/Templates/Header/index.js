import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

//import './header.css';

const Header = ({ userStatus }) => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" sticky="top" className="blog-header content--centered navbar">
      <Navbar.Brand href="/">La Comète</Navbar.Brand> 
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">

      {userStatus == "<" ? (
        <Nav className="UnregisteredUserNav">
          <Nav.Link href="/connexion">connexion</Nav.Link> 
          <Nav.Link href="/inscription">inscription</Nav.Link>
        </Nav>
        ) : (              
          <div className="dropdown" id="collapsible-nav-dropdown">                      
            <NavDropdown title="Mon Compte" id="basic-nav-dropdown">
              <NavDropdown.Item href="/mon-compte">Menu</NavDropdown.Item>          
              <NavDropdown.Item href="/mon-compte/mes-annonces">Mes Annonces</NavDropdown.Item>
              <NavDropdown.Item href="/mon-compte/mes-favoris">Mes Favoris</NavDropdown.Item>
              <NavDropdown.Item href="/mon-compte/parametres">Paramètres</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/deconnexion">Déconnexion</NavDropdown.Item>
            </NavDropdown>
          </div>
        )
      }
      </Navbar.Collapse>
    </Navbar>
  );
};

/*
Header.propTypes = {
  
      userStatus: PropTypes.string.isRequired
};*/

export default Header;
import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import {Container, Row, Col } from 'react-bootstrap';

import './header.css';

const Header = ({ userStatus }) => {

  return (
    
    <Navbar collapseOnSelect expand="lg" sticky="top" className="blog-header d-flex justify-content-sm-between">
      
      <Navbar.Brand href="/">
        <img 
        src="http://localhost/REACT/lacomete/projet-LaComete//src/brand.png"
        className="img-responsive"
        height="60"
        alt="Logo La Comète"
        />
      </Navbar.Brand> 
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">    
      
      {userStatus == "<" ? (        
        <Nav className="custom-UnregisteredUserNav" className="ml-auto p-2">
          <div className="guestusernav">
            <a href="/connexion">connexion</a> 
            <a href="/inscription">inscription</a>
          </div>
        </Nav>        
        ) : (                      
          <div className="dropdown ml-auto p-2" id="collapsible-nav-dropdown">                      
            <NavDropdown className="dropdown-list" title="Mon Compte" id="basic-nav-dropdown" >
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
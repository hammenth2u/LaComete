import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Col } from 'react-bootstrap';

import Navdrop from '../Dropdown'
import './header.css';

const Header = ({ userStatus }) => {

  return (
    
    <Navbar collapseOnSelect expand="lg" sticky="top" className="blog-header d-flex justify-content-sm-between">
      
    <Col sm={10}>
      <Navbar.Brand href="/">
        <img 
        src='src/images/brand.png'
        className="img-responsive"
        height="60"
        alt="Logo La Comète"
        />
      </Navbar.Brand> 
    </Col> 
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

          <Navdrop />     
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
/**
 * IMPORTS
 */
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Col } from 'react-bootstrap';

/**
 * LOCAL IMPORTS
 */
import Navdrop from '../Dropdown'

/**
 * STYLES
 */
import './header.css';

const Header = ({ userStatus }) => {

  return (    
    <header>
      <Navbar collapseOnSelect expand="lg" sticky="top" className="blog-header d-flex justify-content-sm-between">        
        <Col sm={10}>
          <Navbar.Brand href="/">
            <img 
            src='https://i.ibb.co/3rz5BVS/brand.png'
            className="img-responsive"
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
    </header>
  );
};

export default Header;
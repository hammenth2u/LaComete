import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faSortDown } from '@fortawesome/free-solid-svg-icons';


export default class Navdrop extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter() {
    this.setState({dropdownOpen: true});
  }

  onMouseLeave() {
    this.setState({dropdownOpen: false});
  }

  render() {
    return (
      <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      
        <DropdownToggle caret style={{backgroundColor: '#002248', border: 'none'}}>
          <span className="accounticon"><FontAwesomeIcon icon={faUserAstronaut} /> Mon Compte</span>
        </DropdownToggle>
    
        <DropdownMenu className="dropmenu" >
        <DropdownItem href="/mon-compte">Menu</DropdownItem>          
        <DropdownItem href="/mon-compte/mes-annonces">Mes Annonces</DropdownItem>
        <DropdownItem href="/mon-compte/mes-favoris">Mes Favoris</DropdownItem>
        <DropdownItem href="/mon-compte/parametres">Paramètres</DropdownItem>
        <DropdownItem divider />
        <DropdownItem href="/deconnexion">Déconnexion</DropdownItem>
        </DropdownMenu>
      </Dropdown>        
    );
  }
}
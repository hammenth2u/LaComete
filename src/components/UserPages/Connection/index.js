import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

class Connection extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (evt) => {
      console.log("change : ", evt.target.value);  
      this.setState({
        [evt.target.id]: evt.target.value
      })
  }

  handleSubmit = (evt) => {
      
      evt.preventDefault();
      console.log("submit : ", this.state);
  }

  render() {
    return (
      <div className="connection">
        <h1>Connexion</h1>

        <form onSubmit={this.handleSubmit} >

          <input type="email" id="email" onChange={this.handleChange} />
          <input type="password" id="password" onChange={this.handleChange} />
          <input type="submit" value="décollage" />

        </form>
      </div>
    );
  };
}

/*
Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};
*/
export default Connection;
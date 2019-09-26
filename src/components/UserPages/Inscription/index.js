import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

class SignUp extends React.Component {

  state = {
    firstname: '',
    lastname: '',
    username: '',
    birthdate: '18.02.1980',
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
      <div className="signup">
        <h1>Connexion</h1>

        <form onSubmit={this.handleSubmit} >
          
          <input type="text" id="firstname" onChange={this.handleChange} />
          <input type="text" id="lastname" onChange={this.handleChange} />
          <input type="text" id="username" onChange={this.handleChange} />
          
          <input type="email" id="email" onChange={this.handleChange} />
          <input type="password" id="password" onChange={this.handleChange} />
          
          <input type="submit" value="commencer à rêver" />

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

export default SignUp;
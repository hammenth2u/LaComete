import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withFormik } from 'formik';
import * as Yup from 'yup';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Contact = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    userStatus,
    userMail
  } = props;

  const autoFill = userMail;

  return(
    <div>
    <form className="p-5" onSubmit={handleSubmit}>
      <h1>Formulaire de contact</h1>
      
      {userStatus == "<" ? (
      <div className="form-group">
        <label>Email</label>
        <input name="email" type="text" 
          className={`form-control ${errors.email && touched.email && 'is-invalid'}`}
          value={values.email} 
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
      </div> 
      ) : (

        <div className="form-group">
        <label>Email</label>
        <input name="email" type="text" 
          className={`form-control ${errors.email && touched.email && 'is-invalid'}`}
          value= {autoFill}
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
      </div> 
      )
    }
      <div className="form-group">
        <label>Sujet</label>
        <input name="object" type="text" 
          className={`form-control ${errors.object && touched.object && 'is-invalid'}`}
          value={values.object} 
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.object && touched.object && <div className="invalid-feedback">{errors.object}</div>}
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea name="message" type="text" 
          className={`form-control ${errors.message && touched.message && 'is-invalid'}`}
          value={values.message} 
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.message && touched.message && <div className="invalid-feedback">{errors.message}</div>}
      </div>

      <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
        {isSubmitting ? 'patienter' : 'envoyer'}
      </button>
    </form>

    <h2>Coordonnées</h2>
        <ul>
          <li>0102030405</li>
          <li>lacomete@oclock.io</li>
          <li>La Comète - 2ème étoile à droite puis tout droit jusqu'au matin</li>
        </ul>
    </div>
  );
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

export default withFormik({
  mapPropsToValues: (props) => { 
    return {
    email: '',
    object: '',
    message: '',
    }
  },

  validationSchema: Yup.object().shape({
    
    email: Yup.string().email('Veuillez rentrer une adresse email valide').required('Veuillez compléter ce champ'),
    object: Yup.string().required('Veuillez compléter ce champ'),
    message: Yup.string().required('Veuillez compléter ce champ'),
  }),

  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      
      axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/contact/post', {
        email: values.email,
        object: values.object,
        message: values.message
      })
      .then(function (response) {
        alert("Message Envoyé");
        console.log('TEST POST : ', response);
        console.log(values.email);
        console.log(values.object);
        console.log(values.message);
      })
      .catch(function (error) {
        alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou choisir un autre moyen de contact");
        console.log('ERROR POST : ', error);
      });
      setSubmitting(false);
      resetForm();
    }, 1000);
  },
})(Contact);
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import './styles.css';

const Contact = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  
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

  return(
    <div>
    <form className="contact-form" onSubmit={handleSubmit}>
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
          value= {userMail}
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

      <button type="submit" className="btn-contact" disabled={isSubmitting}>
        {isSubmitting ? 'patienter' : 'envoyer'}
      </button>
    </form>

      <div className="comet-contact">
        <h2>Coordonnées</h2>
        <ul>
          <li>0836656565</li>
          <li>lacomete@oclock.io</li>
          <li>La Comète</li>
          <li>2ème étoile à droite </li>
          <li>tout droit jusqu'au matin</li>
        </ul>
      </div>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: (props) => { 
    return {
    email: '',
    object: '',
    message: '',
    }
  },

  validationSchema: Yup.object().shape({
    
    email: Yup.string().email('Veuillez rentrer une adresse email valide'),
    object: Yup.string().required('Veuillez compléter ce champ'),
    message: Yup.string().required('Veuillez compléter ce champ'),
  }),

  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {

      //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/contact/post', {
      axios.post('/api/contact/post', {
        email: values.email,
        object: values.object,
        message: values.message
      })
      .then(function (response) {
        alert("Message Envoyé");
        
      })
      .catch(function (error) {
        alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou choisir un autre moyen de contact");
        
      });
      setSubmitting(false);
      resetForm();
    }, 1000);
  },
})(Contact);
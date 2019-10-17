import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import history from '../../History';
import './styles.css';

const Forgotten = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    userMail
  } = props;

  return(
    <div className="forgotten">
      <form className="forgotten-psw" onSubmit={handleSubmit}>
        <h1>Mot de passe oublié ?</h1>
        
        <div className="form-group">
          <label>Veuillez renseigner votre adresse e-mail</label>
          <input name="email" type="text" 
            className={`form-control ${errors.email && touched.email && 'is-invalid'}`}
            value= {values.email}
            onChange={handleChange}
            onBlur={handleBlur} />
          {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
        </div> 
        
      <label>En cliquant ici, vous recevrez un mail contenant un mot de passe provisoire avec lequel vous connecter. Vous pourrez ensuite le modifier dans vos paramètres.</label>
        <button type="submit" className="btn-forgotten" disabled={isSubmitting}>
          {isSubmitting ? 'patienter' : 'envoyer'}
        </button>
      </form>
    </div>
  );
}



export default withFormik({
  mapPropsToValues: (props) => { 
    return {
    email: '',
    }
  },

  validationSchema: Yup.object().shape({
    
    email: Yup.string().email('Veuillez rentrer l\'adresse mail actuellement enregistrée dans votre compte utilisateur')/*.test(email, 'Veuillez rentrer l\'adresse mail actuellement enregistrée dans votre compte utilisateur', value => value === currentMail)*/.required('Veuillez compléter ce champ'),
  }),

  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      
      //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/password/new', {
      axios.post('/api/password/new', {
        email: values.email,
      })
      .then(function (response) {
        alert("Vous devriez recevoir un email rapidement");                
      })
      .catch(function (error) {
        alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou nous contacter");        
      });
      setSubmitting(false);
      resetForm();
    }, 1000);
    history.push("/")
  },
})(Forgotten);
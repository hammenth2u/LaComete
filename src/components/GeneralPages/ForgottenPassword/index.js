import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withFormik } from 'formik';
import * as Yup from 'yup';

//import './styles.sass';

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
    <form className="p-5" onSubmit={handleSubmit}>
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
      
    <label>En cliquand ici, vous recevrez un mail contenant un mot de passe provisoire avec lequel vous connecter. Vous pourrez ensuite le modifier dans vos paramètres</label>
      <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
        {isSubmitting ? 'patienter' : 'envoyer'}
      </button>
    </form>
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
    }
  },

  validationSchema: Yup.object().shape({
    
    email: Yup.string().email('Veuillez rentrer l\'adresse mail actuellement enregistrée dans votre compte utilisateur')/*.test(email, 'Veuillez rentrer l\'adresse mail actuellement enregistrée dans votre compte utilisateur', value => value === currentMail)*/.required('Veuillez compléter ce champ'),
  }),

  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      
      axios.post('/api/password/new', {
        email: values.email,
      })
      .then(function (response) {
        alert("Vous devriez recevoir un email rapidement");
        console.log('TEST FORGOTTEN : ', response);
        console.log(values.email);
      })
      .catch(function (error) {
        alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou choisir un autre moyen de contact");
        console.log('ERROR FORGOTTEN : ', error);
      });
      setSubmitting(false);
      resetForm();
    }, 1000);
  },
})(Forgotten);
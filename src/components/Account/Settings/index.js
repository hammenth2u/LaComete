import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

//import './styles.sass';

const Settings = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    userInfo
  } = props;

  const updateUserForm = userInfo.map(info =>
      
      <form className="settings-form" onSubmit={handleSubmit} key={info.id}>
      <h2>Modifier vos informations</h2>

      <div className="form-group">
        <label>Prénom</label>
        <input
          name="firstname"
          type="text"
          className={`form-control ${errors.firstname &&
            touched.firstname &&
            "is-invalid"}`}          
          placeholder={info.firstname}
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.firstname && touched.firstname && (<div className="invalid-feedback">{errors.firstname}</div>)}
      </div>

      <div className="form-group">
        <label>Nom de famille</label>
        <input
          name="lastname"
          type="text"
          className={`form-control ${errors.lastname &&
            touched.lastname &&
            "is-invalid"}`}
          placeholder={info.lastname}
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.lastname && touched.lastname && (<div className="invalid-feedback">{errors.lastname}</div>)}
      </div>

      <div className="form-group">
        <label>Nom d'utilisateur</label>
        <input
          name="username"
          type="text"
          className={`form-control ${errors.username &&
            touched.username &&
            "is-invalid"}`}
          placeholder={info.username}
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.username && touched.username && (<div className="invalid-feedback">{errors.username}</div>)}
      </div>

      <div className="form-group">
        <label>Adresse email</label>
        <input
          name="email"
          type="text"
          className={`form-control ${errors.email &&
            touched.email &&
            "is-invalid"}`}
          placeholder={info.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (<div className="invalid-feedback">{errors.email}</div>)}
      </div>

      <div className="form-group">
        <label>Nouveau mot de passe</label>
        <input
          name="newpassword"
          type="password"
          className={`form-control ${errors.newpassword &&
            touched.newpassword &&
            "is-invalid"}`}
          value={values.newpassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.newpassword && touched.newpassword && (<div className="invalid-feedback">{errors.newpassword}</div>)}
      </div>

      <div className="form-group">
        <label>Confirmation du nouveau mot de passe</label>
        <input
          name="passwordconfirm"
          type="password"
          className={`form-control ${errors.passwordconfirm &&
            touched.passwordconfirm &&
            "is-invalid"}`}
          value={values.passwordconfirm}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.passwordconfirm && touched.passwordconfirm && (<div className="invalid-feedback">{errors.passwordconfirm}</div>)}
      </div>

      <div className="form-group">
        <label>Mot de passe actuel</label>
        <input
          name="currentpassword"
          type="password"
          className={`form-control ${errors.currentpassword &&
            touched.currentpassword &&
            "is-invalid"}`}
          value={values.currentpassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.currentpassword && touched.currentpassword && (<div className="invalid-feedback">{errors.currentpassword}</div>)}
      </div>

      <button type="submit" className="account-btn" disabled={isSubmitting}>
        {isSubmitting ? <span className="btn-span"><FontAwesomeIcon icon={faHourglassHalf} /></span> : <span className="btn-span"><FontAwesomeIcon icon={faRocket} /></span>}
      </button>
      
    </form>    
  )
  /**
   * FORMULAIRE
   */
  return (           
    <div className="settingsdiv">
    { updateUserForm }
    </div>     
  );
}

/**
 * List of props from form
 */
export default withFormik({
  mapPropsToValues: (props) => { 
    return {
    firstname: '',
    lastname: '',
    username: '',
    email:'',
    newpassword: '',
    passwordconfirm: '',
    currentpassword: '',
    }
  },

  /**
   * VALIDATION SCHEMA
   */
  validationSchema: Yup.object().shape({
    firstname: Yup.string()      
      .min(2, "Votre prénom doit faire au minimum 2 caractères")
      .max(30, "Votre prénom doit faire au maximum 30 caractères"),
    lastname: Yup.string()      
      .min(2, "Votre prénom doit faire au minimum 2 caractères")
      .max(30, "Votre prénom doit faire au maximum 30 caractères"),
    username: Yup.string()      
      .min(3, "Votre nom d'utilisateur doit faire au minimum 3 caractères")
      .max(20, "Votre nom d'utilisateur doit faire au maximum 20 caractères"),    
    email: Yup.string()
      .email("Veuillez entrer une adresse email valide"),                      
    newpassword: Yup.string()
      .min(8, "Votre mot de passe doit faire au minimum 8 caractères")
      .max(25, "Votre mot de passe doit faire au maximum 25 caractères"),  
    passwordconfirm: Yup.string()       
      .min(8, "La confirmation et le mot de passe sont différents")
      .max(25, "La confirmation et le mot de passe sont différents"),       
      /*
        .oneOf([Yup.ref('newpassword'), null], 'La confirmation et le mot de passe sont différents') :
      schema.oneOf([Yup.ref('newpassword'), null], 'La confirmation et le mot de passe sont différents') 
    }),*/
    currentpassword: Yup.string()
    .required("Vous devez entrer votre mot de passe actuel")
    /*.notOneOf([Yup.ref('newpassword'), null], 'Votre nouveau mot de passe doit être différent de l\'ancien')*/, 
  }),


  /**
   * SUBMIT + AXIOS 
   */
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/edit/account', {
        axios.post('/api/user/edit/account', {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        email: values.email,
        newpassword: values.newpassword
      })
      .then(function (response) {
        alert("Modifications enregistrée");        
      })
      .catch(function (error) {
        alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou choisir un autre moyen de contact");        
      });
      setSubmitting(false);
      resetForm();
    }, 1000);
  },
})(Settings);
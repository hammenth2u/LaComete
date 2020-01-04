/**
 * IMPORTS
 */
import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

/**
 * STYLES
 */
import './styles.css';

const Forgotten = () => {
  
  let history = useHistory();

  return(
    <Formik 
      enableReinitialize={true}
      initialValues={{ email: '',}}
    
      onSubmit={(values, {setSubmitting, resetForm }) => {
        
        setTimeout(() => {
          
          axios.post('/api/password/new', {
            email: values.email,
          })
          .then(function () {
            alert("Vous devriez recevoir un email rapidement");                  
            history.push("/")                 
          })
          .catch(function () {
            alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou nous contacter");        
          });
          setSubmitting(false);
          resetForm();
        }, 1000);
      }}       
                  
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Veuillez rentrer l\'adresse mail actuellement enregistrée dans votre compte utilisateur').required('Veuillez compléter ce champ'),
        
      })}
      render={({ 
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      }) => {

      return(         
        <form className="forgotten-psw" onSubmit={handleSubmit}>
          <h1>Mot de passe oublié ?</h1>
          
          <div className="form-group">
            <label>Veuillez renseigner votre adresse e-mail</label>
            <input name="email" type="text" 
              className={`form-control ${errors.email && touched.email && 'is-invalid'}`}
              value= {values.email}
              onChange={handleChange}
              onBlur={handleBlur} 
            />
            {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
          </div> 
          
          <label>En cliquant ici, vous recevrez un mail contenant un mot de passe provisoire avec lequel vous connecter. Vous pourrez ensuite le modifier dans vos paramètres.</label>
          <button type="submit" className="btn-forgotten" disabled={isSubmitting}>
            {isSubmitting ? 'patienter' : 'envoyer'}
          </button>
        </form>
        );
      }}
    />
  )
}

export default Forgotten;

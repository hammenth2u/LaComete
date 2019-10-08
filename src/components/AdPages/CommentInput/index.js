import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

//import './styles.sass';

const CommentInput = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
  } = props;


  return (                
   
    <form>
        <div className="form-group">
            <input
                name="comment"
                type="text"
                className={`form-control ${errors.comment &&
                    touched.comment &&
                    "is-invalid"}`}
                value={values.comment}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.comment && touched.comment && (<div className="invalid-feedback">{errors.comment}</div>)}
        </div>

      
      <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Patienter' : 'Envoyer'}
      </button>

    </form>
  );
}

/**
 * List of props from form
 */
export default withFormik({
  mapPropsToValues: (props) => { 
    return {
    comment: props.comment,    
    }
  },

  /**
   * VALIDATION SCHEMA
   */
  validationSchema: Yup.object().shape({
    comment: Yup.string().required("Cette section est obligatoire"),    
  }),

  /**
   * SUBMIT + AXIOS 
   */
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      axios.post('/api/annonce/new', {
        comment: values.comment,        
      })
      .then(function (response) {
        alert("Commentaire envoyé");
        console.log('TEST COMMENT : ', response);
      })
      .catch(function (error) {
        alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou choisir un autre moyen de contact");
        console.log('ERROR COMMENT : ', error);
      });
      setSubmitting(false);
      resetForm();
    }, 1000);
  },
})(CommentInput);

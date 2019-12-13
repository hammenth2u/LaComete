import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { ResultForm } from '../SearchForm';


/**
 * List of props from form
 */
export const EnhancedForm = withFormik({

  mapPropsToValues: () => { 
    return {
      type: '',    
      location: '',    
      category: '',
    }
  },

  /**
   * VALIDATION SCHEMA
   */
  validationSchema: Yup.object().shape({
    type: Yup.string(),
    location: Yup.string().ensure(),
    category: Yup.string().ensure()
  }),
  
  /**
   * SUBMIT + AXIOS 
   */
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    const typeData = values.type;
    const locationData = values.location.value;
    const catData = values.category.value;
    
    setTimeout(() => {
      axios.post('/api/results/annonces/search', {
        type: values.type,        
        location: values.location.value,        
        category: values.category.value
      })
      .then(function (response) {
        console.log('TEST POST : ', response.data);
        const searchResult = response.data;

      })
      .catch(function (error) {
        alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux.");
        console.log('ERROR POST : ', error);
      });
      setSubmitting(false);
      resetForm();
    }, 1000);    
  },
})(ResultForm);
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from "react-select";

import './styles.css';

const SearchBars = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    setFieldTouched,
    setFieldValue,
    handleBlur,
    handleSubmit
  } = props;


  /**
   * MY SELECT
   */
  const options = [
    { name: "bricolage", label: "bricolage", value: "1"},
    { name: "education", label: "education", value: "2" },
    { name: "jardinage", label: "jardinage", value: "3" },
    { name: "musique", label: "musique", value: "4" },
    { name: "sport", label: "sport", value: "5" },
    { name: "technologie", label: "technologie",value: "6" },
    { name: "theatre", label: "theatre", value: "7" },
    { name: "travaux", label: "travaux", value: "8" },
    { name: "divers", label: "divers", value: "9" }
  ];
  
  class MySelect extends React.Component {
    handleChange = value => {
      // this is going to call setFieldValue and manually update values.topcis
      this.props.onChange("category", value);
    };
  
    handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      this.props.onBlur("category", true);
    };
  
    render() {
      return (
        <div className="homesearch">          
          <Select
            options={options}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />
          {!!this.props.error && this.props.touched && (
            <div>
              {this.props.error}
            </div>
          )}
        </div>
      );
    }
  }

    /**
     * FORMULAIRE
     */
    return (                
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
          <input
            type="radio"
            name="type"
            value="rêve"
            checked={values.type === "rêve"}
            onChange={() => setFieldValue("type", "rêve")}
          />
          Rêve
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="profil"
            checked={values.type === "profil"}
            onChange={() => setFieldValue("type", "profil")}
          />
          Profil
        </label>
      </div>      

      <div className="form-group">
        <input
          id="location-input"
          name="city"
          type="text"
          className={`form-control ${errors.city &&
            touched.city &&
            "is-invalid"}`}
          placeholder="Galaxie à explorer"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.city && touched.city && (<div className="invalid-feedback">{errors.city}</div>)}
      </div>
        
      <div className="form-group">
        <MySelect
        value={values.category}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        error={errors.category}
        touched={touched.category}
        />        
      </div>
            
      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? '' : 'OK'}
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
    type: '',    
    city: '',    
    category: '',
    }
  },

  /**
   * VALIDATION SCHEMA
   */
  validationSchema: Yup.object().shape({
    type: Yup.string(),
    city: Yup.string(),
    category: Yup.string().ensure()
  }),

  /**
   * SUBMIT + AXIOS 
   */
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      axios.post('/api/annonce/new', {
        type: values.type,        
        city: values.city,        
        category: values.category.value
      })
      .then(function (response) {
        console.log('TEST POST : ', response);
      })
      .catch(function (error) {
        alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux.");
        console.log('ERROR POST : ', error);
      });
      setSubmitting(false);
      resetForm();
    }, 1000);
  },
})(SearchBars);
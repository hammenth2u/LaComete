/**
 * IMPORTS
 */
import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from "react-router";

/**
 * LOCAL IMPORTS
 */
import LocationSelect from 'src/components/Templates/LocationSelect';
import CategorySelect from 'src/components/Templates/CategorySelect'; 

class ResultList extends React.Component {

  state = {
    searchData: [],
  }
  
  render() {
    return (
      <div className="container">      
        <Formik 
          initialValues={{ type: '', location:'', category:'' }}          

          onSubmit={(values, {setSubmitting, resetForm}) => {
            
            const typeValue = values.type 
            const locValue = values.location.value
            const catValue = values.category.value

            axios.post('/api/results/annonces/search', {  
              type: typeValue,        
              location: locValue,        
              category: catValue
            })
            .then(response => {
              
              const searchResult = response.data;
              this.setState({ searchData: searchResult });
              this.props.history.push({
                pathname: '/recherche/liste',
                state: this.state.searchData
              });      
            })
            .catch(function () {
              alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux.");
            });
            setSubmitting(false);
            resetForm();

          }} 
          
          validationSchema={Yup.object().shape({
            
            type: Yup.string().required("Vous devez sélectionner une option"),
            location: Yup.string(),
            category: Yup.string(),
            
          })}
          render={({ 
            values,
            touched,
            errors,
            isSubmitting,
            setFieldValue,
            handleSubmit,
            handleBlur
           }) => {

          return(        
            <form onSubmit={handleSubmit} className="searchform">
             
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  className="option-input radio"
                  name="type"
                  value="rêve"
                  checked={values.type === "rêve"}
                  onChange={() => setFieldValue("type", "rêve")}
                />
                Projet
              </label>
              <label>
                <input
                  type="radio"
                  className="option-input radio"
                  name="type"
                  value="profil"
                  checked={values.type === "profil"}
                  onChange={() => setFieldValue("type", "profil")}
                />
                Profil
              </label>
              {errors.type && touched.type && (<div className="invalid-radio">{errors.type}</div>)}
            </div>

            <div className="form-group">
                <CategorySelect                
                classNamePrefix="catsearch"
                value={values.category}
                onChange={setFieldValue}
                onBlur={handleBlur}
                error={errors.category}
                touched={touched.category}
                />        
            </div>

            <div className="form-group">
                <LocationSelect
                classNamePrefix="locsearch"
                value={values.location}
                onChange={setFieldValue}
                onBlur={handleBlur}
                error={errors.location}
                touched={touched.location}
                />        
            </div>            
            
            <div className="form-group">
              <button type="submit" className="homebtn" disabled={isSubmitting}>
              {isSubmitting ? 'Patienter' : <FontAwesomeIcon icon={faRocket} />}
              </button>
            </div>
            </form>
          )
        }} 
      />      
    </div>
    )
  }
};

/**
 * EXPORT
 */
export default withRouter(ResultList);
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
            .catch(function (error) {
              alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux.");
            });
            setSubmitting(false);
            resetForm();

          }} 
          
          validationSchema={Yup.object().shape({
            
            type: Yup.string().required("Veuillez séléctionner un type"),
            location: Yup.string().ensure(),
            category: Yup.string().ensure(),
            
          })}
          render={({ 
            values,
            touched,
            errors,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
            handleSubmit
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
                Je cherche un rêve auquel participer
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
                Je cherche des talents pour contribuer au mien
              </label>
            </div>

            <div className="form-group">
                <CategorySelect                
                classNamePrefix="catsearch"
                value={values.category}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.category}
                touched={touched.category}
                />        
            </div>

            <div className="form-group">
                <LocationSelect
                classNamePrefix="locsearch"
                value={values.location}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
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
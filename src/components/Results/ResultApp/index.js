/**
 * Import
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faRocket } from '@fortawesome/free-solid-svg-icons';

import LocationSelect from 'src/components/Templates/LocationSelect';
import CategorySelect from 'src/components/Templates/CategorySelect';

// Styles et assets
import './styles.css';

class ResultApp extends React.Component {
  state = {
    homeSearchRes: []
  }

  componentDidMount() {
    const test = this.props.location.state;
    console.log('test history : ', test)
    this.setState({ homeSearchRes: test })
  }

  render() {
    
    const homeResultData = this.state.homeSearchRes.map(homeRes=>
    <li className="cards_item" key={ homeRes.id }>
      <div className="card">
        <div className="card_image">
          <img src={homeRes.picture}/>
        </div>
        <div className="card_content" >
        <h3 className="card_title">{ homeRes.title }</h3>
        <p className="card_text">{ homeRes.category }</p>
        <p className="card_text"><FontAwesomeIcon icon={faMapMarkerAlt} /> { homeRes.location }</p>
        <button className="btn card_btn"><Link to={`/annonces/${homeRes.id}`}>Voir</Link></button>
        </div>
      </div>
    </li>
  )

    return (
      <div id="wrapper">    
      <div className="searchpage">      
        <Formik 
          initialValues={{ type: '', location:'', category:'' }}
        
          onSubmit={(values, {setSubmitting, resetForm}) => {
            
            const typeValue = values.type 
            console.log(' 1 : ',typeValue)
            const locValue = values.location.value
            console.log(' 2 : ',locValue)
            const catValue = values.category.value
            console.log(' 3 : ',catValue)

            axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/results/annonces/search', {  
            //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/results/annonces/search' , {
              type: typeValue,        
              location: locValue,        
              category: catValue
            })
            .then(response => {
              console.log('TEST RESULT : ', response.data);
              const searchResult = response.data;
              this.setState({ homeSearchRes: searchResult });                             
            })
            .catch(function (error) {
              alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux.");
              console.log('ERROR POST : ', error);
            });
            setSubmitting(false);
            resetForm();

          }} 
          
          validationSchema={Yup.object().shape({
            
            type: Yup.string().required("Veuillez sélectionner un type"),
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
                Rêve
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
            </div>

            <div className="form-group">
              <CategorySelect
              placeholder="Catégorie"
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
              <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Patienter' : <FontAwesomeIcon icon={faRocket} />}
              </button>
            </div>
            </form>
          )
        }} 
      />
      </div>       
      <div className="resultgrid-search">  
        <ul className="cards">     
          {homeResultData}
        </ul>
      </div>
    </div>
    )
  };
}

ResultApp.propTypes = {
  /** Titre de l'application React */
};

/**
 * Export
 */

// Étape 1 : on définit des stratégies de connexion au store de l'app.
const connectionStrategies = connect(
  // 1er argument : stratégie de lecture (dans le state privé global)
  (state, ownProps) => {
    return {
      title: ownProps.title,
      greeting: state.greetingMessage
    };
  },

  // 2d argument : stratégie d'écriture (dans le state privé global)
  (dispatch, ownProps) => {
    return {
      handleChange: (event) => {
        dispatch(updateInputValue(event.target.value));
      }
    };
  },
);

// Étape 2 : on applique ces stratégies à un composant spécifique.
const ResultContainer = connectionStrategies(ResultApp);

// Étape 3 : on exporte le composant connecté qui a été généré
export default ResultContainer;

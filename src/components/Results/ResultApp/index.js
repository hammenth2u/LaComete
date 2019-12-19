/**
 * Import
 */
/**
 * IMPORTS
 */
import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faRocket } from '@fortawesome/free-solid-svg-icons';

/**
 * LOCAL IMPORTS
 */
import LocationSelect from 'src/components/Templates/LocationSelect';
import CategorySelect from 'src/components/Templates/CategorySelect';

/**
 * STYLES
 */
import './styles.css';

class ResultApp extends React.Component {
  state = {
    homeSearchRes: []
  }

  componentDidMount() {
    this.setState({ homeSearchRes: this.props.location.state })
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
        <a href={'/annonces/'+ homeRes.id}><button className="btn card_btn">Voir</button></a>
        </div>
      </div>
    </li>
  )

    return (
      <div id="wrapper">    
      <div className="searchpage">      
        <Formik 
          enableReinitialize={true}
          initialValues={{ 
            type: this.state.homeSearchRes.type, 
            location: this.state.homeSearchRes.location, 
            category: this.state.homeSearchRes.category 
          }}
        
          onSubmit={(values, {setSubmitting}) => {
            
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
              this.setState({ homeSearchRes: searchResult });                             
            })
            .catch(function (error) {
              alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux.");
            });
            setSubmitting(false);

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

/**
 * EXPORT
 */
export default ResultApp;

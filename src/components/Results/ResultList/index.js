import React from 'react';
import { render } from 'react-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

import ResultGrid from '../ResultGrid';
import history from '../../History';

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
      <div className="catsearch">
        <Select
          classNamePrefix="catsearch"
          placeholder="Catégorie"
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

const locationOptions = [
  { value:"Ain", label:"Ain" },
  { value:"Aisne", label:"Aisne" },
  { value:"Allier", label:"Allier" },
  { value:"Alpes-de-Haute-Provence", label:"Alpes-de-Haute-Provence" },
  { value:"Hautes-Alpes", label:"Hautes-Alpes" },
  { value:"Alpes-Maritimes", label:"Alpes-Maritimes" },
  { value:"Ardèche", label:"Ardèche" },
  { value:"Ardennes", label:"Ardennes"},
  { value:"Ariège", label:"Ariège" },
  { value:"Aube", label:"Aube" },
  { value:"Aude", label:"Aude" },
  { value:"Aveyron", label:"Aveyron" },
  { value:"Bouches-du-Rhône", label:"Bouches-du-Rhône" },
  { value:"Calvados", label:"Calvados"},
  { value:"Cantal", label:"Cantal" },
  { value:"Charente", label:"Charente"},
  { value:"Charente-Maritime", label:"Charente-Maritime" },
  { value:"Cher", label:"Cher" },
  { value:"Corrèze", label:"Corrèze" },
  { value:"Corse-du-Sud", label:"Corse-du-Sud" },
  { value:"Haute-Corse", label:"Haute-Corse" },
  { value:"Côte-d'Or", label:"Côte-d'Or" },
  { value:"Côtes d'Armor", label:"Côtes d'Armor" },
  { value:"Creuse", label:"Creuse" },
  { value:"Dordogne", label:"Dordogne"},
  { value:"Doubs", label:"Doubs" },
  { value:"Drôme", label:"Drôme" },
  { value:"Eure", label:"Eure" },
  { value:"Eure-et-Loir", label:"Eure-et-Loir" },
  { value:"Finistère", label:"Finistère" },
  { value:"Gard", label:"Gard" },
  { value:"Haute-Garonne", label:"Haute-Garonne" },
  { value:"Gers", label:"Gers" },
  { value:"Gironde", label:"Gironde" },
  { value:"Hérault", label:"Hérault" },
  { value:"Ille-et-Vilaine", label:"Ille-et-Vilaine" },
  { value:"Indre", label:"Indre" },
  { value:"Indre-et-Loire", label:"Indre-et-Loire" },
  { value:"Isère", label:"Isère" },
  { value:"Jura", label:"Jura" },
  { value:"Landes", label:"Landes" },
  { value:"Loir-et-Cher", label:"Loir-et-Cher" },
  { value:"Loire", label:"Loire" },
  { value:"Haute-Loire", label:"Haute-Loire" },
  { value:"Loire-Atlantique", label:"Loire-Atlantique" },
  { value:"Loiret", label:"Loiret" },
  { value:"Lot", label:"Lot" },
  { value:"Lot-et-Garonne", label:"Lot-et-Garonne" },
  { value:"Lozère", label:"Lozère" },
  { value:"Maine-et-Loire", label:"Maine-et-Loire" },
  { value:"Manche", label:"Manche" },
  { value:"Marne", label:"Marne" },
  { value:"Haute-Marne", label:"Haute-Marne" },
  { value:"Mayenne", label:"Mayenne" },
  { value:"Meurthe-et-Moselle", label:"Meurthe-et-Moselle" },
  { value:"Meuse", label:"Meuse" },
  { value:"Morbihan", label:"Morbihan"},
  { value:"Moselle", label:"Moselle" },
  { value:"Nièvre", label:"Nièvre" },
  { value:"Nord", label:"Nord" },
  { value:"Oise", label:"Oise" },
  { value:"Orne", label:"Orne" },
  { value:"Pas-de-Calais", label:"Pas-de-Calais" },
  { value:"Puy-de-Dôme", label:"Puy-de-Dôme" },
  { value:"Pyrénées-Atlantiques", label:"Pyrénées-Atlantiques" },
  { value:"Hautes-Pyrénées", label:"Hautes-Pyrénées" },
  { value:"Pyrénées-Orientales", label:"Pyrénées-Orientales" },
  { value:"Bas-Rhin", label:"Bas-Rhin"},
  { value:"Haut-Rhin", label:"Haut-Rhin" },
  { value:"Rhône", label:"Rhône" },
  { value:"Haute-Saône", label:"Haute-Saône" },
  { value:"Saône-et-Loire", label:"Saône-et-Loire" },
  { value:"Sarthe", label:"Sarthe" },
  { value:"Savoie", label:"Savoie" },
  { value:"Haute-Savoie", label:"Haute-Savoie" },
  { value:"Paris", label:"Paris" },
  { value:"Seine-Maritime", label:"Seine-Maritime" },
  { value:"Seine-et-Marne", label:"Seine-et-Marne" },
  { value:"Yvelines", label:"Yvelines"},
  { value:"Deux-Sèvres", label:"Deux-Sèvres" },
  { value:"Somme", label:"Somme" },
  { value:"Tarn", label:"Tarn" },
  { value:"Tarn-et-Garonne", label:"Tarn-et-Garonne" },
  { value:"Var", label:"Var" },
  { value:"Vaucluse", label:"Vaucluse"},
  { value:"Vendée", label:"Vendée" },
  { value:"Vienne", label:"Vienne" },
  { value:"Haute-Vienne", label:"Haute-Vienne" },
  { value:"Vosges", label:"Vosges" },
  { value:"Yonne", label:"Yonne" },
  { value:"Territoire de Belfort", label:"Territoire de Belfort" },
  { value:"Essonne", label:"Essonne" },
  { value:"Hauts-de-Seine", label:"Hauts-de-Seine" },
  { value:"Seine-St-Denis", label:"Seine-St-Denis" },
  { value:"Val-de-Marne", label:"Val-de-Marne" },
  { value:"Val-D'Oise", label:"Val-D'Oise" },
  { value:"Guadeloupe", label:"Guadeloupe" },
  { value:"Martinique", label:"Martinique" },
  { value:"Guyane", label:"Guyane" },
  { value:"La Réunion", label:"La Réunion" },
  { value:"Mayotte", label:"Mayotte" },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: "#adefd3"
    // You can also use state.isFocused to conditionally style based on the focus state
  })
};
  
class LocationSelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange("location", value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur("location", true);
  };

  render() {
    return (
      <div className="locsearch">          
        <Select
          classNamePrefix="locsearch"
          placeholder="Galaxie à explorer"
          options={locationOptions}
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

class ResultList extends React.Component {

  state = {

    searchData: []
  }
  
  render() {
    return (
      <div className="container">
        <Formik 
          initialValues={{ type: '', location:'', category:'' }}

          onSubmit={(values, {setSubmitting, resetForm}) => {
            
            const typeValue = values.type 
            console.log(' 1 : ',typeValue)
            const locValue = values.location.value
            console.log(' 2 : ',locValue)
            const catValue = values.category.value
            console.log(' 3 : ',catValue)

            //axios.post('/api/results/annonces/search', {  
            axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/results/annonces/search' , {
              type: typeValue,        
              location: locValue,        
              category: catValue
            })
            .then(response => {
              console.log('TEST POST : ', response.data);
              const searchResult = response.data;
              this.setState({ searchData: searchResult });
              console.log('EMPTY STATE :', this.state.searchData);
              history.push('/recherche/liste');
              
            })
            .catch(function (error) {
              alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux.");
              console.log('ERROR POST : ', error);
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
            handleChange,
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
                <MySelect
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
      <ResultGrid results={this.state.searchData} /> 
    </div>
    )
  }
};

export default ResultList;
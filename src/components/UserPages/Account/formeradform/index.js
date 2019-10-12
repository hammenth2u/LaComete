import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from "react-select";

//import './styles.sass';

const NewAdForm = (props) => {
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
        <div className="homesearch">          
          <Select
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
        <div>
          <label>Catégorie</label>
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
      <h1>Postez une nouvelle annonce</h1>

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
        <label>Titre</label>
        <input
          name="title"
          type="text"
          className={`form-control ${errors.title &&
            touched.title &&
            "is-invalid"}`}
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.title && touched.title && (<div className="invalid-feedback">{errors.title}</div>)}
      </div>

      <div className="form-group">
        <LocationSelect
        value={values.location}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        error={errors.location}
        touched={touched.location}
        />        
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          type="text"
          className={`form-control ${errors.description &&
            touched.description &&
            "is-invalid"}`}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.description && touched.description && (<div className="invalid-feedback">{errors.description}</div>)}
      </div>

      <div className="form-group">
        <label>Je recherche</label>
        <textarea
          name="need"
          type="text"
          className={`form-control ${errors.need &&
            touched.need &&
            "is-invalid"}`}
          value={values.need}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.need && touched.need && (<div className="invalid-feedback">{errors.need}</div>)}
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

      <label>Mes moyens de contact</label>
      <small className="form-text text-muted">
        Les champs suivants ne sont pas obligatoires, nous vous recommandons
        cependant d'en remplir au moins un.
      </small>
      <div className="form-groupe">
        <label>Téléphone</label>
        <input
          name="phone"
          type="text"
          className={`form-control ${errors.phone &&
            touched.phone &&
            "is-invalid"}`}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.phone && touched.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
        <small className="form-text text-muted">optionnel</small>
      </div>

      <div className="form-groupe">
        <label>E-mail</label>
        <input
          name="email"
          type="text"
          className={`form-control ${errors.email &&
            touched.email &&
            "is-invalid"}`}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (<div className="invalid-feedback">{errors.email}</div>)}
        <small className="form-text text-muted">optionnel</small>
      </div>
      
      <div className="form-groupe">
        <label>
          Site web{" "}
          <small className="form-text text-muted">ex: http://monsite.com</small>
        </label>
        <input
          name="website"
          type="text"
          className={`form-control ${errors.website &&
            touched.website &&
            "is-invalid"}`}
          value={values.website}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.website && touched.website && (<div className="invalid-feedback">{errors.website}</div>)}
        <small className="form-text text-muted">optionnel</small>
      </div>
      
      <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Patienter' : 'Décollage'}
      </button>

    </form>
  );
}

/**
 * REGEX for phone input
 */
const phoneRegEx = /(\+\d+(\s|-))?0\d(\s|-)?(\d{2}(\s|-)?){4}/;

/**
 * List of props from form
 */
export default withFormik({
  mapPropsToValues: (props) => { 
    return {
    type: '',
    title: '',
    location: '',
    description: '',
    need: '',
    email: '',
    phone: '',
    website: '',
    category: '',
    }
  },

  /**
   * VALIDATION SCHEMA
   */
  validationSchema: Yup.object().shape({
    type: Yup.string().required("Cette section est obligatoire"),
    title: Yup.string()
      .required("Cette section est obligatoire")
      .min(3, "Le titre doit faire au minimum 3 caractères")
      .max(150, "Le titre doit faire au maximum 150 caractères"),
    location: Yup.string().ensure().required("Cette section est obligatoire"),
    description: Yup.string()
      .required("Cette section est obligatoire")
      .min(50, "La description doit faire au minimum 50 caractères")
      .max(1500, "a description doit faire au maximum 150 caractères"),
    need: Yup.string()
    .required("Cette section est obligatoire")
    .min(25, "La recherche doit faire au minimum 25 caractères")
    .max(1500, "La recherche doit faire au maximum 150 caractères"),
    category: Yup.string().ensure().required("Cette section est obligatoire"),
    phone: Yup.string().matches(
      phoneRegEx,
      "Veuillez entrer un numéro de téléphone valide"
    ),
    email: Yup.string().email("Veuillez entrer une adresse email valide"),
    website: Yup.string().url("Veuillez entrer une url valide")
  }),

  /**
   * SUBMIT + AXIOS 
   */
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      axios.post('/api/annonce/new', {
        type: values.type,
        title: values.title,
        location: values.location.value,
        description: values.description,
        need: values.need,
        email: values.email,
        phone: values.phone,
        website: values.website,
        category: values.category.value
      })
      .then(function (response) {
        alert("Annonce postée");
        console.log('TEST POST : ', response);
      })
      .catch(function (error) {
        alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou choisir un autre moyen de contact");
        console.log('ERROR POST : ', error);
      });
      setSubmitting(false);
      resetForm();
    }, 1000);
  },
})(NewAdForm);

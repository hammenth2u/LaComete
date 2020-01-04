/**
 * IMPORTS
 */
import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

/**
 * LOCAL IMPORTS
 */
import LocationSelect from 'src/components/Templates/LocationSelect';
import CategorySelect from 'src/components/Templates/CategorySelect';

class SubmitForm extends React.Component {

  render() {
    return (
      <Formik 
        initialValues={{
          type: '',
          title: '',
          location: '',
          description: '',
          need: '',
          email: '',
          phone: '',
          website: '',
          category: '',
        }}

        onSubmit={(values, {setSubmitting, resetForm}) => {
            axios.post('/api/annonce/new', {
            type: values.type,
            title: values.title,
            location: values.location.value,
            description: values.description,
            need: values.need,
            email: values.email,
            phone: values.phone,
            website: values.website,
            category: values.category.value,
            })
            .then(function () {
              alert("Annonce postée");              
            })
            .catch(function () {
              alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou nous contacter");              
            });
            setSubmitting(false);
            resetForm();            
        }} 
        
        validationSchema={Yup.object().shape({
          type: Yup.string()
            .required("Cette section est obligatoire"),
          location: Yup.string().required("Cette section est obligatoire"),
          category: Yup.string().required("Cette section est obligatoire"),
          title: Yup.string()
            .required("Cette section est obligatoire")
            .min(3, "Le titre doit faire au minimum 3 caractères")
            .max(150, "Le titre doit faire au maximum 150 caractères"),
          description: Yup.string()
            .required("Cette section est obligatoire")
            .min(50, "La description doit faire au minimum 50 caractères")
            .max(1500, "La description doit faire au maximum 500 caractères"),
          need: Yup.string()
            .required("Cette section est obligatoire")
            .min(25, "La recherche doit faire au minimum 25 caractères")
            .max(1500, "La recherche doit faire au maximum 500 caractères"),
          phone: Yup.string()
            .matches(/(\+\d+(\s|-))?0\d(\s|-)?(\d{2}(\s|-)?){4}/,"Veuillez entrer un numéro de téléphone valide"),
          email: Yup.string()
            .email("Veuillez entrer une adresse email valide"),              
          website: Yup.string()
            .url("Veuillez entrer une url valide")
        })}
        render={({ 
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit
          }) => {
          return (
            <form className="ad-form" onSubmit={handleSubmit}>
              <h2>Poster une nouvelle annonce</h2>
              <label>Je souhaite partager mon :</label>
              <div className="ad-radio-group" id="radioGroup">
                <label>
                  <input
                    className="option-input radio" 
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
                    className="option-input radio"
                    type="radio"
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
                <label>Titre</label>
                <input
                  name="title"
                  type="text"
                  className={`form-control ${errors.title && touched.title && "is-invalid"}`}
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title && (<div className="invalid-radio">{errors.title}</div>)}
              </div>

              <div className="form-group">
                  <label>Catégorie</label>
                  <CategorySelect                    
                  classNamePrefix="catsearch"
                  value={values.category}
                  onChange={setFieldValue}
                  onBlur={handleBlur}
                  touched={touched.category}
                  />        
                  {errors.category && touched.category && (<div className="invalid-radio">{errors.category}</div>)}
              </div>

              <div className="form-group">
                  <label>Lieu</label>
                  <LocationSelect                    
                  classNamePrefix="locsearch"
                  value={values.location}
                  onChange={setFieldValue}
                  onBlur={handleBlur}
                  touched={touched.location}
                  />        
                  {errors.location && touched.location && (<div className="invalid-radio">{errors.location}</div>)}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  type="text"
                  className={`form-control ${errors.description && touched.description && "is-invalid"}`}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (<div className="invalid-radio">{errors.description}</div>)}
              </div>

              <div className="form-group">
                <label>Je recherche</label>
                <textarea
                  name="need"
                  type="text"
                  className={`form-control ${errors.need && touched.need && "is-invalid"}`}
                  value={values.need}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.need && touched.need && (<div className="invalid-radio">{errors.need}</div>)}
              </div>
            
              <div className="contact-head">
                <label className="contact-group">Mes moyens de contact</label>
                <small className="contact-group form-text text-muted">
                  Les champs suivants ne sont pas obligatoires, nous vous recommandons cependant d'en remplir au moins un.
                </small>
              </div>
              <div className="contact-group form-groupe">
                <label>Téléphone</label>
                <input
                  name="phone"
                  type="text"
                  className={`form-control ${errors.phone && touched.phone && "is-invalid"}`}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone && (<div className="invalid-radio">{errors.phone}</div>)}                  
              </div>

              <div className="contact-group form-groupe">
                <label>E-mail</label>
                <input
                  name="email"
                  type="text"
                  className={`form-control ${errors.email && touched.email && "is-invalid"}`}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (<div className="invalid-radio">{errors.email}</div>)}                  
              </div>
              
              <div className="contact-group form-groupe">
                <label>
                  Site web                    
                </label>
                <input
                  name="website"
                  type="text"
                  placeholder="http://..."
                  className={`form-control ${errors.website && touched.website && "is-invalid"}`}
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.website && touched.website && (<div className="invalid-radio">{errors.website}</div>)}                  
              </div>
              
              <button type="submit" className="account-btn" disabled={isSubmitting}>
                {isSubmitting ? <span className="btn-span"><FontAwesomeIcon icon={faHourglassHalf} /></span> :  <span className="btn-span"><FontAwesomeIcon icon={faRocket} /></span>}
              </button>

            </form>
          );
        }} 
      />
    );
  }
};

/**
 * EXPORT
 */
export default withRouter(SubmitForm);

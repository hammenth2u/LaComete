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

class EditAd extends React.Component {

    state={
        singleAd: [],
    }

    componentDidMount(){    
    
        /* DISPLAY AD ACCORDING TO ID IN URL */
        const currentUrl = window.location.pathname;
        axios.post('/api/single/annonce', {    
          currentUrl
        })
        
        .then(response => {
            
          this.setState({ singleAd: response.data[0] });   
        });   
    }

  render() {
    return (
      <div className="container">
        <Formik 
          enableReinitialize={true}
          initialValues={{
            title: this.state.singleAd.title,
            description: this.state.singleAd.description,
            need: this.state.singleAd.need,
            email: this.state.singleAd.email,
            phone: this.state.singleAd.phone,
            website: this.state.singleAd.website,
          }}

          onSubmit={(values, {setSubmitting, resetForm}) => {
            setTimeout(() => {
              axios.post('/api/update/add', {
              annonceId: this.state.singleAd.id,
              title: values.title,
              description: values.description,
              need: values.need,
              email: values.email,
              phone: values.phone,
              website: values.website,
              })
              .then(function () {
                alert("Modification(s) postée(s)");              
              })
              .catch(function () {
                alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou nous contacter");              
              });
              setSubmitting(false);
              resetForm();
              this.props.history.push('/annonces/'+ this.state.singleAd.id)
            }, 1000);
          }} 
          
          validationSchema={Yup.object().shape({
            type: Yup.string(),              
            title: Yup.string()              
              .min(3, "Le titre doit faire au minimum 3 caractères")
              .max(150, "Le titre doit faire au maximum 150 caractères"),
            description: Yup.string()              
              .min(50, "La description doit faire au minimum 50 caractères")
              .max(1500, "La description doit faire au maximum 500 caractères"),
            need: Yup.string()              
              .min(25, "La recherche doit faire au minimum 25 caractères")
              .max(1500, "La recherche doit faire au maximum 500 caractères"),
            phone: Yup.string()
              .matches(/(\+\d+(\s|-))?0\d(\s|-)?(\d{2}(\s|-)?){4}/,"Veuillez entrer un numéro de téléphone valide").nullable(),
            email: Yup.string()
              .email("Veuillez entrer une adresse email valide").nullable(),              
            website: Yup.string()
              .url("Veuillez entrer une url valide").nullable()
          })}
          render={({ 
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
           }) => {
            return (
              <div className="formdiv">
              <form className="ad-form" onSubmit={handleSubmit}>
                <h2>Editer mon annonce</h2>               

                <div className="form-group">
                  <label>Titre</label>
                  <input
                    name="title"
                    type="text"
                    className={`form-control ${errors.title &&
                      touched.title &&
                      "is-invalid"}`}
                    value={values.title || ''}                    
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title && (<div className="invalid-feedback">{errors.title}</div>)}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    type="text"
                    className={`form-control ${errors.description &&
                      touched.description &&
                      "is-invalid"}`}                    
                    value={values.description || ''}
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
                    value={values.need || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.need && touched.need && (<div className="invalid-feedback">{errors.need}</div>)}
                </div>
             
                <div className="contact-head">
                <label className="contact-group">Mes moyens de contact</label>
                <small className="contact-group form-text text-muted">
                  Les champs suivants ne sont pas obligatoires, nous vous recommandons
                  cependant d'en remplir au moins un.
                </small>
                </div>
                <div className="contact-group form-groupe">
                  <label>Téléphone</label>
                  <input
                    name="phone"
                    type="text"
                    className={`form-control ${errors.phone &&
                      touched.phone &&
                      "is-invalid"}`}
                    value={values.phone || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && touched.phone && (<div className="invalid-feedback">{errors.phone}</div>)}                  
                </div>

                <div className="contact-group form-groupe">
                  <label>E-mail</label>
                  <input
                    name="email"
                    type="text"
                    className={`form-control ${errors.email &&
                      touched.email &&
                      "is-invalid"}`}
                    value={values.email || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (<div className="invalid-feedback">{errors.email}</div>)}                  
                </div>
                
                <div className="contact-group form-groupe">
                  <label>
                    Site web                    
                  </label>
                  <input
                    name="website"
                    type="text"
                    placeholder="http://..."
                    className={`form-control ${errors.website &&
                      touched.website &&
                      "is-invalid"}`}
                    value={values.website || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.website && touched.website && (<div className="invalid-feedback">{errors.website}</div>)}                  
                </div>
                
                <button type="submit" className="account-btn" disabled={isSubmitting}>
                  {isSubmitting ? <span className="btn-span"><FontAwesomeIcon icon={faHourglassHalf} /></span> :  <span className="btn-span"><FontAwesomeIcon icon={faRocket} /></span>}
                </button>

              </form>
              </div>
            );
          }} />
      </div>
    );
  }
};

/**
 * EXPORT
 */
export default withRouter(EditAd);

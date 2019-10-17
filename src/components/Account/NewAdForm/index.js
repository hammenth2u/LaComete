import React from 'react';
import { render } from 'react-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';

import history from '../../History';
/*
class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }


  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) { return null; }

    if (loading) { return <p>loading...</p>; }

    return (<img src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200} />);
  }
}*/

import LocationSelect from 'src/components/Templates/LocationSelect';
import CategorySelect from 'src/components/Templates/CategorySelect';

class SubmitForm extends React.Component {
  render() {
    return (
      <div className="container">
        <Formik 
          initialValues={{ 
            //file: null,
            type: '',
            title: '',
            location: '',
            description: '',
            need: '',
            email: '',
            phone: '',
            website: '',
            category: '',
            //formData: '',
          }}

          onSubmit={(values, {setSubmitting, resetForm}) => {

            /*console.log('IMAGE : ', values.file);

            const formData = new FormData();
            formData.append(
              'file',
              values.file,
              values.file.name,
            )
            for (var value of formData.values()) {
              console.log(value);
            }*/

            //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/annonce/new', {
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
              //formData: formData,
            })
            .then(function (response) {
              alert("Annonce postée");              
            })
            .catch(function (error) {
              alert("Nous sommes désolé.e.s, une pluie de météorites perturbe les réseaux, veuillez recommencer ou nous contacter");              
            });
            setSubmitting(false);
            resetForm();
            this.props.history.push('/mon-compte/mes-annonces')
          }} 
          
          validationSchema={Yup.object().shape({
           // file: Yup.mixed()
          //  .required("Veuillez choisir un type"),
            type: Yup.string()
              .required("Cette section est obligatoire"),
            location: Yup.string().ensure().required("Cette section est obligatoire"),
            category: Yup.string().ensure().required("Cette section est obligatoire"),
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
            setFieldTouched,
            setFieldValue,
            handleBlur,
            handleSubmit
           }) => {
            return (
              <div className="formdiv">
              <form className="ad-form" onSubmit={handleSubmit}>
                <h2>Poster une nouvelle annonce</h2>
                <label>Je souhaite partager mon :</label>
                <div className="ad-radio-group">
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
                    <label>Catégorie</label>
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
                    <label>Lieu</label>
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
                {/*<div className="form-group">
                  <label htmlFor="file">Ajouter une image</label>
                  <input id="file" name="file" type="file" onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }} className="form-control" />
                  <Thumb file={values.file} />
                </div>*/}
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
                    value={values.phone}
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
                    value={values.email}
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
                    value={values.website}
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

export default withRouter(SubmitForm);

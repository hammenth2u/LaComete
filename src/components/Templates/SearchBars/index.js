/**
 * IMPORTS
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
/**
 * LOCAL IMPORTS
 */
import LocationSelect from 'src/components/Templates/LocationSelect';
import CategorySelect from 'src/components/Templates/CategorySelect';

const SearchBars = () => {

      return (
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
                {errors.type && touched.type && (<div className="invalid-radio">{errors.type}</div>)}
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
}

export default SearchBars;
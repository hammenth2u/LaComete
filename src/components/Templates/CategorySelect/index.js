import React from 'react';
import Select from "react-select";

const options = [
    { name: "animaux", label: "Animaux", value: "1"},
    { name: "art", label: "Art", value: "2" },
    { name: "bricolage", label: "Bricolage", value: "3" },
    { name: "cinema", label: "Cinéma", value: "4" },
    { name: "communaute", label: "Communauté", value: "5" },
    { name: "education", label: "Education",value: "6" },
    { name: "geek", label: "Geek", value: "7" },
    { name: "humanitaire", label: "Humanitaire", value: "8" },
    { name: "immobilier", label: "Immobilier", value: "9" },
    { name: "jardinage", label: "Jardinage", value: "10" },
    { name: "mode", label: "Mode", value: "11" },
    { name: "musique", label: "Musique", value: "12" },
    { name: "photographie", label: "Photographie", value: "13" },
    { name: "sport", label: "Sport", value: "14" },
    { name: "technologie", label: "Technologie", value: "15" },
    { name: "theatre", label: "Théatre", value: "16" },
    { name: "travaux", label: "Travaux", value: "17" },
    { name: "voyage", label: "Voyage", value: "18" },
    { name: "divers", label: "Divers", value: "19" }    
  ]; 
  
class CategorySelect extends React.Component {
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
            placeholder="Catégorie"
            classNamePrefix="catsearch"            
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
export default CategorySelect;
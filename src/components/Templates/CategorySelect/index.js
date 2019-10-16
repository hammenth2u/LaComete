import React from 'react';
import Select from "react-select";

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
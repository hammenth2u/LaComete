import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';



class Ad extends React.Component {
  state = {
    singleAd: []
  }

  componentDidMount(){
    const currentUrl = window.location.pathname;
    // TODO : REQUETE ONE AD
    axios.post('http://127.0.0.1:8001/api/single/annonce', {
      currentUrl
    }
    )
    //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/')

    .then(response => {

      const singleAd = response.data;
      console.log('ONE AD : ', singleAd);

      this.setState({ singleAd: response.data[0] });
      console.log('ONE AD STATE: ', this.state.singleAd);           
    })

    .catch(error => {

        console.log('ADS ERROR : ', error);
    });   
  };
  
  render () {    
    return (
      <div className="ad">
             
        <section>
          <p>Annonce : </p>            

          <article>     
            <h3>Title : { this.state.singleAd.title }</h3>
            <h4>Auteur : { this.state.singleAd.user }</h4>
            <p>Lieu : { this.state.singleAd.city }</p>
            <p>Catégorie : { this.state.singleAd.category }</p>
            <p>Description : { this.state.singleAd.description }</p>
            <p>Recherche : { this.state.singleAd.need }</p>
          </article> 
        </section>

        <section className="comments">
          
          <div>
            <h3>Commentaires : </h3>
          </div>
        </section>
            
      </div>
    )
  }
}
/*
const Ad = ({ title, category, city, description, need }) => {    
    
      return (
        <div className="ad">
                
          <section>
            <p>Annonce : </p>            

            <article>     
              <h3>Title : { title }</h3>
              <p>Lieu : { city }</p>
              <p>Catégorie : { category }</p>
              <p>Description : { description }</p>
              <p>Recherche : { need }</p>
            </article> 
          </section>

          <section className="comments">
            
            <div>
              <h3>Commentaires : </h3>
            </div>
          </section>

        </div>
  )
};

/*
Ad.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  city:PropTypes.string.isRequired,
  description:PropTypes.string.isRequired,
  need:PropTypes.string.isRequired,
};

*/
export default Ad;

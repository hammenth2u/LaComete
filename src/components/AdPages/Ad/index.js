import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

import CommentInput from 'src/components/AdPages/CommentInput';

class Ad extends React.Component {
  state = {
    singleAd: []
  }

  componentDidMount(){
    const currentUrl = window.location.pathname;

    axios.post('http://127.0.0.1:8001/api/single/annonce', {
      currentUrl
    }
    )
    //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/single/annonce')

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
          <div className="comment-input">
            <CommentInput />            
          </div>
          <div>
            <h3>Commentaires : </h3>
            <ul>
              <li></li>
            </ul>
          </div>
        </section>
            
      </div>
    )
  }
}

export default Ad;

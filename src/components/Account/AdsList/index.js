import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

const MyAds = ({ userAds }) => {

  const userAdList = userAds.map(userAd => 
    
    <li className="cards_item" key={ userAd.id }>
      <div className="card">
        <div className="card_image"><img src={userAd.picture}/></div>
        <div className="card_content" >
        <h3 className="card_title">{ userAd.title }</h3>
        <p className="card_text">{ userAd.category }</p>
        <p className="card_text"><FontAwesomeIcon icon={faMapMarkerAlt} /> { userAd.location }</p>
        <button className="btn card_btn"><Link to={`/annonces/${userAd.id}`}>Voir</Link></button>
        </div>
      </div>
    </li>
  )

  return (
    <div className="accountads">      
      <div className="resultgrid">          
        <h1>Mes annonces</h1> 
        <ul className="cards">                          
          { userAdList }
        </ul>
      </div>         
    </div>
  );
};

export default MyAds;
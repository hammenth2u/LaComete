/**
 * IMPORTS
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * STYLES
 */
import '../AccountApp/style.css';

const MyAds = ({ userAds }) => {

  const userAdList = userAds.map(userAd => 
    
    <li className="cards_item" key={ userAd.id }>
      <div className="card">
        <div className="card_image">
          <img src={userAd.picture}/>
        </div>
        <div className="card_content" >
          <h3 className="card_title">{ userAd.title }</h3>
          <p className="card_text">{ userAd.category }</p>
          <p className="card_text"><FontAwesomeIcon icon={faMapMarkerAlt} /> { userAd.city }</p>
          <a href={'/annonces/'+ userAd.id}><button className="btn card_btn">Voir</button></a>
        </div>
      </div>
    </li>
  )

  return (
    <div className="resultgrid-acc">          
      <h1>Mes annonces</h1> 
      <ul className="cards">                          
        { userAdList }
      </ul>
    </div>         
  );
};

/**
 * EXPORT
 */
export default MyAds;
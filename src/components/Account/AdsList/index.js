import React from 'react';
import { Link } from 'react-router-dom';

//import './styles.sass';

const MyAds = ({ userAds }) => {

  const userAdList = userAds.map(userAd => 
    <article key={userAd.id}>     
      <h3>Title : { userAd.title }</h3>
      <p>Lieu : { userAd.city }</p>
      <Link to={`/annonces/${userAd.id}`}>>>></Link>     
    </article> 
  )

  return (
    <div className="Account">
      <h1>Mes annonces</h1>
            
      <section className="ads">      
        { userAdList }
      </section>
      
    </div>
  );
};

export default MyAds;
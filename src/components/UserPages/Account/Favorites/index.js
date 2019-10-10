import React from 'react';
import { Link } from 'react-router-dom';

//import './styles.sass';

const Favorites = ({ userFavs }) => {

  const userFavList = userFavs.map(userFav => 
    <article key={userFav.idAnnonce}>     
      <h3>Title : { userFav.titleAnnonce }</h3>
      <p>Lieu : { userFav.city }</p>
      <Link to={`/annonces/${userFav.idAnnonce}`}>>>></Link>     
    </article> 
  )

  return (
    <div className="Account">
      <h1>Mes annonces</h1>
            
      <section className="ads">      
        { userFavList }
      </section>
      
    </div>
  );
};

export default Favorites;
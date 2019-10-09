import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import './styles.sass';

import Ad from 'src/components/AdPages/Ad'

const Ads = ({ allAds }) => {

    const ad = allAds.map(ad => (
              
    <Ad 
        key={ad.id}   
        title={ ad.title }
        category={ ad.category }
        city={ ad.city }
        description={ ad.description }
        need={ ad.need }                      
    />
    )
  )

  return (
    <div className="ads">
        {/* { ad } */}
        <Route path="/annonces/:id" component={ Ad } />       
    </div>
  );
};

export default Ads;
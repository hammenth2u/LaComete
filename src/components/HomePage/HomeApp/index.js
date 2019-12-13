/**
 * IMPORTS
 */
import React from 'react';

/**
 * LOCAL IMPORTS
 */
import HomeSearch from '../HomeSearch'
import Intro from 'src/components/HomePage/Intro';

/**
 * STYLES
 */
import './styles.css';

const HomeApp = () => (
  
  <div id="homepage">

    <section className="homesearch">      
      <HomeSearch />      
    </section>    

    <Intro />
    
  </div>
);


/**
 * EXPORT
 */
export default HomeApp;

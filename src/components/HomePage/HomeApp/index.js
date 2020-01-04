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
  
  <main id="homepage">
    <section className="homesearch">      
      <HomeSearch />      
    </section>    

    <Intro />    
  </main>
);


/**
 * EXPORT
 */
export default HomeApp;

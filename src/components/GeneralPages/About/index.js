import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const About = () => {

  return (
    <div className="about">
        <section>
            <p>Présentation du projet</p>
        </section>

        <section className="teamportraits">
            <article className="Clara">
                <p>Présentation de Clara</p>
            </article>

            <article className="Jonathan">
                <p>Présentation de Jonathan</p>
            </article>

            <article className="Pauline">
                <p>Présentation de Pauline</p>
            </article>

            <article className="Romain">
                <p>Présentation de Romain</p>
            </article>
        </section>
    </div>
  );
};

/*
Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};
*/
export default About;
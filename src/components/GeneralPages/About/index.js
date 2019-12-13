/**
 * IMPORTS
 */
import React from 'react';

/**
 * STYLES
 */
import './styles.css';

const About = () => {

  return (
    <div className="about">
        <h2>Le projet</h2>
        <section className="comet-intro">
            <section className="quote">
                <p>"C'est un projet pour les brutes, les fous, les fumistes mais affreusement optimistes ?"</p>
                <p className="author"> - Deb o'Clock</p>
            </section>
            <p className="idea">La Comète est née le jour où je me suis dit "J'aimerais tellement construire une armure d'Iron Man en vrai!". Evidemment, j'y connais rien en métallurgie et en électronique et je n'ai pas de garage où construire tout ça.
            Et puis, ça m'a fait penser à toutes les fois où on a dit à ma pote Clem "Non mais Clem, ouvre un resto!", parce qu'elle cuisine vraiment très bien. Et toutes celles où on s'est dit "Venez on ouvre un bar, on tient un concept génial". Et on le fait jamais. Parce qu'on maîtrise jamais tous les aspects d'un plan. Surtout un plan sur la comète...
            Et voilà, l'idée était là.</p>
            <p className="idea">Donc si tu rêves de reconstruire l'intégralité des planètes connues de Star Wars en Lego, tu as déjà les plans et une magnifique étoile de la mort mais tu vis dans un 14m² ? Tu as hérité du manoir de tante Gladys et tes potes t'ont convaincu d'en faire un escape game, mais à part avoir des idées, tu ne sais pas faire grand chose? Ou au contraire tu sais tailler des figurines pokemon de 3cm à la tronçonneuse dans du chêne commun mais c'est pas très utile... Ce site est fait pour toi!</p>
            <p className="idea-author">- Pauline</p>
        </section>

        <h2>L'équipe</h2>
        <section className="teamportraits">            
            <article className="solo">
                <img className="teampics" src="https://i.ibb.co/dJ2ptd7/clara.jpg" />    
                <p className="role">Back-end (Symfony), intégration</p>
                <p>Auparavant, Clara était factrice au sein de l'entreprise "La Poste". Récemment elle est entrée dans le champ du développement Web. Pour ce faire elle a suivi la formation proposée par l'école O'Clock et s'est spécialisée en Symfony (back-end). Elle s'oriente désormais vers du développement Fullstack.</p>
            </article>
            
            <article className="solo">
                <img className="teampics" src="https://i.ibb.co/TgcY72Z/posh.jpg" /> 
                <p className="role">Front-end (React), intégration</p>
                <p>C'est après 4 années chez le grand M jaune qui fait des frites et plusieurs expériences dans la vente, que Pauline a décidé de se reconvertir. Passionnée d'arts et de design, curieuse de tout, créative dans l'âme et enfant de l'internet. C'est en dressant ce portrait qu'elle s'est dit "Et si je devenais développeuse?". Et elle l'a fait.</p>
            </article>
         
        </section>
    </div>
  );
};

/**
 * EXPORT
 */
export default About;
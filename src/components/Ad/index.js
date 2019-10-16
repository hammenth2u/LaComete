import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope, faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import './styles.css';

class Ad extends React.Component {
  state = {
    singleAd: [],
    isFavorite: '',
    comments: [],
    commentContent: '',
    contactObject: '',
    contactContent: '',
    newComment: [],
    contactOpen: false,
    phoneOpen: false,
    atOpen: false,
  }

  componentDidMount(){    
    
    /* UNE SEULE ANNONCE EN FONCTION DE L'URL */
    const currentUrl = window.location.pathname;
    axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/single/annonce', {
    //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/single/annonce', {
      currentUrl
    })
    
    .then(response => {

      const singleAd = response.data;
      console.log('ONE AD : ', singleAd);

      this.setState({ singleAd: response.data[0] });
      console.log('ONE AD STATE: ', this.state.singleAd);           
    })

    .catch(error => {

        console.log('ADS ERROR : ', error);
    });   

    /* STATUS DE L'UTILISATEUR */
    axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/isConnected')
    //  axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/isConnected')
      
      .then(response => {
        
        this.setState({ userStatus: response.data[0] });
        console.log('STATE : ', this.state.userStatus);                
      })      
      .catch(error => {

        console.log('ERROR : ', error);
    }); 
    
    /* FAVORITE TRUE/FALSE SI USER CONNECTE*/          
    const currentAdPath = window.location.pathname;
    console.log('TEST ID : ', currentAdPath);
    axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/isFavorite', {
    //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/isFavorite'), {
      currentAdPath: currentAdPath,
    })
    
      .then(response => {

        const isFavorite = response.data['isFavorite'];
        this.setState({ isFavorite: response.data['isFavorite']})
        console.log('ISFAV : ', isFavorite);           
      })

      .catch(error => {
          console.log('ISFAV ERROR : ', error);
      });  
            
    /* COMMENTAIRES DE L'ANNONCE */
    const currentPath = window.location.pathname;
    axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/comments/show', {
    //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/comments/show'), {
      currentPath: currentPath,
    })    

    .then(response => {

      const comments = response.data;
      console.log('COMMENTS : ', comments);  
      this.setState({ comments: response.data})
      console.log('COMMENTS STATE : ', this.state.comments);  
               
    })

    .catch(error => {
        console.log('COMMENTS ERROR : ', error);
    });  
  }; 

  /* LIKE/UNLIKE UNE ANNONCE */
  favoriteAd = () => {

    const currentAdId = this.state.singleAd.id;
    console.log('TEST : ', currentAdId);
    const isfav = this.state.isFavorite;
    console.log('TEST2 : ', isfav);

    if(this.state.isFavorite == false) {
    
      axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/favorite/new', {
      //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/favorite/new', {
        currentAdId: currentAdId,
        isFavorite: true        
      })
      .then(function(response) {
        console.log('FAVED : ', response);
      })

      .catch(error => {
          console.log('FAV ERROR : ', error);
      }); 

    } else {
      
      axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/favorite/new', {
      //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/favorite/new', {
        currentAdId: currentAdId,
        isFavorite: false        
      })
      .then(function (response) {
        console.log('UNFAVED : ', response);
      })

      .catch(error => {
          console.log('UNFAV ERROR : ', error);
      });   
    }
  }

  /* FORMULAIRE COMMENTAIRE */
  handleChange = (evt) => {
    this.setState({ commentContent: evt.target.value})
  }

  handleSubmit = (evt) => {
    const adId = this.state.singleAd.id;
    console.log('ADID : ', adId)
    evt.preventDefault();
    axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/comment/new', {
    //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/comment/new', {
        comment: this.state.commentContent,
        adId: adId                
      })
      .then((response) => {
        console.log('COMMENT SUCCESS : ', response);
        this.setState({comments: response.data});
        console.log('newstate : ', this.state.comments)
      })
      .catch(error => {
          console.log('COMMENT ERROR : ', error);
      }); 
  };  

  /* FORMULAIRE CONTACT */
  // OBJECT
  handleChangeContactObject = (evt) => {
    this.setState({ contactObject: evt.target.value})
  }

  // MESSAGE
  handleChangeContact = (evt) => {
    this.setState({ contactContent: evt.target.value})
  }

  handleSend = (evt) => {
    const email = this.state.singleAd.email;
    console.log('AD USER MAIL : ', email)
    evt.preventDefault();    
    axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/contact/another/user', {
    //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/contact/another/user', {
      
        contactObject: this.state.contactObject,
        contactContent: this.state.contactContent,
        email: email        
      })
      .then(function (response) {
        alert('Votre message a été envoyé');
        console.log('CONTACT TEST : ', response);
      })

      .catch(error => {
          console.log('CONTACT ERROR : ', error);
      });   
  };  

  /*  CONTACT COLLAPSE */

  // MAIL
  toggleContact = () => {
    if(this.state.contactOpen == false){
      this.setState({ contactOpen: true});
    } else {
      this.setState({ contactOpen: false});
    }
  }

  // PHONE
  togglePhone = () => {
    if(this.state.phoneOpen == false){
      this.setState({ phoneOpen: true});
    } else {
      this.setState({ phoneOpen: false});
    }
  }
  
  // WEBSITE
  toggleAt = () => {
    if(this.state.atOpen == false){
      this.setState({ atOpen: true});
    } else {
      this.setState({ atOpen: false});
    }
  }

  render () {     
    
    const commentsList = this.state.comments;
      const list = commentsList.map(function(comment){
        return (
          <li className="comment" key={comment.idComment}>
            <span className="content">{comment.contentComment}</span>
            <small className="comment-author">{comment.userComment}</small>          
          </li>
        );
      })

    return (
      <div className="ad">
             
        <section>
          <article>  
            <h3>{ this.state.singleAd.title }</h3>
            <div class="first-section">
            <div className="imgwrapper">
            <img src={ this.state.singleAd.picture } />
            </div>

            {this.state.userStatus == "<" ? (
              '' ) : (
              <div className="fav-contact">
                <section>  
                  
                  <Button onClick={ this.favoriteAd } aria-controls="example-collapse-text" aria-expanded={this.state.contactOpen} >
                    <FontAwesomeIcon icon={faStar} />
                  </Button>              
                  
                  {this.state.singleAd.phone != null ? (
                  <div>
                    <Button onClick={this.togglePhone} aria-controls="example-collapse-text" aria-expanded={this.state.phoneOpen} >
                      <FontAwesomeIcon icon={faPhone} />
                    </Button>
                    <Collapse in={this.state.phoneOpen}>
                      <div className="contact-info">
                        <p>{this.state.singleAd.phone}</p>
                      </div>
                    </Collapse> 
                  </div>             
                  ) : ('')}
                  
                  {this.state.singleAd.website != null ? (
                    <div>
                      <Button onClick={this.toggleAt} aria-controls="example-collapse-text" aria-expanded={this.state.atOpen} >
                        <FontAwesomeIcon icon={faAt} />
                      </Button>       
                      <Collapse in={this.state.atOpen}>
                        <div className="contact-info">
                          <a>{this.state.singleAd.website}</a>
                        </div>
                      </Collapse>
                    </div> 
                    ) : ('')}
    
                  {this.state.singleAd.email != null ? (
                    <div>
                      <Button onClick={this.toggleContact} aria-controls="example-collapse-text" aria-expanded={this.state.contactOpen} >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </Button>
                      <Collapse in={this.state.contactOpen}>                
                          
                        <form className="contact-form"> 
                          <div className="form-group">
                            <input
                              name="contactobject"
                              type="text"
                              className="contactinput"
                              value={this.contactObject}
                              onChange={this.handleChangeContactObject}
                              //onBlur={handleBlur}
                            />                  
                          </div>             
                          <div className="form-group">
                            <input
                              name="contact"
                              type="text"
                              className="contactinput"
                              value={this.contactContent}
                              onChange={this.handleChangeContact}
                              //onBlur={handleBlur}
                            />                  
                          </div>          
                        <button type="submit" className="btn btn-outline-primary" label='Envoyer' onClick={this.handleSend}/>    
                        </form> 
                          
                      </Collapse>
                    </div>
                  ) : ('')}                  
                </section>                     
            </div>          
            )}
            </div>
            <h4>Auteur : { this.state.singleAd.user }</h4>
            <p>Lieu : { this.state.singleAd.city }</p>
            <p>Catégorie : { this.state.singleAd.category }</p>
            <p>Description : { this.state.singleAd.description }</p>
            <p>Recherche : { this.state.singleAd.need }</p>
          </article> 
        </section>
          
        <form>              
          <div className="form-group">
            <input
              name="comment"
              type="text"
              className="commentinput"
              value={this.commentContent}
              onChange={this.handleChange}
              //onBlur={handleBlur}
            />                  
          </div>          
          <button type="submit" className="btn btn-outline-primary" label='Envoyer' onClick={this.handleSubmit}/>    
        </form> 
        <section className="comments">          
          <div>
            <h3>Commentaires : </h3>
            <ul>                       
              {list}
            </ul>
          </div>
      </section>
        
            
      </div>
    )
  }
}

export default Ad;

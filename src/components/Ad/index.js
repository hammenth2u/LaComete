import React from 'react';
import PropTypes, { resetWarningCache } from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope, faAt, faPhone, faUser, faMapMarkerAlt, faPencilRuler,  } from '@fortawesome/free-solid-svg-icons';
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
    starColor: ''
  }

  componentDidMount(){    
    
    /* UNE SEULE ANNONCE EN FONCTION DE L'URL */
    const currentUrl = window.location.pathname;
    axios.post('/api/single/annonce', {
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
    axios.get('/api/user/isConnected')
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
    axios.post('/api/isFavorite', {
    //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/isFavorite'), {
      currentAdPath: currentAdPath,
    })
    
      .then(response => {

        this.setState({ isFavorite: response.data['isFavorite']}) 
        
        if(this.state.isFavorite == true) {
          this.setState({starColor: '#d49f15'})
        } else {
          this.setState({starColor: 'white'}) 
        }
      })

      .catch(error => {
          console.log('ISFAV ERROR : ', error);
      });  
            
    /* COMMENTAIRES DE L'ANNONCE */
    const currentPath = window.location.pathname;
    axios.post('/api/comments/show', {
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
    const isfav = this.state.isFavorite;

    if(this.state.isFavorite == false) {
    
      axios.post('/api/favorite/new', {
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
    this.setState({starColor: '#d49f15'}) 

    } else {
      
      axios.post('/api/favorite/new', {
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
      this.setState({starColor: 'white'}) 
    }
  } 

  /* FORMULAIRE COMMENTAIRE */
  handleChange = (evt) => {
    this.setState({ commentContent: evt.target.value})
  }

  handleSubmit = (evt) => {
    const adId = this.state.singleAd.id;
    evt.preventDefault();
    axios.post('/api/comment/new', {
    //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/comment/new', {
        comment: this.state.commentContent,
        adId: adId                
      })
      .then((response) => {        
        this.setState({comments: response.data});
        this.commentInput.value = "";
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
    evt.preventDefault();    
    axios.post('/api/contact/another/user', {
    //axios.post('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/contact/another/user', {
      
        contactObject: this.state.contactObject,
        contactContent: this.state.contactContent,
        email: email        
      })
      .then(function (response) {
        alert('Votre message a été envoyé');
      })

      .catch(error => {
        alert('Une pluie de météorite perturbe les réseaux, veuillez recommencer.');
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
          <div className="comment" key={comment.idComment}>
            <div className="commentmeta">
              <small className="comment-author">{comment.userComment}, </small>
              <small className="comment-datetime">le {comment.dateComment}</small> 
            </div>   
          <p className="comment-content">{comment.contentComment}</p>                    
          </div>
        );
      })

    return (
      <div className="ad">
             
        <section>
          <article>  
            <h3 className="soloadtitle">{ this.state.singleAd.title }</h3>
            <div className="first-section">
            <div className="spaceone">
            <div className="imgwrapper">
            <img className="adpic" src={ this.state.singleAd.picture } />
            </div>

            <div className="basicinfo">
            <p><FontAwesomeIcon icon={faUser} /> { this.state.singleAd.user }</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> { this.state.singleAd.city }</p>
            <p><FontAwesomeIcon icon={faPencilRuler} /> { this.state.singleAd.category }</p>
            </div>
            </div>
            {this.state.userStatus == "<" ? (
              '' ) : (
              <div className="fav-contact">
                <section>  
                  
                  <Button onClick={ this.favoriteAd } style={{ color: this.state.starColor }} aria-controls="example-collapse-text" aria-expanded={this.state.contactOpen} >
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
                          
                        <form className="ad-contact-form"> 
                          <div className="ad-form-group">
                            <input
                              ref={(obj) => this.commentInput= obj}
                              name="contactobject"
                              type="text"
                              placeholder="Objet"
                              className="contactinput"
                              value={this.contactObject}
                              onChange={this.handleChangeContactObject}
                              //onBlur={handleBlur}
                            />                  
                          </div>             
                          <div className="form-group">
                            <textarea
                              ref={(msg) => this.commentInput= msg}
                              name="contact"
                              rows="4"
                              placeholder="Message"
                              className="contactinput-msg"
                              value={this.contactContent}
                              onChange={this.handleChangeContact}
                              //onBlur={handleBlur}
                            />                  
                          </div>          
                        <button type="submit" className="adcontact btn-outline-primary" onClick={this.handleSend}>envoyer</button>    
                        </form> 
                          
                      </Collapse>
                    </div>
                  ) : ('')}                  
                </section>                     
            </div>          
            )}            
            </div>
            <h4>Description : </h4>
            <section className="maintext">
            <p>{ this.state.singleAd.description }</p>
            <h4>Recherche : </h4>
            <p>{ this.state.singleAd.need }</p>
            </section>
          </article> 
        </section>
          
        <form>              
          <h4>Commentaires : </h4>
          <div className="commentgroup">
            <textarea
              ref={(ref) => this.commentInput= ref}
              name="comment"
              placeholder="Commentaire..."
              row="3"
              type="text"
              className="commentinput"
              value={this.commentContent}
              onChange={this.handleChange}
              //onBlur={handleBlur}
            /> 
            <button type="submit" className="comment-btn" onClick={this.handleSubmit}>envoyer</button>                   
          </div>          
          
        </form> 
        <section className="comments">          
          <div>
            
            <section className="comment-section">                       
              {list}
            </section>
          </div>
      </section>
        
            
      </div>
    )
  }
}

export default Ad;

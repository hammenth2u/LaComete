/**
 * IMPORTS
 */
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope, faAt, faPhone, faUser, faMapMarkerAlt, faPencilRuler, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

/**
 * STYLES
 */
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
    starColor: '',
    userName: '',
  }

  componentDidMount(){    
    
    /* DISPLAY AD ACCORDING TO ID IN URL */
    const currentUrl = window.location.pathname;
    axios.post('/api/single/annonce', {    
      currentUrl
    })
    
    .then(response => {

      this.setState({ singleAd: response.data[0] });         
    })

    .catch(error => {

        alert('Cette annonce semble ne pas exister');
    });   

    /* USER STATUS */
    axios.get('/api/user/isConnected')    
      
      .then(response => {
        
        this.setState({ userStatus: response.data[0] });             
      }); 
    
    /* SHOW FAVORITE STATUS IS USER IS CONNECTED */          
    const currentAdPath = window.location.pathname;
    axios.post('/api/isFavorite', {    
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
          alert('Nos favoris semblent avoir un problème, nous nous excusons pour la gêne occasionnée');
      }); 
      
    /* CONNECTED USER'S NAME */
    axios.get('/api/user/account')
    
        .then(response => {

            this.setState({ userName: response.data[0].username });
        }); 
            
    /* COMMENTS LIST */
    const currentPath = window.location.pathname;
    axios.post('/api/comments/show', {
      currentPath: currentPath,
    })    

    .then(response => {

      this.setState({ comments: response.data})               
    });      
  }; 

  /* LIKE/UNLIKE AD */
  favoriteAd = () => {

    const currentAdId = this.state.singleAd.id;

    if(this.state.isFavorite == false) {
    
      axios.post('/api/favorite/new', {
        currentAdId: currentAdId,
        isFavorite: true        
      })        
      this.setState({starColor: '#d49f15'})     
      this.setState({isFavorite: true});
    } else {
      
      axios.post('/api/favorite/new', {      
        currentAdId: currentAdId,
        isFavorite: false        
      })       
      this.setState({starColor: 'white'});
      this.setState({isFavorite: false});
    }
  } 

  /* COMMENT FORM */
  handleChange = (evt) => {
    this.setState({ commentContent: evt.target.value})
  }

  handleSubmit = (evt) => {
    const adId = this.state.singleAd.id;
    evt.preventDefault();
    axios.post('/api/comment/new', {    
        comment: this.state.commentContent,
        adId: adId                
      })
      .then((response) => {        
        this.setState({comments: response.data});
        this.commentInput.value = "";
      });
     
  };  

  /* CONTACT FORM */
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
    this.contactObj.value = "";          
    this.contactCont.value = "";

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
    
    // DISPLAY COMMENT
    const commentsList = this.state.comments;
    const list = commentsList.map(function(comment){
      return (
        <div className="comment" key={comment.idComment}>
          <div className="commentmeta">
            <small className="comment-author">{comment.userComment}, le {comment.dateComment}</small>             
          </div>   
          <p className="comment-content">{comment.contentComment}</p>              
        </div>
      );
    })

    return (
      // DISPLAY AD 
      <div className="ad">             
        <section>
          <article>  
            <h3 className="soloadtitle">{ this.state.singleAd.title }</h3>

            {/* CONDITIONAL DISPLAY FOR EDIT LINK */}
            {this.state.userName == this.state.singleAd.user ? (
              <a href={'/annonces/'+ this.state.singleAd.id +'/editer'}><button className="edit-ad">Modifier l'annonce</button></a>
              ) : ( '' )}              
            <div className="first-section">
              <div className="spaceone">
                <div className="imgwrapper">
                  <img className="adpic" src={ this.state.singleAd.picture } />
                </div>

                <div className="basicinfo">
                  <p><FontAwesomeIcon icon={faUser} /> { this.state.singleAd.user }</p>
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> { this.state.singleAd.city }</p>
                  <p><FontAwesomeIcon icon={faPencilRuler} /> { this.state.singleAd.category }</p>            
                  <p><FontAwesomeIcon icon={faCalendar} /> { this.state.singleAd.createdAt }</p> 
                </div>
              </div>

            {/* CONDITIONAL DISPLAY FOR FAV + CONTACT BUTTONS */}            

            {this.state.userStatus == "<" ? (
              '' ) : (
              <div className="fav-contact">
                <section>  
                  
                  {/* FAVORITE BUTTON */}
                  <Button onClick={ this.favoriteAd } style={{ color: this.state.starColor }} aria-controls="example-collapse-text" aria-expanded={this.state.contactOpen} >
                    <FontAwesomeIcon icon={faStar} />
                  </Button>              
                  
                  {/* PHONE BUTTON IF PHONE # PROVIDED */}
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
                  
                  {/* WEBSiTE BUTTON IF WEBSITE PROVIDED */}
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
    
                  {/* EMAIL BUTTON + FORM IF EMAIL PROVIDED */}
                  {this.state.singleAd.email != null ? (
                    <div>
                      <Button onClick={this.toggleContact} aria-controls="example-collapse-text" aria-expanded={this.state.contactOpen} >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </Button>                     
                      <Collapse in={this.state.contactOpen}>                
                          
                        <form className="ad-contact-form"> 
                          <div className="ad-form-group">
                            <input
                              ref={obj => this.contactObj= obj}
                              name="contactobject"
                              type="text"
                              placeholder="Objet"
                              className="contactinput"
                              value={this.contactObject}
                              onChange={this.handleChangeContactObject}
                            />                  
                          </div>             
                          <div className="form-group">
                            <textarea
                              ref={cont => this.contactCont= cont}
                              name="contact"
                              rows="4"
                              placeholder="Message"
                              className="contactinput-msg"
                              value={this.contactContent}
                              onChange={this.handleChangeContact}
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
        <h4>Commentaires : </h4>

        {/* CONDITIONNAL DISPLAY OF COMMENT INPUT */}
        {this.state.userStatus == "<" ? (
          <small>(Vous devez être connecté pour commenter les annonces)</small> 
        ) : ( 
        <form>                        
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
            /> 
            <button type="submit" className="comment-btn" onClick={this.handleSubmit}>envoyer</button>                   
          </div>          
          
        </form> 
          )}        
          <section className="comment-section">                       
              {list}
          </section>                    
      </div>
    )
  }
}

/**
 * EXPORT
 */
export default Ad;

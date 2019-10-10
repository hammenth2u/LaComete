import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

//import './styles.sass';

class Ad extends React.Component {
  state = {
    singleAd: [],
    isFavorite: '',
    comments: [],
    commentContent: '',
  }

  componentDidMount(){    
    
    /* UNE SEULE ANNONCE EN FONCTION DE L'URL */
    const currentUrl = window.location.pathname;
    axios.post('http://127.0.0.1:8001/api/single/annonce', {
    //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/single/annonce')
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
    axios.get('http://127.0.0.1:8001/api/user/isConnected')
      //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/isConnected')
      
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
    axios.post('http://127.0.0.1:8001/api/isFavorite', {
    //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/isFavorite')
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
    axios.post('http://127.0.0.1:8001/api/comments/show', {
    //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/')
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
    
      axios.post('http://127.0.0.1:8001/api/favorite/new', {
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
      
      axios.post('http://127.0.0.1:8001/api/favorite/new', {
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

  handleChange = (evt) => {
    this.setState({ commentContent: evt.target.value})
  }

  handleSubmit = (evt) => {
    const adId = this.state.singleAd.id;
    console.log('ADID : ', adId)
    evt.preventDefault();    
    axios.post('http://127.0.0.1:8001/api/comment/new', {
        comment: this.state.commentContent,
        adId: adId        
      })
      .then(function (response) {
        console.log('COMMENT TEST : ', response);
      })

      .catch(error => {
          console.log('COMMENT ERROR : ', error);
      });   
  }
  
  render () {  
    const commentsList =  this.state.comments;
    const list = commentsList.map(function(comment){
      return (
        <li className="comment" key={comment.idComment}>
          <span className="content">{comment.contentComment}</span>
          <small className="comment-author">{comment.userComment}</small>          
        </li>
      )
    })

    return (
      <div className="ad">
             
        <section>
          <article>  
            <h3>Title : { this.state.singleAd.title }</h3>
            <h4>Auteur : { this.state.singleAd.user }</h4>
            <p>Lieu : { this.state.singleAd.city }</p>
            <p>Catégorie : { this.state.singleAd.category }</p>
            <p>Description : { this.state.singleAd.description }</p>
            <p>Recherche : { this.state.singleAd.need }</p>
          </article> 
        </section>

        {this.state.userStatus == "<" ? (
          '' ) : (
          <section>  
            <FontAwesomeIcon icon={faStar} onClick={ this.favoriteAd } />
            
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
          </section>           
        )}
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

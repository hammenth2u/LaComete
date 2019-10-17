import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const GenericModal = (props) => {
   
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >        
        <Modal.Body>          
          <p>Envoyé !</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default GenericModal
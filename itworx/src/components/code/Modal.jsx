import Modal from 'react-bootstrap/Modal';
import Codeblock from './Codeblock';

function ModalCard(props) {

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Generated {props.language.toUpperCase()} Code
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Codeblock language={props.language} code={props.code} />
      </Modal.Body>
    </Modal>
  );
}

export default ModalCard;
import Modal from 'react-bootstrap/Modal';
import Codeblock from '../code-block/code-block';
import { PropTypes } from "prop-types";

/**
 * Modal that pop up when click on HTML OR CSS generate code icon
 */
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

ModalCard.propTypes = {
  /** control the model is displayed or hiden */
  show:PropTypes.bool,
    /** control colse button in the model*/
  handleClose:PropTypes.func,
  /** code language HTML OR CSS */
  language:PropTypes.string,
  /** code text */
  code:PropTypes.string,
}

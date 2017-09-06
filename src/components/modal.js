import React, {Component} from 'react';
import Modal from 'react-modal'

class ModalPost extends Component {

  render() {
    return (
      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={this.props.openModal}
        onRequestClose={this.props.closeModal}
        contentLabel='Modal'
      >
        {this.props.content}
      </Modal>
    );
  }

}

export default ModalPost;

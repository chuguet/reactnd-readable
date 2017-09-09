import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';

import CommentForm from './forms/commentForm';

import { likeComment, unlikeComment, deleteComment } from './../actions/commentActions';

class Comment extends Component {

  state = {
    modalOpen: false
  }

  getPost = () => {
    const comment = this.props.comment;
    return {
      id: comment.parentId
    }
  }

  getComment = () => {
    const { body, author, id, timestamp } = this.props.comment || {};
    return {
      body,
      author,
      id,
      timestamp,
    }
  }

  likeComment = (ev) => {
    ev.preventDefault();
    const { id, parentId } = this.props.comment;
    this.props.likeComment(parentId, id);
  }

  unlikeComment = (ev) => {
    ev.preventDefault();
    const { id, parentId } = this.props.comment;
    this.props.unlikeComment(parentId, id);
  }

  editComment = (ev) => {
    ev.preventDefault();
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  deleteComment = (ev) => {
    ev.preventDefault();
    this.props.deleteComment(this.props.comment.id, this.props.comment.parentId);
  }

  render() {
    const { body, voteScore, author, timestamp } = this.props.comment;
    return (
      <div className="comment">
          <div className="comment-title">
            <button className="comment-title-content" onClick={this.likeComment}>Like comment</button>
            <button className="comment-title-content" onClick={this.unlikeComment}>Unlike comment</button>
            <h3 className="comment-title-content">Comment</h3>
            <button className="comment-title-content" onClick={this.editComment}>Edit comment</button>
            <button className="comment-title-content" onClick={this.deleteComment}>Delete comment</button>
          </div>
          <p>Author: {author}</p>
          <p>Body: {body}</p>
          <p>Score: {voteScore}</p>
          <p>Time: { new Date(timestamp).toString() }</p>
          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            contentLabel='Modal'
          >
            <CommentForm closeForm={this.closeModal} isUpdate={true} post={this.getPost()} comment={this.getComment()}/>
          </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const comment = state.comments.comments.find(comment => comment.id === props.commentUuid);
  return {
    comment: comment
  }
}

function mapDispatchToProps(dispatch) {
  return {
    likeComment: (postUuid, commentUuid) => dispatch(likeComment(postUuid, commentUuid)),
    unlikeComment: (postUuid, commentUuid) => dispatch(unlikeComment(postUuid, commentUuid)),
    deleteComment: (commentUuid, postUuid) => dispatch(deleteComment(commentUuid, postUuid)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));

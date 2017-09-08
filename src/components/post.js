import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import Comment from './comment';
import CommentForm from './forms/commentForm';

import { getCommentsByPost } from './../actions/commentActions';
import { getPosts, likePost, unlikePost } from './../actions/postActions';

class Post extends Component {

  state = {
    sortingCriteria: 'score',
    modalOpen: false,
    post: {},
  }

  onChange = (ev) => {
    ev.preventDefault();
    this.setState({sortingCriteria: ev.target.value})
  }

  componentDidMount() {
    if (this.props.match.params.postUuid) {
      this.props.fetchCommentsByPost(this.props.match.params.postUuid)
    }
  }

  getCommentsView = () => {
    const sortingCriteria = this.state.sortingCriteria;
    return this.props.comments.sort((comment1, comment2) => {
      switch (sortingCriteria) {
        case 'score':
          return comment2.voteScore - comment1.voteScore;
        case 'timestamp':
          return comment2.timestamp - comment1.timestamp;
        default:
          return null;
      }
    }).map((comment, index) => (
      <div key={index}>
        <Comment key={index} commentUuid={comment.id}/>
      </div>
    ));
  }

  getPostUuid = () => {
    return this.props.postUuid || this.props.match.params.postUuid;
  }

  likePost = (ev) => {
    ev.preventDefault();
    this.props.likePost(this.getPostUuid());
  }

  unlikePost = (ev) => {
    ev.preventDefault();
    this.props.unlikePost(this.getPostUuid())
  }

  editPost = (ev) => {
    ev.preventDefault();
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  render() {
    const {body, title, author, timestamp, voteScore} = this.props.post;
    const {showComment, showDetail} = this.props;
    let commentsView = null;
    if (showComment) {
      commentsView = this.getCommentsView()
    }
    return (
      <div className="post">
        <div className="post-title">
          <button className="post-title-content" onClick={this.likePost}>Like post</button>
          <button className="post-title-content" onClick={this.unlikePost}>Unlike post</button>
          <Link
            className="postLink"
            to={this.props.linkPost}
          >
            <h3 className="post-title-content">Post {title}</h3>
          </Link>
          <button className="post-title-content" onClick={this.editPost}>Edit post</button>
        </div>
        <p>Author: {author}</p>
        <p>Vote score: {voteScore}</p>
        <p>Time: {new Date(timestamp).toString()}</p>
        {showDetail
          ? <div>
              <p>Body: {body}</p>
              <select value={this.state.sortingCriteria} onChange={this.onChange} ref="sortingSelector">
                <option value="timestamp">By time</option>
                <option value="score">By score</option>
              </select>
            </div>
          : null}
        {commentsView}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.openModal}
          onRequestClose={this.props.closeModal}
          contentLabel='Modal'
        >
          <CommentForm/>
        </Modal>
      </div>
    );
  }

}

function mapStateToProps(state, props) {
  const postUuid = props.postUuid || props.match.params.postUuid;
  const post = state.posts.posts.find(post => post.id === postUuid) || {};
  const comments = state.comments.comments.filter(comment => comment.parentId === postUuid)
  return {
    post: post,
    comments: comments,
    showComment: props.match.params.postUuid !== undefined,
    showDetail: props.match.params.postUuid !== undefined
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentsByPost: (postUuid) => dispatch(getCommentsByPost(postUuid)),
    fetchPosts: () => dispatch(getPosts()),
    unlikePost: (postUuid) => dispatch(unlikePost(postUuid)),
    likePost: (postUuid) => dispatch(likePost(postUuid))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));

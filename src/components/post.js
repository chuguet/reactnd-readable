import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Comment from './comment';

import { getCommentsByPost } from './../actions/commentActions';

class Post extends Component {

  componentDidMount() {
    if(this.props.match.params.postUuid) {
      this.props.fetchCommentsByPost(this.props.match.params.postUuid)
    }
  }

  render() {
    const { body, title, author } = this.props.post;
    const { comments, showComment } = this.props;
    let commentsView = null;
    if (showComment) {
      commentsView = comments.map((comment, index) => (
        <div key={index}>
          <Comment key={index} commentUuid={comment.id}/>
        </div>
      ));
    }
    return (
      <div>
          <h3>Post {title}</h3>
          <p>Author: {author}</p>
          <p>Body: {body}</p>
          { commentsView}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const postUuid = props.postUuid || props.match.params.postUuid;
  const post = state.posts.posts.find(post => post.id === postUuid) || {};
  const comments = state.comments.comments.filter(comment => comment.parentId === postUuid);
  return {
    post: post,
    comments: comments,
    showComment: props.match.params.postUuid !== undefined
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentsByPost: (postUuid) => dispatch(getCommentsByPost(postUuid)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));

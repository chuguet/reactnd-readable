import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Post extends Component {

  render() {
    const { body, title, author } = this.props.post;
    return (
      <div>
          <h3>Post {title}</h3>
          <p>Author: {author}</p>
          <p>Body: {body}</p>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const post = state.posts.posts.find(post => post.id === props.postId) || {};
  return {
    post: post
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));

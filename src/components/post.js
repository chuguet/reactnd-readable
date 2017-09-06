import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Comment from './comment';

import { getCommentsByPost } from './../actions/commentActions';

class Post extends Component {

  state = {
    sortingCriteria: 'score'
  }

  onChange = (ev) => {
    ev.preventDefault();
    this.setState({ sortingCriteria: ev.target.value })
  }

  componentDidMount() {
    if(this.props.match.params.postUuid) {
      this.props.fetchCommentsByPost(this.props.match.params.postUuid)
    }
  }

  getCommentsView = () => {
    const sortingCriteria = this.state.sortingCriteria;
    return this.props.comments.sort((comment1, comment2) => {
        switch(sortingCriteria) {
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

  render() {
    const { body, title, author, timestamp, voteScore } = this.props.post;
    const { showComment, showDetail } = this.props;
    let commentsView = null;
    if (showComment) {
      commentsView = this.getCommentsView()
    }
    return (
      <div>
          <h3>Post {title}</h3>
          <p>Author: {author}</p>
          <p>Vote score: {voteScore}</p>
          { showDetail ?
            <div>
              <p>Body: {body}</p>
              <p>Time: {new Date(timestamp).toString()}</p>

              <select value={this.state.sortingCriteria} onChange={this.onChange} ref="sortingSelector">
                <option value="timestamp">By time</option>
                <option value="score">By score</option>
              </select>
            </div>
            : null }
          { commentsView }
      </div>
    );
  }
}

function mapStateToProps(state, props, stateComponent) {
  const postUuid = props.postUuid || props.match.params.postUuid;
  const post = state.posts.posts.find(post => post.id === postUuid) || {};
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
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));

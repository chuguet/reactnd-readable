import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Comment extends Component {

  render() {
    const { body, voteScore, author } = this.props.comment;
    return (
      <div>
          <h3>Comment</h3>
          <p>Author: {author}</p>
          <p>Body: {body}</p>
          <p>Score: {voteScore}</p>
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
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));

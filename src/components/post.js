import React, {Component} from 'react';
import {connect} from 'react-redux';

class Post extends Component {

  render() {
    const { body, title, author } = this.props.post;
    return (
      <div>
          <h3>Post {title}</h3>
          <p>Author: {author}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);

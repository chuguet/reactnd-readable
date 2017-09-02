import React, {Component} from 'react';
import {connect} from 'react-redux';

class Post extends Component {

  render() {
    return (
      <div>POST</div>
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

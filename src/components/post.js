import React, {Component} from 'react';
import {connect} from 'react-redux';

class Post extends Component {

  render() {
    console.log('Post: ', this.props)
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);

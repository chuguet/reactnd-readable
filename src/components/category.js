import React, {Component} from 'react';
import {connect} from 'react-redux';

class Category extends Component {

  render() {
    const {category} = this.props;
    return (
      <div className="category">
        <h2>Category {category.name}</h2>
        <p>Path {category.path}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);

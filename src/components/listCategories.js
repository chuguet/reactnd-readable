import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Category from './category'

class ListCategories extends Component {
  render() {
    const { categories } = this.props;
    const categoriesView = categories.map((category, index) => (
      <div key={index}>
        <Category categoryUuid={category.path}/>
      </div>
    ));
    return (
      <div className="categories">
        { categoriesView }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCategories));

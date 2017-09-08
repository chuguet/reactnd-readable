import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getCategories } from './actions/categoryActions';
import { getPosts } from './actions/postActions';
import './App.css';

import ListCategories from './components/listCategories'
import Category from './components/category'
import Post from './components/post'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }
  render() {
    const { categories } = this.props;
    return (
      <div className="App">
        <Link
          className="appLink"
          to="/"
        >Go index</Link>
        <Route exact path="/" render={() => <ListCategories categories={categories}/>}/>
        <Route exact path="/categories/:categoryUuid" render={() => <Category />}/>
        <Route exact path="/categories/:categoryUuid/posts/:postUuid" render={({ match }) => <Post linkPost={"/categories/" + match.params.categoryUuid + "/posts/" + match.params.postUuid }/>}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(getCategories()),
    fetchPosts: () => dispatch(getPosts())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

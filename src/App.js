import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from './actions/categoryActions';
import { getPosts } from './actions/postActions';
import './App.css';
import Category from './components/category'


class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className="App">
        {this.props.categories.map((category, index) => <Category key={index} category={category}/>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

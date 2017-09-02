import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPostsByCategory } from './actions/categoryActions';
import './App.css';
import Category from './components/category'


class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    const categories = Object.values(this.props.categories).map((category, index) => <Category key={index} category={category}/>);
    return (
      <div className="App">
        {categories}
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(getCategories()),
    fetchPostsByCategory: data => dispatch(getPostsByCategory(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

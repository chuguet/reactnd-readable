import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPostsByCategory } from './actions/categoryActions';
import './App.css';
import Category from './components/category'


class App extends Component {
  /*
  listPosts = () => {
    api.getPosts()
      .then(posts => {
        console.log('posts: ', posts);
        this.setState(posts);
      })
  }*/
  componentDidMount() {
    console.log('props: ', this.props)
    this.props.fetchCategories();
    //this.listPosts();
  }/*
  clickButton = (ev) => {
    ev.preventDefault();
    api.votePost("8xf0y6ziyjabvozdd253nd", 'upVote')
    this.listPosts();
  }*/
  render() {
    const { categories } = this.props;
    return (
      <div className="App">
        <Category categories={categories}/>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  console.log('state categories: ', categories)
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  console.log('dispatch: ', dispatch)
  return {
    fetchCategories: () => dispatch(getCategories()),
    getPostsByCategory: data => dispatch(getPostsByCategory(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

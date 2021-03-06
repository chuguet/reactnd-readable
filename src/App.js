import React, { Component } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from './actions/categoryActions';
import { getPosts } from './actions/postActions';
import HomeIcon from 'react-icons/lib/fa/home';
import './App.css';

import ListCategories from './components/listCategories';
import Category from './components/category';
import Post from './components/post';
import Page404 from './components/page404';

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
        ><HomeIcon size={40}/></Link>
		<Switch>
			<Route exact path="/" render={() => <ListCategories categories={categories}/>}/>
			<Route exact path="/categories/:categoryUuid" render={() => <Category />}/>
			<Route exact path="/categories/:categoryUuid/posts/:postUuid" render={({ match }) => <Post linkPost={"/categories/" + match.params.categoryUuid + "/posts/" + match.params.postUuid }/>}/>
			<Route component={Page404}/>
		</Switch>
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

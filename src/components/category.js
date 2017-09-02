import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from './post';
import { getPostsByCategory } from './../actions/categoryActions';

class Category extends Component {

  componentDidMount() {
    this.props.fetchPostsByCategory(this.props.category);
  }

  render() {
    const {category} = this.props;
    //const posts = this.props.posts.map((post, index) => <Post key={index} post={post}/>);
    return (
      <div className="category">
        <h2>Category {category.name}</h2>
        <p>Path {category.path}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.posts);
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostsByCategory: category => {
      return dispatch(getPostsByCategory(category))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from './post';

class Category extends Component {

  componentDidMount() {
  }

  render() {
    const {category, posts} = this.props;
    return (
      <div className="category">
        <h2>Category {category.name}</h2>
        <p>Path {category.path}</p>
        {posts.map((post, index) => <Post key={index} post={post}/>)}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const posts = state.posts.posts.filter((post) => post.category === props.category.path);
  return {
    posts: posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);

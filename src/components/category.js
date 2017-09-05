import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'

import Post from './post';

class Category extends Component {

  render() {
    const {category, posts} = this.props;
    return (
      <div className="category">
        <h2>Category {category.name}</h2>
        <p>Path {category.path}</p>
        {posts.map((post, index) => (
          <div key={index}>
            <Post key={index} postId={post.id}/>
            <Link
              className="postLink"
              to={"/categories/" + category.path + "/posts/" + post.id}
            >Go to the post</Link>
          </div>
      ))}
      </div>
    );
  }

}

function mapStateToProps(state, props) {
  const posts = state.posts.posts.filter(post => post.category === props.categoryId) || [];
  const category = state.categories.categories.find(category => category.path === props.categoryId) || {};
  return {
    posts: posts,
    category: category,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));

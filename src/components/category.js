import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'

import Post from './post';

class Category extends Component {

  state = {
    sortingCriteria: 'score'
  }

  onChange = (ev) => {
    ev.preventDefault();
    this.setState({ sortingCriteria: ev.target.value })
  }

  getPostsView = (category) => {
    const sortingCriteria = this.state.sortingCriteria;
    return this.props.posts.sort((post1, post2) => {
        switch(sortingCriteria) {
          case 'score':
            return post2.voteScore - post1.voteScore;
          case 'timestamp':
            return post2.timestamp - post1.timestamp;
          default:
            return null;
        }
      }).map((post, index) => (
      <div key={index}>
        <Post key={index} postUuid={post.id}/>
        <Link
          className="postLink"
          to={"/categories/" + category.path + "/posts/" + post.id}
        >Go to the post</Link>
      </div>
    ));
  }

  render() {
    const { category } = this.props;
    const postsView = this.getPostsView(category)
    return (
      <div className="category">
        <h2>Category {category.name}</h2>
        <p>Path {category.path}</p>
        <select  value={this.state.sortingCriteria} onChange={this.onChange} ref="sortingSelector">
          <option value="timestamp">By time</option>
          <option value="score">By score</option>
        </select>
        { postsView }
      </div>
    );
  }

}

function mapStateToProps(state, props) {
  const categoryUuid = props.categoryUuid || props.match.params.categoryUuid;
  const posts = state.posts.posts.filter(post => post.category === categoryUuid) || [];
  const postOrdered = posts.sort((post1, post2) => {
    return post2.voteScore - post1.voteScore;
  });
  const category = state.categories.categories.find(category => category.path === categoryUuid) || {};
  return {
    posts: postOrdered,
    category: category,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));

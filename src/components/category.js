import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { getCategories } from './../actions/categoryActions';
import { getPosts } from './../actions/postActions';

import * as api from './../utils/api';

import Modal from './modal';
import Post from './post';

class Category extends Component {

  state = {
    sortingCriteria: 'score',
    openModal: false,
    post: {}
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
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

  openModal = (ev) => {
    ev.preventDefault();
    this.setState({ openModal: true })
  }

  render() {
    const { category } = this.props;
    const postsView = this.getPostsView(category)
    return (
      <div className="category">
        <button onClick={this.openModal}>Add post</button>
        <h2>Category {category.name}</h2>
        <p>Path {category.path}</p>
        <select  value={this.state.sortingCriteria} onChange={this.onChange} ref="sortingSelector">
          <option value="timestamp">By time</option>
          <option value="score">By score</option>
        </select>
        { postsView }
        <Modal content={this.getFormForModal(this.props.post)} openModal={this.state.openModal} closeModal={this.closeModal}/>
      </div>
    );
  }

  handleTitleChange = (ev) => {
    ev.preventDefault();
    this.setState((state) => {
      return {
        ...state,
        post: {
          title: ev.target.value
        }
      }
    });
  }

  getFormForModal = () => {
    return (
      <div>
        <form>
          <input type="hidden" onChange={this.handleEmailChange} value={this.state.post.id}/>
          <input type="hidden" value={this.state.post.timestamp}/>
          <input type="hidden" value={this.state.post.category}/>
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={this.state.post.title}/>
          </div>
          <div>
            <label>Body:</label>
            <input type="text" name="body" value={this.state.post.body}/>
          </div>
          <div>
            <label>Owner:</label>
            <input type="text" name="owner" value={this.state.post.author}/>
          </div>
          <button type="submit" onClick={this.submitPost}>Submit</button>
        </form>
      </div>
    );
  }

  submitPost = () => {
    this.setState({
      post: {
        id: new Date().getTime(), //change for uuid
        category: this.props.category.path, // get the category path
        timestamp: new Date().getTime()
      }
    });
    api.addPost(this.state.post)
      .then(() => {
        this.props.fetchPosts();
        this.props.fetchCategories();
      });
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
    fetchCategories: () => dispatch(getCategories()),
    fetchPosts: () => dispatch(getPosts())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));

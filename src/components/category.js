import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import { getCategories } from './../actions/categoryActions';
import { getPosts } from './../actions/postActions';

import Post from './post';
import PostForm from './forms/postForm';
import Page404 from './page404';

class Category extends Component {

  state = {
    sortingCriteria: 'score',
    modalOpen: false
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
        <Post key={index} postUuid={post.id} linkPost={"/categories/" + category.path + "/posts/" + post.id}/>
      </div>
    ));
  }

  openModal = (ev) => {
    ev.preventDefault();
    this.setState({ modalOpen: true })
  }

  render() {
    const { category } = this.props;
    const postsView = this.getPostsView(category);
    const newPost = { category: category.path };
	if(Object.keys(category).length !== 0) {
		return (
		  <div className="category">
			<div className="category-title">
			  <Link
				className="categoryLink"
				to={"/categories/" + category.path}
			  >
				<h2 className="category-title-content">Category {category.name}</h2>
			  </Link>
			  <button className="category-title-content" onClick={this.openModal}>Add post</button>
			</div>
			<h4>Path {category.path}</h4>
			<label>Order posts: </label>
			<select  value={this.state.sortingCriteria} onChange={this.onChange} ref="sortingSelector">
			  <option value="timestamp">By time</option>
			  <option value="score">By score</option>
			</select>
			{ postsView }
			<Modal
			  className='modal'
			  overlayClassName='overlay'
			  isOpen={this.state.modalOpen}
			  onRequestClose={this.closeModal}
			  contentLabel='Modal'
			>
			  <PostForm closeForm={this.closeModal} isUpdate={false} post={newPost}/>
			</Modal>
		  </div>
		);
	} else {
		return (<Page404/>);
	}
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

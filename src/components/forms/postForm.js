import React, {Component} from 'react';

import uuid from 'react-native-uuid';

import * as api from './../../utils/api';

class PostForm extends Component {

  state = {
    id: '',
    timestamp: '',
    category: '',
    title: '',
    body: '',
    author: ''
  }

  componentDidMount() {
    const { category, title, body, author } = this.props.post;
    const id = this.props.post.id || uuid.v4();
    const timestamp = this.props.post.timestamp || Date.now();
    this.setState({ id, timestamp, category, title, body, author });
  }

  handleTitleChange = (ev) => {
    ev.preventDefault();
    this.setState({ title: ev.target.value });
  }

  handleBodyChange = (ev) => {
    ev.preventDefault();
    this.setState({ body: ev.target.value });
  }

  handleAuthorChange = (ev) => {
    ev.preventDefault();
    this.setState({ author: ev.target.value });
  }

  render() {
    return (
      <div>
        <form>
          <input type="hidden" value={this.state.id}/>
          <input type="hidden" value={this.state.timestamp}/>
          <input type="hidden" value={this.state.category}/>
          <div>
            <label>Title:</label>
            <input onChange={this.handleTitleChange} type="text" name="title" value={this.state.title}/>
          </div>
          <div>
            <label>Body:</label>
            <input onChange={this.handleBodyChange} type="text" name="body" value={this.state.body}/>
          </div>
          <div>
            <label>Author:</label>
            <input onChange={this.handleAuthorChange} type="text" name="author" value={this.state.author}/>
          </div>
          <button type="submit" onClick={this.submitPost}>Submit</button>
        </form>
      </div>
    );
  }

  submitPost = () => {
    api.addPost(this.state).then(() => {
      this.props.fetchPosts();
      this.props.fetchCategories();
    });
  }
}

export default PostForm;

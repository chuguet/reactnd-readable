import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'react-native-uuid';

import { addPost } from './../../actions/postActions';

class PostForm extends Component {

  state = {
    title: '',
    body: '',
    author: ''
  }

  componentDidMount() {
    const {title, body, author} = this.props.post;
    this.setState({title, body, author});
  }

  handleTitleChange = (ev) => {
    ev.preventDefault();
    this.setState({title: ev.target.value});
  }

  handleBodyChange = (ev) => {
    ev.preventDefault();
    this.setState({body: ev.target.value});
  }

  handleAuthorChange = (ev) => {
    ev.preventDefault();
    this.setState({author: ev.target.value});
  }

  render() {
    return (
      <div>
        <form>
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

  submitPost = (ev) => {
    ev.preventDefault();
    const post = Object.assign({}, this.state, {
      category: this.props.post.category,
      id: this.props.post.id || uuid.v4(),
      timestamp: this.props.post.timestamp || Date.now()
    });
    this.props.addPost(post);
  }
}


function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (post) => dispatch(addPost(post))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

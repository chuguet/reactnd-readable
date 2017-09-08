import React, {Component} from 'react';

import * as api from './../../utils/api';

class CommentForm extends Component {

  state = {
    id: '',
    timestamp: '',
    category: ''
  }

  componentDidMount() {
    const { id, timestamp, category } = this.props;
    this.setState({ id, timestamp, category });
  }

  handleTitleChange = (ev) => {
    ev.preventDefault();
    this.setState({ title: ev.target.value });
  }

  handleBodyChange = (ev) => {
    ev.preventDefault();
    this.setState({ body: ev.target.value });
  }

  handleOwnerChange = (ev) => {
    ev.preventDefault();
    this.setState({ owner: ev.target.value });
  }

  render() {
    return (
      <div>
        <form>
          <input type="hidden" value={this.state.id}/>
          <input type="hidden" value={this.state.timestamp || new Date().getTime()}/>
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={this.state.title}/>
          </div>
          <div>
            <label>Body:</label>
            <input type="text" name="body" value={this.statebody}/>
          </div>
          <div>
            <label>Owner:</label>
            <input type="text" name="owner" value={this.state.author}/>
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
    api.addPost(this.state.post).then(() => {
      this.props.fetchPosts();
      this.props.fetchCategories();
    });
  }
}

export default CommentForm;

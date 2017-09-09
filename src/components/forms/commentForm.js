import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';

import { addComment, updateComment } from './../../actions/commentActions';

class CommentForm extends Component {

  state = {
    body: '',
    author: '',
  }

  componentDidMount() {
    const { body, author } = this.props.comment || {};
    this.setState({ body, author });
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
            <label>Body:</label>
            <input onChange={this.handleBodyChange} type="text" name="body" value={this.state.body}/>
          </div>
          {this.props.isUpdate ?
            null :
            <div>
              <label>Author:</label>
              <input onChange={this.handleAuthorChange} type="text" name="author" value={this.state.author}/>
            </div>
          }
          <button type="submit" onClick={this.submitComment}>Submit</button>
        </form>
      </div>
    );
  }

  submitComment = (ev) => {
    ev.preventDefault();
    const { id, timestamp } = this.props.comment || {};
    const parentId = this.props.post.id;
    const comment = Object.assign({}, this.state, {
      parentId,
      id: id || uuid.v4(),
      timestamp: timestamp || Date.now(),
    });
    if(this.props.isUpdate) {
      this.props.updateComment(comment);
    } else {
      this.props.addComment(comment);
    }
    this.props.closeForm();
  }

}


function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment) => dispatch(addComment(comment)),
    updateComment: (comment) => dispatch(updateComment(comment)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

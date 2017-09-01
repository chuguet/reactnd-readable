import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as api from './utils/api';

class App extends Component {
  state = {
    posts: []
  }
  listPosts = () => {
    api.getPosts()
      .then(posts => {
        console.log(posts);
        this.setState(posts);
      })
  }
  componentDidMount() {
    this.listPosts();
  }
  clickButton = (ev) => {
    ev.preventDefault();
    api.votePost("8xf0y6ziyjabvozdd253nd", 'upVote')
    this.listPosts();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <p>{this.state.posts}</p>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.clickButton}>Votar</button>
      </div>
    );
  }
}

export default App;

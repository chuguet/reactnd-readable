import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addRecipe, removeFromCalendar} from './actions';
import './App.css';
import Category from './components/category'

import * as api from './utils/api';

class App extends Component {
  state = {
    posts: [],
    categories: []
  }
  listCategories = () => {
    api.getCategories()
      .then(categories => {
        console.log('categories: ', categories);
      })
  }
  listPosts = () => {
    api.getPosts()
      .then(posts => {
        console.log('posts: ', posts);
        this.setState(posts);
      })
  }
  componentDidMount() {
    this.listCategories();
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
        <Category/>
      </div>
    );
  }
}

function mapStateToProps({calendar, food}) {
  const dayOrder = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];
  return {
    calendar: dayOrder.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? calendar[day][meal]
          : null
        return meals;
      }, {})
    }))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectRecipe: data => dispatch(addRecipe(data)),
    remove: data => dispatch(removeFromCalendar(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

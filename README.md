# ReactND Readable

MyReads is an app where users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

## Installation

- Download or clone this repository
- Run `npm install` in the root directory
- Run `npm start`
- Go to `http://localhost:3000` in your browser

## Features

- Default View
* Should list all available categories, which should link to a category view for that category
* Should list all of the posts ordered by voteScore (highest score first)
* Should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
* Should have a control for adding a new post

- Category View
* Identical to the default view, but filtered to only include posts with the selected category

- Post Detail View
* Should show the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score
* Should list all of the comments for that post, ordered by voteScore (highest first)
* Should have a control for reordering comments by score or timestamp
* Should have controls to edit or delete the post
* Should have a control to add a new comment.
* Implement comment form however you want (inline, modal, etc.)
* Comments should also have controls for editing or deleting

- Create/Edit View
* Should have a form to create new post or edit existing posts
* When editing, existing data should be populated in the form

### create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

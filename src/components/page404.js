import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

class Page404 extends Component {

  render() {
    return (
      <div className="page-404">
        <h1>PAGE NOT FOUND</h1>
      </div>
    );
  }

}

export default withRouter(Page404);

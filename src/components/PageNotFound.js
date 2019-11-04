import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import "../styles/PageNotFound.css";

class PageNotFound extends Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column>
          <div id="main">
            <div class="fof">
              <h1>Error 404</h1>
              <br />
              <a href="/">Find my way Home</a>
            </div>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default PageNotFound;

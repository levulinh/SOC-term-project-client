import React, { Component } from "react";

import HeaderMenu from "./Header";
import { Container, Grid } from "semantic-ui-react";
import Leftbar from "./Leftbar";
import Centerbar from "./Centerbar";
import Rightbar from './Rightbar';

class Home extends Component {
  componentDidMount() {
    document.title = "Friends"
  }

  render() {
    return (
      <div>
        <HeaderMenu feed={true} />
        <Container>
          <Grid columns='equal'>
            <Grid.Column width={4}>
              <Leftbar />
            </Grid.Column>
            <Grid.Column width={8}>
              <Centerbar />
            </Grid.Column>
            <Grid.Column width={4}>
              <Rightbar />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Home;

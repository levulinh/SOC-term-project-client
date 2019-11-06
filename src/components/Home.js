import React, { Component } from "react";

import HeaderMenu from "./Header";
import { Container, Grid } from "semantic-ui-react";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";

class Home extends Component {
  render() {
    return (
      <div>
        <HeaderMenu feed={true} />
        <Container>
          <Grid columns='equal'>
            <Grid.Column width={5}>
              <Leftbar />
            </Grid.Column>
            <Grid.Column width={11}>
              <Rightbar />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Home;

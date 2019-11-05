import React, { Component } from "react";

import HeaderMenu from "./Header";
import { Container, Grid } from "semantic-ui-react";
import Leftbar from "./Leftbar";

class Home extends Component {
  render() {
    return (
      <div>
        <HeaderMenu feed={true} />
        <Container>
          <Grid>
            <Grid.Column width={4}>
              <Leftbar reload />
            </Grid.Column>
            <Grid.Column width={8}></Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Home;

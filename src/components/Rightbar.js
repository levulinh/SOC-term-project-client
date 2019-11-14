import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Icon, Label } from 'semantic-ui-react';

const trendings = ['Test', 'Friends', 'Rosh', 'Rachel', 'Monica', 'Chandler', 'Joey', 'Phoebe']

class Rightbar extends Component {
  render() {
    return (
      <Segment raised>
        {/* <Header as="h4" color="grey"><Icon name="hashtag" />Trending now</Header> */}
        <Label color="orange" ribbon><Icon name="hashtag" />Trending now</Label>
        {_.map(trendings, (t, i) => <div key={i} style={{ marginTop: 10 }}><Label as="a" href="/#" color="teal">{i + 1}<Label.Detail>#{t}</Label.Detail></Label><br /></div>)}
      </Segment>
    )
  }
}

export default Rightbar;
import React, { Component, Fragment } from 'react';

import HeaderMenu from "./Header";
import { Container, Grid, Segment, Feed, Label } from "semantic-ui-react";
import FeedPost from './FeedPost';
import { withRouter } from 'react-router';
import { getLocalUserInfo } from '../utils'
import Leftbar from "./Leftbar";
import PostThought from './PostThought';

import { Query } from 'react-apollo';
import { TIMELINE_QUERY, TIMELINE_SUBSCRIPTION } from '../graph';

class UserPage extends Component {
  componentDidMount() {
    document.title = `@${this.props.match.params.id} on Friends`
  }

  state = { latest: '' }
  render() {
    return (
      <div>
        <HeaderMenu feed={true} />
        <Container>
          <Grid columns='equal'>
            <Grid.Column width={4}>
              <Leftbar user={this.props.match.params.id} />
            </Grid.Column>
            <Grid.Column width={12}>
              {this.renderRightBar(this.props.match.params.id)}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }

  renderRightBar(username) {
    const useruname = getLocalUserInfo().username;
    return (
      <Fragment>
        {useruname === username ? <PostThought updateFeedAfterPost={this.updateAfterPost} parent={this} /> : null}

        <Query
          query={TIMELINE_QUERY}
          variables={{ username: this.props.match.params.id }}>
          {
            ({ loading, error, data, subscribeToMore }) => {
              if (loading) return <Segment raised><p>Loading...</p></Segment>;
              if (error) return <Segment raised><p>Some problems occurred!</p></Segment>;

              this._subscribeToNewPost(subscribeToMore, username)

              return (
                <Segment raised>
                  <Label ribbon color="teal">{useruname === username ? "Your timeline" : `@${username}'s timeline`}</Label>
                  <Feed>
                    {data.thoughts.thoughts.map(
                      post =>
                        <FeedPost
                          key={post.id} post={post}
                          commentButton
                          commentAction={() => this.props.history.push(`/t/${post.id}`)} />
                    )}
                  </Feed>
                </Segment>)
            }
          }
        </Query>
      </Fragment>)
  }

  _subscribeToNewPost = (subscribeToMore, username) => {
    subscribeToMore({
      document: TIMELINE_SUBSCRIPTION,
      variables: { username },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev
        const newThought = subscriptionData.data.newUserThought;
        const exists = prev.thoughts.thoughts.find(({ id }) => id === newThought.id);
        if (exists) return prev;

        return Object.assign({}, prev, {
          thoughts: {
            thoughts: [newThought, ...prev.thoughts.thoughts],
            count: prev.thoughts.thoughts.length + 1,
            __typename: prev.thoughts.__typename
          }
        })
      }
    })
  }

  updateAfterPost(store, newThought) {
    const data = store.readQuery({ query: TIMELINE_QUERY, variables: { username: getLocalUserInfo().username } });
    // console.log(newThought)
    data.thoughts.count = data.thoughts.count + 1;
    data.thoughts.thoughts.unshift(newThought);
    // console.log(data)
    store.writeQuery({
      query: TIMELINE_QUERY,
      data
    })
  }
}

export default withRouter(UserPage);
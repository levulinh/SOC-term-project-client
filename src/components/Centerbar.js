import React, { Component, Fragment } from 'react';
import { Segment, Feed, Label, Icon, Message } from 'semantic-ui-react';

import { withRouter } from 'react-router'

import { Query } from "react-apollo";
import { FEED_QUERY } from '../graph'

import FeedPost from './FeedPost';
import PostThought from './PostThought';



class Centerbar extends Component {
  state = { latest: '' }
  render() {
    return (

      <Fragment>
        <PostThought updateFeedAfterPost={this.updateAfterPost} parent={this} />
        <Query
          query={FEED_QUERY}
          variables={{ orderBy: "createdAt_DESC" }}
        >
          {
            ({ loading, error, data }) => {
              if (loading) return <Segment raised><p>Loading...</p></Segment>;
              if (error) return <Segment raised><Message error>Some problems occurred!</Message></Segment>;

              return (

                <Segment raised>
                  <Label color="yellow" ribbon><Icon name="feed" />Your newfeed</Label>
                  <Feed>
                    {data.getFeed.thoughts.map(
                      post => <FeedPost key={post.id} post={post} commentButton commentAction={() => this.props.history.push(`/t/${post.id}`)} />
                    )}
                  </Feed>
                </Segment>
              )
            }
          }
        </Query>
      </Fragment>
    )
  }

  updateAfterPost(store, newThought) {
    const data = store.readQuery({ query: FEED_QUERY, variables: { orderBy: "createdAt_DESC" } });
    // console.log(newThought)
    data.getFeed.count = data.getFeed.count + 1;
    data.getFeed.thoughts.unshift(newThought);
    // console.log(data)
    store.writeQuery({
      query: FEED_QUERY,
      data
    })
  }

}

export default withRouter(Centerbar);
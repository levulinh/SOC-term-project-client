import React, { Component, Fragment } from 'react';
import { Segment, Feed } from 'semantic-ui-react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import FeedPost from './FeedPost';
import PostThought from './PostThought';

const FEED_QUERY = gql`
  query getFeed($orderBy: ThoughtOrderByInput) {
    getFeed(orderBy: $orderBy)
    {
      count
      thoughts {
        postedBy {
          id
          username
          gender
        }
        id
        content
        createdAt
        loves {
          id
        }
        comments {
          id
        }
      }
    }
  }
`

class Rightbar extends Component {
  render() {
    return (<Query query={FEED_QUERY} variables={{ orderBy: "createdAt_DESC" }}>
      {
        ({ loading, error, data }) => {
          if (loading) return <Segment><p>Loading...</p></Segment>;
          if (error) return <Segment><p>Some problems occurred!</p></Segment>;

          return (
            <Fragment>
              <PostThought />
              <Segment>
                <Feed>
                  {data.getFeed.thoughts.map(
                    post => <FeedPost key={post.id} post={post} />
                  )}
                </Feed>
              </Segment>
            </Fragment>)
        }
      }
    </Query>)
  }

}

export default Rightbar;
import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { timeDifferenceForDate, renderContentText } from '../utils';
import { Segment, Container, Grid, Feed, Comment, Header, Form } from 'semantic-ui-react'
import HeaderMenu from './Header';
import Leftbar from './Leftbar'
import FeedPost from './FeedPost';

import { GETPOST_QUERY, COMMENT_MUTATION, COMMENT_SUBSCRIPTION } from '../graph';


class ViewThought extends Component {
  componentDidMount() {
    document.title = "Thought on Friends"
  }

  state = { content: '', loading: false }
  render() {
    return (
      <Fragment>
        <HeaderMenu feed={true} />
        <Container>
          <Grid columns='equal'>
            <Grid.Column width={4}>
              <Leftbar />
            </Grid.Column>
            <Grid.Column width={12}>
              <Query query={GETPOST_QUERY} variables={{ thoughtId: this.props.match.params.id }}>
                {
                  ({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <Segment><p>Loading...</p></Segment>;
                    if (error) return <Segment><p>Some problems occurred!</p></Segment>;

                    this._subscribeToNewComment(subscribeToMore, this.props.match.params.id)

                    return (this.renderPost(data))
                  }
                }
              </Query>
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment>
    )
  }

  renderPost(data) {
    const { thought } = data;
    return (
      <Segment raised>
        <Feed>
          <FeedPost post={thought} commentButton commentAction={() => this.commentInput.focus()} />
          <Comment.Group>
            <Header as="h3" dividing>{thought.comments.length} Comments</Header>
            {thought.comments.length === 0 ? <p>No comment yet</p> : this.renderComments(thought.comments)}
            <Form>
              <Form.Field>
                <label>Enter your comment</label>
                <input
                  placeholder="Your comment here"
                  onChange={e => this.setState({ content: e.target.value })}
                  value={this.state.content}
                  disabled={this.state.loading}
                  ref={(input) => this.commentInput = input} />
              </Form.Field>
              <Mutation
                mutation={COMMENT_MUTATION}
                variables={{ thoughtId: thought.id, content: this.state.content }}
                onCompleted={() => {
                  this.setState({ content: '', loading: false })
                }}
              >
                {
                  commentMutation => <Form.Button
                    disabled={this.state.loading}
                    content='Add Reply'
                    labelPosition='left'
                    icon='edit'
                    color="orange"
                    onClick={() => {
                      if (this.state.content === '') return null
                      this.setState({ loading: true })
                      commentMutation()
                    }} />
                }
              </Mutation>
            </Form>
          </Comment.Group>
        </Feed>
      </Segment>)
  }

  renderComments(comments) {
    return (
      comments.map(comment => <Comment key={comment.id}>
        <Comment.Avatar src={comment.postedBy.gender === "MALE" ? '/img/man-sm.png' : '/img/woman-sm.png'} />
        <Comment.Content>
          <Comment.Author as='a' href={`/u/${comment.postedBy.username}`}>@{comment.postedBy.username}</Comment.Author>
          <Comment.Metadata>
            <div>{timeDifferenceForDate(comment.createdAt)}</div>
          </Comment.Metadata>
          <Comment.Text>{renderContentText(comment.content)}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={() => {
              if (this.state.content === '') { this.setState({ content: `@${comment.postedBy.username} ` }); this.commentInput.focus() }
            }}>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>)
    )
  }

  _subscribeToNewComment = (subscribeToMore, thoughtId) => {
    subscribeToMore({
      document: COMMENT_SUBSCRIPTION,
      variables: { thoughtId },
      updateQuery: (prev, { subscriptionData }) => {
        // console.log("prev", prev)
        if (!subscriptionData) return prev
        // console.log("subdata", subscriptionData)
        const newComment = subscriptionData.data.newComment;
        const exists = prev.thought.comments.find(({ id }) => id === newComment.id);
        if (exists) return prev;
        // console.log(exists)

        return Object.assign({}, prev, {
          thought: {
            comments: [...prev.thought.comments, newComment],
            id: prev.thought.id,
            content: prev.thought.content,
            createdAt: prev.thought.createdAt,
            loves: prev.thought.loves,
            postedBy: prev.thought.postedBy,
            __typename: prev.thought.__typename
          }
        })
      }
    })
  }
}

export default ViewThought
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Header, Image, Segment, Form } from 'semantic-ui-react';

const POST_MUTATION = gql`
  mutation post($content: String!){
    post(content: $content) {
      id
      postedBy {
        id
        username
        gender
      }
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
`

class PostThought extends Component {
  state = { content: '' };
  render() {
    return (
      <Mutation mutation={POST_MUTATION}
        variables={{ content: this.state.content }}
        onCompleted={(data) => this.setState({ content: '' })}
      >
        {postMuation => {
          return (<Segment>
            <Header as="h5"><Image circular src="man-sm.png" /> Tell your followers what you're thinking</Header>
            <Form>
              <Form.TextArea maxlength={300} placeholder="What's in your head?" onChange={e => this.setState({ content: e.target.value })} value={this.state.content} />
              <Form.Button color="blue" icon="send" content="POST" labelPosition="left" onClick={postMuation} /> Remaining characters: {300 - this.state.content.length}
            </Form>
          </Segment>);
        }}
      </Mutation>);
  }
}

export default PostThought;
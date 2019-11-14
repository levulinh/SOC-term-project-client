import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { POST_MUTATION } from '../graph'
import { Segment, Form, Icon, Label, Divider, Progress } from 'semantic-ui-react';



class PostThought extends Component {
  state = { content: '', loading: false };
  render() {
    return (
      <Mutation mutation={POST_MUTATION}
        variables={{ content: this.state.content }}
        onCompleted={() => this.setState({ content: '', loading: false })}
        update={(store, { data: { post } }) => {
          this.props.updateFeedAfterPost(store, post)
          this.props.parent.setState({ latest: post.id })
        }}
      >
        {postMuation => {
          return (<Segment raised>
            <Label color="red" ribbon><Icon name="write" /> Tell your followers what you're thinking</Label>
            <Divider hidden />
            <Form>
              <Progress size='tiny' percent={(this.state.content.length / 300) * 100} attached="top" color="orange" />
              <Form.TextArea
                attached="bottom"
                disabled={this.state.loading}
                maxLength={300}
                rows={4}
                placeholder="What's in your head?"
                onChange={e => this.setState({ content: e.target.value })}
                value={this.state.content}
              />

              <Form.Button
                color="orange"
                icon="send"
                content="POST"
                labelPosition="left"
                disabled={this.state.loading}
                onClick={() => this.handleOnSubmit(postMuation)} />


            </Form>
          </Segment>);
        }}
      </Mutation>);
  }

  handleOnSubmit = (postMuation) => {
    if (this.state.content === '') return null;
    this.setState({ loading: true })
    postMuation()
  }
}

export default PostThought;
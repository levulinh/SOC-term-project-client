import React, { Component, Fragment } from "react";

import { Card, Icon, Image, Placeholder, Message, Divider, Segment, Button } from "semantic-ui-react";
import { getLocalUserInfo } from "../utils";
import { Query, Mutation } from "react-apollo";

import { CURRENT_QUERY, FOLLOW_MUTATION, UNFOLLOW_MUTATION } from '../graph'

let localInfo = getLocalUserInfo();

class Leftbar extends Component {
  state = { loadingButton: false }
  render() {
    return (
      <Query query={CURRENT_QUERY} variables={this.props.user ? { username: this.props.user } : { email: localInfo.email }}>
        {({ loading, error, data }) => {
          let user;
          if (!loading && data) user = data.userEntry;
          return (
            <Fragment>
              <Card fluid raised>
                {loading ? (
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                ) : (
                    <Image src={user.gender === "MALE" ? "/img/man.png" : "/img/woman.png"} />
                  )}
                <Card.Content>
                  {loading ? (
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="very short" />
                        <Placeholder.Line length="medium" />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  ) : (
                      <Fragment>
                        <Card.Header>
                          {user.gender === "MALE" ? (
                            <Icon name="man" color="blue" />
                          ) : (
                              <Icon name="woman" color="pink" />
                            )}
                          {user.name}
                        </Card.Header>
                        <Card.Meta>
                          <a href={`/u/${user.username}`}>
                            <Icon name="at" />
                            {user.username}
                          </a>
                        </Card.Meta>

                        <Card.Description>
                          <Message color='orange'>
                            <Message.Header>About me</Message.Header>
                            <Message.Content>{user.moto}</Message.Content>
                          </Message>
                        </Card.Description>
                      </Fragment>
                    )}
                </Card.Content>
                <Card.Content extra>
                  {loading ? (
                    <Placeholder>
                      <Placeholder.Line length="short" />
                    </Placeholder>
                  ) : (
                      <p><b>{user.followers.count}</b> Followers - <b>{user.followings.count}</b> Follows</p>)}
                </Card.Content>
              </Card>
              {(this.props.user && this.props.user !== getLocalUserInfo().username) ? this.renderFollowSection(loading, error, data) : null}
            </Fragment>
          );
        }}
      </Query>
    );
  }

  renderFollowSection(loading, error, data) {
    return (
      <div>
        <Divider horizontal>Follow</Divider>
        <Segment raised textAlign="center">
          {loading ? (<Placeholder>
            <Placeholder.Line length="medium" />
          </Placeholder>) :
            this.renderFollowButton(data.userEntry.id, data.userEntry.followers.users)
          }
        </Segment>
      </div>
    )
  }

  renderFollowButton(id, followers) {

    const exists = followers.find(f => f.username === getLocalUserInfo().username)
    if (exists) return (
      <Mutation
        mutation={UNFOLLOW_MUTATION}
        variables={{ followId: id }}
        onCompleted={() => this.setState({ loadingButton: false })}
      >
        {unfollow =>
          <Button animated="fade" icon='check' color="green" onClick={() => { this.setState({ loadingButton: true }); unfollow() }} disabled={this.state.loadingButton}>
            <Button.Content visible><Icon name="check" />Follow</Button.Content>
            <Button.Content hidden color="red"><Icon name="x" />Unfollow</Button.Content>
          </Button>
        }
      </Mutation>
    )
    return (
      <Mutation
        mutation={FOLLOW_MUTATION}
        variables={{ followId: id }}
        onCompleted={() => this.setState({ loadingButton: false })}
      >
        {follow =>
          <Button content="Follow" icon='add' color="blue" onClick={() => { this.setState({ loadingButton: true }); follow() }} disabled={this.state.loadingButton} />
        }
      </Mutation>
    )
  }
}

export default Leftbar;

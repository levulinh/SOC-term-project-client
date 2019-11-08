import React, { Component, Fragment } from "react";

import { Card, Icon, Image, Placeholder, Message } from "semantic-ui-react";
import { getLocalUserInfo } from "../utils";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const CURRENT_QUERY = gql`
  query user($email: String!) {
    userEntry(email: $email) {
      email
      gender
      moto
      name
      username
      followings {
        count
      }
      followers {
        count
      }
    }
  }
`;

let localInfo = getLocalUserInfo();

class Leftbar extends Component {
  render() {
    return (
      <Query query={CURRENT_QUERY} variables={{ email: localInfo.email }}>
        {({ loading, error, data }) => {
          let user;
          if (!loading && data) user = data.userEntry;
          return (
            <Card fluid>
              {loading ? (
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                  <Image src={user.gender === "MALE" ? "man.png" : "woman.png"} />
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
                        <a href='/#'>
                          <Icon name="at" />
                          {user.username}
                        </a>
                      </Card.Meta>

                      <Card.Description>
                        <Message info>
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
          );
        }}
      </Query>
    );
  }
}

export default Leftbar;

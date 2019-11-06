import React, { Component, Fragment } from "react";

import { Card, Icon, Image, Placeholder } from "semantic-ui-react";
import { getLocalUserInfo } from "../utils";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const CURRENT_QUERY = gql`
  query user($email: String!) {
    user(email: $email) {
      name
      email
      id
      username
      gender
      moto
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
          if (!loading && data) user = data.user;
          return (
            <Card>
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
                      <span className="date">{user.gender}</span>
                    </Card.Meta>
                    <Card.Description>{user.moto}</Card.Description>
                  </Fragment>
                )}
              </Card.Content>
              <Card.Content extra>
                {loading ? (
                  <Placeholder>
                    <Placeholder.Line length="short" />
                  </Placeholder>
                ) : (
                  <a href='/#'>
                    <Icon name="at" />
                    {user.username}
                  </a>
                )}
              </Card.Content>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Leftbar;

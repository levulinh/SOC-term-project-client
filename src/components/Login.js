import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";
import { AUTH_TOKEN, USER_INFO } from "../constants";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { CURRENT_QUERY, LOGIN_MUTATION } from "../graph";

import "../styles/Login.css";

class LoginForm extends Component {
  state = {
    error: false,
    email: "",
    password: "",
    name: ""
  };

  render() {
    const { email, password } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Segment.Group raised>
            <Segment textAlign="center">
              <Icon circular inverted color="orange" name="hashtag" size="large" />
              <Header
                as="h2"
                textAlign="center"
                style={{ marginBottom: 50, marginTop: 10 }}
              >
                Login to Friends
              </Header>
              <Form
                size="large"
                style={{ marginBottom: 50, paddingLeft: 50, paddingRight: 50 }}
              >
                <Form.Input
                  fluid
                  icon="at"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />

                <Mutation
                  mutation={LOGIN_MUTATION}
                  variables={{ email, password }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._handleError(error)}
                  update={(store, { data: { login } }) =>
                    this._updateStoreAfterLogin(store, login, email)
                  }
                >
                  {mutation => (
                    <Button
                      icon
                      labelPosition="left"
                      size="large"
                      color="orange"
                      onClick={mutation}
                    >
                      <Icon name="send" />
                      Login
                    </Button>
                  )}
                </Mutation>
              </Form>
              {this.state.error && (
                <Message negative>
                  <Message.Header>Sorry we can't log you in!</Message.Header>
                  <p>
                    Some problems occured. Please check your email or password.
                  </p>
                </Message>
              )}
            </Segment>

            <Segment>
              First time using Friends? <Link to="/signup">Sign up now »</Link>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }

  _confirm = async data => {
    const { token, user } = data.login;
    this._saveUserData(token, user);
    window.location = "http://localhost:3000/"
  };

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_INFO, JSON.stringify(user));
  };

  _handleError = error => {
    this.setState({ error: true });
  };

  _updateStoreAfterLogin = (store, login, email) => {
    const data = store.readQuery({
      query: CURRENT_QUERY,
      variables: { email }
    });

    let userToUpdate = data.user;
    userToUpdate.user = login.user;

    // console.log(data);

    store.writeQuery({ query: CURRENT_QUERY, variables: { email }, data });
    // const datanew = store.readQuery({
    //   query: CURRENT_QUERY,
    //   variables: { email }
    // });
    // console.log(datanew);
  };
}

export default LoginForm;

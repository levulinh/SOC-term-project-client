import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";
import { AUTH_TOKEN } from "../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import "../styles/Login.css";

const SIGNUP_MUTATION = gql`
  mutation SignupMutaion($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

class SignupForm extends Component {
  state = {
    error: false,
    email: "",
    password: "",
    name: ""
  };

  render() {
    const { email, password, name } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Segment.Group raised>
            <Segment textAlign="center">
              <Icon circular inverted color="blue" name="fire" size="large" />
              <Header
                as="h2"
                textAlign="center"
                style={{ marginBottom: 50, marginTop: 10 }}
              >
                Join Friends
              </Header>
              <Form
                size="large"
                style={{ marginBottom: 50, paddingLeft: 50, paddingRight: 50 }}
              >
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Your name"
                  onChange={e => this.setState({ name: e.target.value })}
                />
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
                  mutation={SIGNUP_MUTATION}
                  variables={{ email, password, name }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._handleError(error)}
                >
                  {mutation => (
                    <Button
                      icon
                      labelPosition="left"
                      size="large"
                      color="blue"
                      onClick={mutation}
                    >
                      <Icon name="send" />
                      Sign up
                    </Button>
                  )}
                </Mutation>
              </Form>
              {this.state.error && (
                <Message negative>
                  <Message.Header>
                    Sorry we can't create your account!
                  </Message.Header>
                  <p>
                    Some problems occured. Please check your email or password.
                  </p>
                </Message>
              )}
            </Segment>

            <Segment>
              Already joined Friends? <Link to="/login">Login now»</Link>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }

  _confirm = async data => {
    const { token } = data.signup;
    this._saveUserData(token);
    this.props.history.push(`/`);
    console.log({ token });
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  _handleError = error => {
    this.setState({ error: true });
  };
}

export default SignupForm;

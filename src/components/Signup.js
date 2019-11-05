import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Dropdown,
  TextArea
} from "semantic-ui-react";
import { AUTH_TOKEN, USER_INFO } from "../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link, Redirect } from "react-router-dom";

import "../styles/Login.css";

const SIGNUP_MUTATION = gql`
  mutation SignupMutaion(
    $email: String!
    $password: String!
    $name: String!
    $username: String!
    $gender: Gender
    $moto: String
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      username: $username
      gender: $gender
      moto: $moto
    ) {
      user {
        id
        name
        username
        email
        gender
        moto
      }
      token
    }
  }
`;

const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE"
};

const options = [
  { key: 1, text: "Male", value: Gender.MALE },
  { key: 2, text: "Female", value: Gender.FEMALE }
];

class SignupForm extends Component {
  state = {
    error: false,
    email: "",
    password: "",
    username: "",
    name: "",
    moto: "",
    gender: "MALE"
  };

  render() {
    const { email, password, name, username, gender, moto } = this.state;
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
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="at"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <Dropdown
                  fluid
                  onChange={this._handleGenderChange}
                  options={options}
                  placeholder="Your gender"
                  selection
                />
                <p>Remaining characters: {100 - this.state.moto.length}</p>
                <TextArea
                  rows={3}
                  placeholder="Tell us more about yourself"
                  onChange={e => this.setState({ moto: e.target.value })}
                  maxLength={100}
                  style={{ marginBottom: 20 }}
                />

                <Mutation
                  mutation={SIGNUP_MUTATION}
                  variables={{ email, password, name, username, gender, moto }}
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
    const { token, user } = data.signup;
    this._saveUserData(token, user);
    this.props.history.push(`/`);
    // console.log({ token });
  };

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_INFO, JSON.stringify(user));
  };

  _handleError = error => {
    this.setState({ error: true });
  };

  _handleGenderChange = (e, { value }) => {
    this.setState({ gender: value });
  };
}

export default SignupForm;

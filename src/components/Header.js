import React, { Component } from "react";
import {
  Menu,
  Icon,
  Header,
  Container,
  Dropdown
} from "semantic-ui-react";
import { withRouter } from "react-router";
import { AUTH_TOKEN, USER_INFO } from "../constants";
import { getLocalUserInfo } from "../utils";
import SearchUser from "./SearchUser";

class HeaderMenu extends Component {
  state = {
    isLoading: false,
    results: [],
    value: ""
  };
  render() {
    return (
      <Menu borderless>
        <Container>
          <Menu.Item>
            <a href="/">
              <Header color="orange" size="large">
                <Icon name="hashtag" />
                <Header.Content>Friends</Header.Content>
              </Header>
            </a>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>
              <SearchUser />
            </Menu.Item>
            <Menu.Item link active={this.props.feed}>
              <Icon name="hashtag" /> Feed
            </Menu.Item>
            <Menu.Item link active={!this.props.feed}>
              <Icon name="at" /> Mention me
            </Menu.Item>
            <Dropdown item text={<b>{getLocalUserInfo().name}</b>}>
              <Dropdown.Menu>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    localStorage.removeItem(USER_INFO);
                    this.props.history.push("/login");
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default withRouter(HeaderMenu);

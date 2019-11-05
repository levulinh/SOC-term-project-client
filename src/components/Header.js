import React, { Component } from "react";
import {
  Menu,
  Icon,
  Header,
  Container,
  Dropdown,
  Button
} from "semantic-ui-react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
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
            <Link to="/">
              <Header color="blue" size="large">
                <Icon name="fire" />
                <Header.Content>Friends</Header.Content>
              </Header>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <SearchUser />
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>
              <Button.Group color="blue">
                <Button color="blue" basic={!this.props.feed}>
                  Feed
                </Button>
                <Button color="blue" basic={this.props.feed}>
                  Message
                </Button>
              </Button.Group>
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

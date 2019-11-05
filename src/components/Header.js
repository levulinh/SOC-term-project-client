import React, { Component } from "react";
import { Menu, Icon, Header, Container, Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
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
            <Dropdown item text={<b>{getLocalUserInfo().name}</b>}>
              <Dropdown.Menu>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
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

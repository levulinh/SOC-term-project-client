import PropTypes from "prop-types";
import _ from "lodash";
import faker from "faker";
import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

let source = _.times(10, () => ({
  name: faker.name.findName(),
  email: faker.internet.email()
}));

const SEARCH_QUERY = gql`
  query UserSearch($filter: String, $first: Int) {
    users(filter: $filter, first: $first) {
      count
      users {
        id
        name
        email
      }
    }
  }
`;

const resultRenderer = ({ name }) => <b>{name}</b>;

resultRenderer.propTypes = {
  name: PropTypes.string,
  name: PropTypes.string
};

const initialState = { isLoading: false, results: [], value: "" };

export default class SearchExampleStandard extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.name });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    useQuery;

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={value}
        resultRenderer={resultRenderer}
        {...this.props}
      />
    );
  }
}

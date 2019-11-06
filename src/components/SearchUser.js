import PropTypes from "prop-types";
import React, { Component } from "react";
import _ from "lodash";
import { Search } from "semantic-ui-react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

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
  email: PropTypes.string
};

const initialState = { isLoading: false, results: [], value: "" };

class SearchExampleStandard extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.name });

  handleSearchChange = async (e, { value }) => {
    this.setState({ isLoading: true, value });

    const { loading, error, data } = await this.props.client.query({
      query: SEARCH_QUERY,
      variables: { filter: value, first: 10 }
    });

    if (!loading && !error) {
      if (this.state.value.length < 1) return this.setState(initialState);
      this.setState({
        isLoading: false,
        results: data.users.users
      });
    }
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
        placeholder="Input to search"
        noResultsMessage="No user found"
        noResultsDescription="Try @username or email"
        {...this.props}
      />
    );
  }
}

export default withApollo(SearchExampleStandard);

import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Segment, Icon, Label, Input, Image, Form } from 'semantic-ui-react';
import axios from 'axios';

const trendings = ['World', 'Sport', 'Business', 'Sci/Tech']

class Rightbar extends Component {
  state = {
    url: "",
    image_url: "",
    loading: false,
    resultBack: false,
    result: ""
  }
  render() {
    return (
      <Fragment>
        <Segment raised>
          {/* <Header as="h4" color="grey"><Icon name="hashtag" />Trending now</Header> */}
          <Label color="orange" ribbon><Icon name="hashtag" />News tags</Label>
          {_.map(trendings, (t, i) => <div key={i} style={{ marginTop: 10 }}><Label as="a" href="/#" color="teal">{i + 1}<Label.Detail>#{t}</Label.Detail></Label><br /></div>)}
        </Segment>
        <Segment raised>
          {/* <Header as="h4" color="grey"><Icon name="hashtag" />Trending now</Header> */}
          <Label color="orange" ribbon><Icon name="search" />Fun - Which breed is my dog?</Label>
          <Form>
            <Input
              action={{ icon: 'search', onClick: () => this.handleSearch(), disabled: this.state.loading }}
              value={this.state.url}
              onChange={e => this.setState({ url: e.target.value })}
              placeholder='Enter URL...'
              style={{ marginTop: 10 }}
              disabled={this.state.loading}
              fluid />
          </Form>
          {this.state.resultBack ? <Image src={this.state.image_url} fluid /> : null}
          {this.state.result !== '' ? this.renderResult(this.state.result) : null}

        </Segment>
      </Fragment>
    )
  }

  handleSearch = async () => {
    if (this.state.content === '') return null;
    this.setState({ loading: true })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    try {
      const result = await axios.post('http://localhost:2808/dog/predict', {
        url: this.state.url
      }, config)
      this.setState({ result: JSON.stringify(result.data), image_url: this.state.url, loading: false, resultBack: true })
    } catch (error) {

      this.setState({ resutl: null, loading: false, resultBack: false })
    }
  }

  renderResult(result) {
    result = JSON.parse(result)
    return (
      <div>
        <b>Result:<br /></b>
        {result.result.map(
          (res, ii) =>
            <div key={res.label} style={{ marginBottom: 10 }}>
              <Label
                as="a"
                href={`http://google.com/search?q=${res.label}`}
                target="_blank"
                color={ii === 0 ? 'green' : 'grey'}
              >
                {res.label}
                <Label.Detail>{res.confidence.toFixed(2)}%</Label.Detail>
              </Label>
            </div>
        )}
      </div>
    )
  }


}

export default Rightbar;
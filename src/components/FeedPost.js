import React, { Component } from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { timeDifferenceForDate, getLocalUserInfo, renderContentText } from '../utils';

import { Mutation } from 'react-apollo';

import { LOVE_MUTATION, UNLOVE_MUTATION } from '../graph'

class FeedPost extends Component {
  state = { justliked: [], justunliked: [] }

  render() {
    const { postedBy, content, createdAt, loves, comments, id } = this.props.post;
    const user = postedBy;
    const userId = getLocalUserInfo().id;
    return (
      <Feed.Event>
        <Feed.Label>
          <img alt="user avatar" src={user.gender === "MALE" ? "/img/man-sm.png" : "/img/woman-sm.png"} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User as='a' color="orange" href={`/u/${user.username}`}>@{user.username}</Feed.User> added a thought
            <Feed.Date>{timeDifferenceForDate(createdAt)}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {renderContentText(content)}
          </Feed.Extra>
          <Feed.Meta>
            {this.renderLoveButton(loves, userId, id)}
            {this.props.commentButton ?
              (<Feed.Like onClick={this.props.commentAction}>
                <Icon name="comments" />{comments.length} comments
            </Feed.Like>)
              : null}

          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    )
  }

  renderLoveButton(loves, userId, id) {
    let loved = loves.find(l => l.user.id === userId)
    if (loved === undefined || (loved !== undefined && !Object.keys(loved).length)) return (
      <Mutation mutation={LOVE_MUTATION}
        variables={{ thoughtId: id }}
        onCompleted={() => {
          const a = this.state.justliked;
          a.splice(a.indexOf(id), 1);
          this.setState({ justliked: a })
        }}
      >
        {
          loveMutation => (
            <Feed.Like onClick={() => {
              const a = this.state.justliked;
              a.push(id)
              this.setState({ justliked: a })
              loveMutation()
            }
            }>
              <Icon circular={this.state.justliked.includes(id)}
                inverted={this.state.justliked.includes(id)}
                name="like"
                color={this.state.justliked.includes(id) ? "red" : null}
                size={this.state.justliked.includes(id) ? "small" : null} />{this.state.justliked.includes(id) ? loves.length + 1 : loves.length} loves

          </Feed.Like>)
        }
      </Mutation>)

    return (
      <Mutation mutation={UNLOVE_MUTATION}
        variables={{ thoughtId: id }}
        onCompleted={() => {
          const a = this.state.justunliked;
          a.splice(a.indexOf(id), 1);
          this.setState({ justunliked: a })
        }}
      >
        {
          unloveMutation => {
            return (
              <Feed.Like onClick={() => {
                const a = this.state.justunliked;
                a.push(id)
                this.setState({ justunliked: a })
                unloveMutation()
              }}>
                <Icon circular={!this.state.justunliked.includes(id)}
                  inverted={!this.state.justunliked.includes(id)}
                  name="like"
                  color={this.state.justunliked.includes(id) ? null : "red"}
                  size={this.state.justunliked.includes(id) ? null : "small"} />{this.state.justunliked.includes(id) ? loves.length - 1 : loves.length} loves
              </Feed.Like>)
          }
        }
      </Mutation>)
  }
}


export default FeedPost
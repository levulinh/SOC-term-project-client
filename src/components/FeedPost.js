import React, { Component } from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { timeDifferenceForDate } from '../utils';

class FeedPost extends Component {
  render() {
    const { postedBy, content, createdAt, loves, comments } = this.props.post;
    const user = postedBy;
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={user.gender === "MALE" ? "/man-sm.png" : "/woman-sm.png"} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>@{user.username}</Feed.User> added a thought
            <Feed.Date>{timeDifferenceForDate(createdAt)}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {content}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name="like" />{loves.length} loves 
            </Feed.Like>
            <Feed.Like>
            <Icon name="comments" />{comments.length} comments
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    )
  }
}

export default FeedPost
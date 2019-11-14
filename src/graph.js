import gql from 'graphql-tag';

export const CURRENT_QUERY = gql`
  query user($email: String, $username: String) {
    userEntry(email: $email, username: $username) {
      id
      email
      gender
      moto
      name
      username
      followings {
        count
        users {
          username
        }
      }
      followers {
        count
        users {
          username
        }
      }
    }
  }
`;

export const GETPOST_QUERY = gql`
  query getpost($thoughtId: ID!) {
    thought(thoughtId: $thoughtId){
      id
      content
      createdAt
      postedBy {
        id
        name
        gender
        username
      }
      loves{
        id
        user{
          id
        }
      }
      comments{
        id
        content
        createdAt
        postedBy {
          id
          name
          gender
          username
        }
      }
    }
  }
`

export const FEED_QUERY = gql`
  query getFeed($orderBy: ThoughtOrderByInput) {
    getFeed(orderBy: $orderBy)
    {
      count
      thoughts {
        postedBy {
          id
          username
          gender
        }
        id
        content
        createdAt
        loves {
          id
          user {
            id
          }
        }
        comments {
          id
        }
      }
    }
  }
`

export const TIMELINE_QUERY = gql`
  query TimelineQuery($username: String!){
    thoughts(username: $username) {
      count
      thoughts {
        postedBy {
          id
          username
          gender
        }
        id
        content
        createdAt
        loves {
          id
          user {
            id
          }
        }
        comments {
          id
        }
      }
    }
  }
`

export const SEARCH_QUERY = gql`
  query UserSearch($filter: String, $first: Int) {
    users(filter: $filter, first: $first) {
      count
      users {
        id
        name
        email
        username
        followers {
          id
        }
      }
    }
  }
`;

export const LOVE_MUTATION = gql`
  mutation lovePost($thoughtId: ID!) {
    love(thoughtId: $thoughtId){
      thought {
        id
        postedBy {
          id
          username
          gender
        }
        content
        createdAt
        loves {
          id
          user {
            id
          }
        }
        comments {
          id
        }
      }
    }
  }
`

export const UNLOVE_MUTATION = gql`
  mutation unlove($thoughtId: ID!) {
    unlove(thoughtId: $thoughtId){
      id
      postedBy {
        id
        username
        gender
      }
      content
      createdAt
      loves {
        id
        user {
          id
        }
      }
      comments {
        id
      }
    }
  }
`

export const COMMENT_MUTATION = gql`
mutation comment($thoughtId: ID!, $content: String!) {
  comment(
    thoughtId: $thoughtId
    content: $content
  ) {
    id
    postedBy {
      id
      username
      gender
    }
    content
    createdAt
    loves {
      id
    }
    comments{
        id
        content
        createdAt
        postedBy {
          id
          name
          gender
          username
        }
    }
  }
}
`

export const POST_MUTATION = gql`
  mutation post($content: String!){
    post(content: $content) {
      postedBy {
          id
          username
          gender
        }
        id
        content
        createdAt
        loves {
          id
          user {
            id
          }
        }
        comments {
          id
        }
    }
  }
`

export const FOLLOW_MUTATION = gql`
  mutation follow($followId: ID!) {
    follow(followId: $followId) {
      id
      email
      gender
      moto
      name
      username
      followings {
        count
        users {
          username
        }
      }
      followers {
        count
        users {
          username
        }
      }
    }
  }
`

export const UNFOLLOW_MUTATION = gql`
  mutation unfollow($followId: ID!) {
    unFollow(followId: $followId) {
      id
      email
      gender
      moto
      name
      username
      followings {
        count
        users {
          username
        }
      }
      followers {
        count
        users {
          username
        }
      }
    }
  }
`

export const COMMENT_SUBSCRIPTION = gql`
  subscription commentSubscribe($thoughtId: ID!) {
    newComment(thoughtId: $thoughtId){
      id
      content
      createdAt
      postedBy {
        id
        name
        gender
        username
      }
    }
  }
`

export const TIMELINE_SUBSCRIPTION = gql`
  subscription timeline($username: String!) {
    newUserThought(username: $username) {
      postedBy {
          id
          username
          gender
        }
        id
        content
        createdAt
        loves {
          id
          user {
            id
          }
        }
        comments {
          id
        }
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation LoginMutaion($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        username
        gender
        moto
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
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
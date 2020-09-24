import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  users: Array<User>;
  user?: Maybe<User>;
  indexfollowingrelationship: Array<FollowingRelationship>;
  following?: Maybe<FollowingRelationship>;
  followers?: Maybe<Array<FollowingRelationship>>;
  posts: Array<Post>;
  post?: Maybe<Post>;
  postsByAuthor: Array<Post>;
  postUserActions: Array<PostUserAction>;
  postUserAction?: Maybe<PostUserAction>;
  userActionByPost: Array<PostUserAction>;
  usersProfile: Array<UserSettings>;
  userProfile?: Maybe<UserSettings>;
};


export type QueryUserArgs = {
  identifier: Scalars['Int'];
};


export type QueryFollowingArgs = {
  user: Scalars['Int'];
};


export type QueryFollowersArgs = {
  user: Scalars['Int'];
};


export type QueryPostArgs = {
  identifier: Scalars['Int'];
};


export type QueryPostsByAuthorArgs = {
  authot: Scalars['Float'];
};


export type QueryPostUserActionArgs = {
  identifier: Scalars['Int'];
};


export type QueryUserActionByPostArgs = {
  post: Scalars['Float'];
};


export type QueryUserProfileArgs = {
  identifier: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type FollowingRelationship = {
  __typename?: 'FollowingRelationship';
  id: Scalars['String'];
  user: User;
  following: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  content: Scalars['String'];
  initial_balance: Scalars['Float'];
  deserved_count: Scalars['Float'];
  undeserved_count: Scalars['Float'];
  view_count: Scalars['Float'];
  status: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  author: User;
  guilty: User;
};

export type PostUserAction = {
  __typename?: 'PostUserAction';
  id: Scalars['String'];
  post: Post;
  author: User;
  action: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserSettings = {
  __typename?: 'UserSettings';
  id: Scalars['String'];
  notification_comments: Scalars['Boolean'];
  notification_follower: Scalars['Boolean'];
  notification_mentions: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  updateUser?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
  follow: FollowingRelationship;
  unfollow: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  createUserAction: PostUserAction;
  deleteUserAction: Scalars['Boolean'];
  createUserSettings: UserSettings;
  updateUserSettings?: Maybe<UserSettings>;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateUserArgs = {
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationFollowArgs = {
  follow: Scalars['Float'];
  user: Scalars['Float'];
};


export type MutationUnfollowArgs = {
  following: Scalars['Float'];
  user: Scalars['Float'];
};


export type MutationCreatePostArgs = {
  initial_balance: Scalars['Float'];
  content: Scalars['String'];
  guilty: Scalars['Float'];
  author: Scalars['Float'];
};


export type MutationUpdatePostArgs = {
  undeserved_count: Scalars['Float'];
  deserve_count: Scalars['Float'];
  content: Scalars['String'];
  identifier: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  identifier: Scalars['Float'];
};


export type MutationCreateUserActionArgs = {
  action: Scalars['String'];
  post: Scalars['Float'];
  author: Scalars['Float'];
};


export type MutationDeleteUserActionArgs = {
  identifier: Scalars['Float'];
};


export type MutationCreateUserSettingsArgs = {
  notification_mentions: Scalars['Boolean'];
  notification_follower: Scalars['Boolean'];
  notification_comments: Scalars['Boolean'];
};


export type MutationUpdateUserSettingsArgs = {
  notification_mentions?: Maybe<Scalars['Boolean']>;
  notification_follower?: Maybe<Scalars['Boolean']>;
  notification_comments?: Maybe<Scalars['Boolean']>;
  user_id: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'updatedAt' | 'createdAt'>
    )> }
  ) }
);


export const RegisterDocument = gql`
    mutation Register($password: String!, $username: String!, $email: String!, $name: String!) {
  register(options: {password: $password, username: $username}, email: $email, name: $name) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      updatedAt
      createdAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
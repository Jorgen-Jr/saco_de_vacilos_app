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
  indexfollowingrelationship: Array<FollowingRelationship>;
  following?: Maybe<FollowingRelationship>;
  followers?: Maybe<Array<FollowingRelationship>>;
  hello: Scalars['String'];
  posts: Array<Post>;
  post?: Maybe<Post>;
  postsByAuthor: Array<Post>;
  postUserActions: Array<PostUserAction>;
  postUserAction?: Maybe<PostUserAction>;
  userActionByPost: Array<PostUserAction>;
  me?: Maybe<User>;
  users: Array<User>;
  user?: Maybe<User>;
  usersProfile: Array<UserSettings>;
  userProfile?: Maybe<UserSettings>;
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


export type QueryUserArgs = {
  identifier: Scalars['Int'];
};


export type QueryUserProfileArgs = {
  identifier: Scalars['Int'];
};

export type FollowingRelationship = {
  __typename?: 'FollowingRelationship';
  id: Scalars['String'];
  user: User;
  following: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
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
  posts: Array<Post>;
  guiltyPosts: Array<Post>;
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
  active: Scalars['Boolean'];
  authorId: Scalars['Float'];
  author: User;
  guiltyId: Scalars['Float'];
  guilty: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
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
  follow: FollowingRelationship;
  unfollow: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  createUserAction: PostUserAction;
  deleteUserAction: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  updateUser?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  forgotPassword: UserResponse;
  changePassword: UserResponse;
  createUserSettings: UserSettings;
  updateUserSettings?: Maybe<UserSettings>;
};


export type MutationFollowArgs = {
  follow: Scalars['Float'];
  user: Scalars['Float'];
};


export type MutationUnfollowArgs = {
  identifier: Scalars['Float'];
};


export type MutationCreatePostArgs = {
  guilty?: Maybe<Scalars['Float']>;
  input: PostInput;
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
};


export type MutationDeleteUserActionArgs = {
  identifier: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
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


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
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

export type PostInput = {
  content: Scalars['String'];
  initial_balance: Scalars['Float'];
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
  email: Scalars['String'];
  name: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'name' | 'email' | 'updatedAt' | 'createdAt'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'content' | 'initial_balance' | 'deserved_count' | 'undeserved_count' | 'view_count' | 'status' | 'authorId'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'content' | 'deserved_count' | 'undeserved_count' | 'authorId' | 'guiltyId' | 'initial_balance' | 'status' | 'createdAt' | 'updatedAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'name'>
    ), guilty: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'name'>
    ) }
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  name
  email
  updatedAt
  createdAt
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(token: $token, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePostDocument = gql`
    mutation createPost($input: PostInput!) {
  createPost(input: $input) {
    id
    content
    initial_balance
    deserved_count
    undeserved_count
    view_count
    status
    authorId
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    errors {
      field
      message
    }
  }
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    content
    deserved_count
    undeserved_count
    authorId
    guiltyId
    initial_balance
    status
    author {
      username
      name
    }
    guilty {
      username
      name
    }
    createdAt
    updatedAt
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
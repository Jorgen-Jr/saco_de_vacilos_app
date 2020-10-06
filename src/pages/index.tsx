import React, { useEffect, useMemo, useState } from "react";

import Layout from "../components/Layout";

import UserCard from "./../components/UserCard";
import NewPost from "./../components/NewPost";
import Feed from "./../components/Feed";
import { useFeedQuery, useMeQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";

import { createUrqlClient } from "./../util/createUrqlClient";
import Login from "./login";
import { isServer } from "../util/isServer";
import { Flex, Button } from "@chakra-ui/core";

const Dashboard = () => {
  // const [posts, setPosts] = useState([]);

  const [pagination, setPagination] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  const [postData] = useFeedQuery({
    variables: {
      ...pagination,
    },
  });

  if (fetching) {
    // Loading data
  } else if (!data?.me) {
    //user not logged in
    if (!isServer()) {
      return <Login />;
    }
  } else {
    //user is logged in
  }

  // useEffect(() => {
  //   const new_posts = posts;
  //   if (!postData.fetching && postData.data) {
  //     postData.data.feed.forEach((post) => {
  //       new_posts.push(post);
  //     });
  //   }
  //   setPosts(new_posts);
  // }, [postData]);

  const ___posts = [
    {
      id: 1,
      author_id: 1,
      guilty_id: 1,
      content: "Content of de post",
      initial_balance: 4,
      status: "P",
      deserved_count: 24,
      undeserved_count: 2,
      view_count: 0,
      createdAt: "2020-04-12T18:53:02.000Z",
      updatedAt: "2020-04-12T18:53:02.000Z",
      comments: [
        {
          id: 1,
          user_id: 1,
          post_id: 1,
          content: "Content of de comment",
          createdAt: "2020-04-12T19:22:00.000Z",
          updatedAt: "2020-04-12T19:22:00.000Z",
        },
      ],
      author: {
        name: "James",
        username: "007",
        profile: {
          id: 1,
          user_id: 1,
          surname: "Bond",
          bio: "Agente super secreto.",
          profile_picture: "/sjodasd/asdasd/asdj.jpg",
          createdAt: "2020-04-12T18:12:10.000Z",
          updatedAt: "2020-04-12T18:13:47.000Z",
        },
      },
      guilty: {
        name: "James",
        username: "007",
      },
      actions: [
        {
          id: 1,
          user_id: 1,
          post_id: 1,
          action: "U",
          createdAt: "2020-04-12T19:33:40.000Z",
          updatedAt: "2020-04-12T19:34:38.000Z",
        },
      ],
    },
    {
      id: 3,
      author_id: 1,
      guilty_id: 1,
      content: "Content of de post",
      initial_balance: 4,
      status: "P",
      deserved_count: 0,
      undeserved_count: 0,
      view_count: 0,
      createdAt: "2020-04-12T22:59:47.000Z",
      updatedAt: "2020-04-12T22:59:47.000Z",
      comments: [
        {
          id: 3,
          user_id: 1,
          post_id: 1,
          content: "Content of de comment",
          createdAt: "2020-04-12T19:22:09.000Z",
          updatedAt: "2020-04-12T19:22:09.000Z",
        },
      ],
      author: {
        name: "James",
        username: "007",
        profile: {
          id: 1,
          user_id: 1,
          surname: "Bond",
          bio: "Agente super secreto.",
          profile_picture: "/sjodasd/asdasd/asdj.jpg",
          createdAt: "2020-04-12T18:12:10.000Z",
          updatedAt: "2020-04-12T18:13:47.000Z",
        },
      },
      guilty: {
        name: "James",
        username: "007",
      },
      actions: [],
    },
    {
      id: 4,
      author_id: 1,
      guilty_id: 1,
      content: "Content of de post",
      initial_balance: 4,
      status: "P",
      deserved_count: 0,
      undeserved_count: 0,
      view_count: 0,
      createdAt: "2020-04-12T22:59:49.000Z",
      updatedAt: "2020-04-12T22:59:49.000Z",
      comments: [],
      author: {
        name: "James",
        username: "007",
        profile: {
          id: 1,
          user_id: 1,
          surname: "Bond",
          bio: "Agente super secreto.",
          profile_picture: "/sjodasd/asdasd/asdj.jpg",
          createdAt: "2020-04-12T18:12:10.000Z",
          updatedAt: "2020-04-12T18:13:47.000Z",
        },
      },
      guilty: {
        name: "James",
        username: "007",
      },
      actions: [],
    },
    {
      id: 5,
      author_id: 1,
      guilty_id: 1,
      content: "Content of de post",
      initial_balance: 4,
      status: "P",
      deserved_count: 0,
      undeserved_count: 0,
      view_count: 0,
      createdAt: "2020-04-12T22:59:51.000Z",
      updatedAt: "2020-04-12T22:59:51.000Z",
      comments: [],
      author: {
        name: "James",
        username: "007",
        profile: {
          id: 1,
          user_id: 1,
          surname: "Bond",
          bio: "Agente super secreto.",
          profile_picture: "/sjodasd/asdasd/asdj.jpg",
          createdAt: "2020-04-12T18:12:10.000Z",
          updatedAt: "2020-04-12T18:13:47.000Z",
        },
      },
      guilty: {
        name: "James",
        username: "007",
      },
      actions: [],
    },
  ];

  if (!postData.fetching && !postData.data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
      </div>
    );
  }

  return (
    <>
      {fetching ? null : (
        <Layout>
          <div className="app-container">
            <div className="dashboard-container">
              <div style={{ flexGrow: 1, maxWidth: "300px" }}>
                <div>
                  <UserCard data={data} />
                </div>
              </div>
              <div style={{ flexGrow: 1, maxWidth: "unset" }}>
                <div>
                  <NewPost />
                </div>
                <div>
                  {postData.fetching && !postData.data ? (
                    <h1>Carregando...</h1>
                  ) : (
                    <Feed data={postData.data.feed.posts} />
                  )}
                  {postData.data.feed.hasMore ? (
                    <Flex>
                      <Button
                        m="auto"
                        my={8}
                        onClick={() =>
                          setPagination({
                            limit: pagination.limit,
                            cursor:
                              postData.data.feed.posts[
                                postData.data.feed.posts.length - 1
                              ].createdAt,
                          })
                        }
                      >
                        Carregar mais
                      </Button>
                    </Flex>
                  ) : (
                    <div style={{ margin: "auto" }}>
                      Não existem mais vacilos para mostrar
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Dashboard);

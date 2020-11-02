import React, { useState } from "react";

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
          <Flex maxW="1000px">
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
          </Flex>
        </Layout>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Dashboard);

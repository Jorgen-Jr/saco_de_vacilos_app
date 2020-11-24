import { Flex, Text } from "@chakra-ui/core";
import React from "react";

import Post from "../Post";

const Feed = ({ data }) => {
  return (
    <Flex
      borderRadius="10px"
      minH="70px"
      background="white"
      justifyContent="center"
      flexDir="column"
      m="15px"
      pt="15px"
      overflow="hidden"
      minW="550px"
    >
      {data ? (
        data.length > 0 ? (
          data.map((post) => <Post key={post.id} data={post} />)
        ) : (
          <Text as="p">Não existem posts...</Text>
        )
      ) : (
        <Text as="p">Não foram encontrado dados...</Text>
      )}
    </Flex>
  );
};

export default Feed;

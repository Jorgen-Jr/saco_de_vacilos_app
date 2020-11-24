import { Box, Flex, IconButton } from "@chakra-ui/core";
import React from "react";
import { PostsQuery } from "../../generated/graphql";

interface DeservedSectionProps {
  post: PostsQuery["posts"][0];
}

export const DeservedSection: React.FC<DeservedSectionProps> = ({ post }) => {
  async function handleDeserveClick() {
    console.log("haha, merecido");
  }
  async function handleUndeserveClick() {
    console.log("Oh no...");
  }

  return (
    <Flex direction="column" justifyContent="space-around">
      <Box>
        <Flex>
          <IconButton
            variantColor="50"
            color="black"
            onClick={() => handleDeserveClick()}
            aria-label="Deserved"
            icon="chevron-up"
          />
        </Flex>
      </Box>
      <Box textAlign="center">{post.score}</Box>
      <Box>
        <Flex>
          <IconButton
            variantColor="50"
            color="black"
            onClick={() => handleUndeserveClick()}
            aria-label="Not Deserved"
            icon="chevron-down"
          />
        </Flex>
      </Box>
    </Flex>
  );
};

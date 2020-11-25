import { Box, Flex, IconButton } from "@chakra-ui/core";
import React from "react";
import { PostsQuery, useVoteMutation } from "../../generated/graphql";

interface DeservedSectionProps {
  post: PostsQuery["posts"][0];
}

export const DeservedSection: React.FC<DeservedSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  async function handleDeserveClick() {
    await vote({ post_id: post.id, value: 1 });
  }
  async function handleUndeserveClick() {
    await vote({ post_id: post.id, value: -1 });
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

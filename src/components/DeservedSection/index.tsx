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
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Box>
        <div className="post-btn">
          <span className="btn-icon">
            <IconButton
              variantColor="lightgray"
              color="black"
              onClick={() => handleDeserveClick()}
              aria-label="Deserved"
              icon="chevron-up"
            />
          </span>
        </div>
      </Box>
      <Box>{post.deserved_count - post.undeserved_count}</Box>
      <Box>
        <div className="post-btn">
          <span className="btn-icon">
            <IconButton
              variantColor="lightgray"
              color="black"
              onClick={() => handleUndeserveClick()}
              aria-label="Not Deserved"
              icon="chevron-down"
            />
          </span>
        </div>
      </Box>
    </Flex>
  );
};

import React from "react";

import PersonIcon from "@material-ui/icons/Person";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ReceiptIcon from "@material-ui/icons/Receipt";

import { DeservedSection } from "./../DeservedSection";

import { convertToDate } from "./../../util";
import { Flex, Box, Heading, Text } from "@chakra-ui/core";

const Post = ({ data }) => {
  async function handleCommentClick() {}

  return (
    <Flex p="10px">
      <Box>
        <Flex
          background="#666"
          borderRadius="50%"
          h="40px"
          w="40px"
          color="white"
        >
          <PersonIcon className="post-picture-icon" />
        </Flex>
      </Box>
      <Box ml="5px" border="1px solid #ddd" borderRadius="5px" flexGrow={1}>
        <Flex>
          <Box flexGrow={1} m="0 5px" p="10px">
            <Flex>
              <Heading
                display="flex"
                as="h1"
                color="#333"
                fontSize="18px"
                fontWeight="normal"
              >
                <Text color="#666" p="0 5px">
                  @{data.author.username}
                </Text>
                {data.author.name}
              </Heading>
              <Flex
                justifyContent="flex-end"
                color="#666"
                flexGrow={1}
                fontSize="14px"
              >
                <AccessTimeIcon className="created-at-icon" />
                <Text>
                  {convertToDate(data.createdAt).toLocaleDateString("pt-BR") +
                    " " +
                    convertToDate(data.createdAt).getUTCHours() +
                    ":" +
                    convertToDate(data.createdAt).getUTCHours()}
                </Text>
              </Flex>
            </Flex>

            <Text color="#555" p="15px 0" textAlign="left">
              {data.content}
            </Text>

            <Text color="#666" textAlign="right">
              <ReceiptIcon />
              <Text as="span">{data.multiplier * data.score}</Text>
            </Text>
          </Box>

          <DeservedSection post={data} />
        </Flex>
      </Box>
    </Flex>
  );
};
export default Post;

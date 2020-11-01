import React from "react";

import PersonIcon from "@material-ui/icons/Person";
import { MeQuery } from "../../generated/graphql";
import { Flex, Box, Text } from "@chakra-ui/core";

interface UserCardProps {
  data: MeQuery;
}

const UserCard: React.FC<UserCardProps> = ({ data }) => {
  return (
    <Box
      borderRadius="10px"
      background="white"
      width={["250px"]}
      m="15px"
      pt="15px"
    >
      <Flex
        background="#666"
        borderRadius="50%"
        h="80px"
        w="80px"
        m="auto"
        color="white"
      >
        <Flex alignItems="center" m="auto">
          <PersonIcon />
        </Flex>
      </Flex>
      <Box textAlign="center">
        <Text fontSize="16px" fontWeight="bold" m="10px 0">
          {data?.me?.name}
        </Text>
        <Text color="#666" m="10px 0">
          @{data?.me?.username}
        </Text>
        <Text as="p" className="user-bio">
          bio
        </Text>
      </Box>
      <Flex p="10px 0">
        <Box p="5px" flexGrow={1}>
          <Text fontWeight="bold" textAlign="center" color="#666">
            Vacilos
          </Text>
          <Text fontWeight="lighter" fontSize="23px" textAlign="center">
            234
          </Text>
        </Box>
        <Box p="5px" flexGrow={1}>
          <Text fontWeight="bold" textAlign="center" color="#666">
            Peso
          </Text>
          <Text fontWeight="lighter" fontSize="23px" textAlign="center">
            1.325
          </Text>
        </Box>
        <Box p="5px" flexGrow={1}>
          <Text fontWeight="bold" textAlign="center" color="#666">
            Rank
          </Text>
          <Text fontWeight="lighter" fontSize="23px" textAlign="center">
            #1
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserCard;

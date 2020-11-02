import { Flex, Box, Heading, Text } from "@chakra-ui/core";
import React from "react";

interface HomeLayoutProps {}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <Flex overflow="hidden" h="100%">
      {/* //TODO */}
      <Box
        position="absolute"
        top="-50%"
        left={0}
        height={["450px", "150%"]}
        width={["140%", "80%"]}
        zIndex={-10}
        background="linear-gradient(0, #072AC8, #21FA90)"
        style={{ clipPath: "ellipse(43% 75% at 4% 63%)" }}
      ></Box>
      <Box
        display="none"
        position="absolute"
        top={-10}
        left={0}
        height="150%"
        width="80%"
        zIndex={-10}
        className="login-background-2"
      ></Box>
      <Flex
        position={["absolute", "relative"]}
        m={["5px", "unset"]}
        flexDir="column"
        justifyContent="center"
        h="100%"
        maxW="400px"
      >
        <Box color="#ccc" m="auto" p="15px">
          <Heading as="h1" style={{ fontWeight: "bold" }}>
            Rede social apenas para os vacilões.
          </Heading>
          <Heading as="h2" style={{ fontWeight: "lighter" }}>
            Se você nunca vacilou, nem crie uma conta.{" "}
            <Text as="span" fontSize="0.6rem" color="color-200">
              Mas sabemos que já :)
            </Text>
          </Heading>
        </Box>
      </Flex>
      <Box maxW="600px" m="auto" p="15px">
        {children}
      </Box>
    </Flex>
  );
};

export default HomeLayout;

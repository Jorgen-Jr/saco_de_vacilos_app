import React, { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/core";

import PersonIcon from "@material-ui/icons/Person";

import Popover, { ArrowContainer } from "react-tiny-popover";

// import NotificationItem from "./NotificationItem";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../../generated/graphql";

const Header = () => {
  const router = useRouter();
  const [isProfilePopoverOpen, setProfilePopover] = useState(false);
  const [isNotificationPopoverOpen, setNotificationPopover] = useState(false);
  // const [notifications, setNotifications] = useState([]);

  const [{ fetching }, logout] = useLogoutMutation();

  function handleLogout() {
    logout();
  }

  return (
    <Flex
      width="100%"
      justifyContent="space-evenly"
      background="white"
      pos="fixed"
      p="5px"
    >
      <Flex alignItems="center">
        <Link onClick={() => router.push("/")} p="5px">
          Sobre
        </Link>
        <Link onClick={() => router.push("/")} p="5px">
          Ajuda
        </Link>
      </Flex>

      <InputGroup flexGrow={1} maxW="650px">
        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
        <Input type="search" placeholder="O que quer buscar?" />
      </InputGroup>

      <Flex>
        <Popover
          isOpen={isNotificationPopoverOpen}
          position={"bottom"}
          containerStyle={{ overflow: "unset" }}
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={"white"}
              arrowSize={10}
            >
              <Flex
                overflow="hidden"
                background="white"
                borderRadius="7px"
                boxShadow="1px 1px 10px rgb(153, 178, 209)"
                minW="350px"
                flexDir="column"
              >
                <Box maxHeight="600px" overflowY="scroll">
                  {/* {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <>
                        <NotificationItem key={index} data={notification} />
                      </>
                    ))
                  ) : (
                    <Flex
                      minHeight="150px"
                      padding="15px"
                      flexDirection="column-reverse"
                      textAlign="center"
                      color="#555"
                    >
                      <Text as="p">Não existem novas notificações...</Text>
                    </Flex>
                  )} */}
                </Box>
                <Button
                  variant="solid"
                  background="#333"
                  color="white"
                  _hover={{
                    background: "#DDD",
                    color: "#333",
                  }}
                  onClick={handleLogout}
                >
                  <Icon name="chevron-down" />
                </Button>
              </Flex>
            </ArrowContainer>
          )}
        >
          <Flex>
            <Link
              onClick={() => {
                setNotificationPopover(!isNotificationPopoverOpen);
              }}
            >
              <Flex
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                h="40px"
                w="40px"
                background="#eee"
              >
                <Icon name="bell" m="auto" size="24px" color="#333" />
              </Flex>
            </Link>
          </Flex>
        </Popover>

        <Popover
          isOpen={isProfilePopoverOpen}
          position={"bottom"}
          containerStyle={{ overflow: "unset" }}
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={"white"}
              arrowSize={10}
            >
              <Flex
                overflow="hidden"
                background="white"
                borderRadius="7px"
                boxShadow="1px 1px 10px rgb(153, 178, 209)"
                minW="250px"
                flexDir="column"
              >
                <Box maxHeight="600px" overflowY="scroll" p="15px">
                  <Heading as="h1" fontSize="18px">
                    Olá,{" "}
                  </Heading>
                  <Text as="p">
                    Nome de Usuário: <b></b>
                  </Text>
                  <Text as="p">E-Mail:</Text>
                </Box>
                <Flex>
                  <Link
                    flexGrow={1}
                    background="#666"
                    color="white"
                    _hover={{
                      background: "#DDD",
                      color: "#333",
                    }}
                    onClick={() => router.push("/user")}
                  >
                    <Flex alignContent="center" p="7px" justifyContent="center">
                      <Icon name="settings" mt="3px" mr="7px" />
                      Editar
                    </Flex>
                  </Link>
                  <Button
                    borderRadius="0"
                    flexGrow={1}
                    variant="solid"
                    background="rgb(218, 60, 60)"
                    color="white"
                    _hover={{
                      background: "#333",
                      color: "rgb(255, 98, 98)",
                    }}
                    onClick={handleLogout}
                  >
                    <Icon name="small-close" m="7px" />
                    Sair
                  </Button>
                </Flex>
              </Flex>
            </ArrowContainer>
          )}
        >
          <Flex ml="5px">
            <Link
              onClick={() => {
                setProfilePopover(!isProfilePopoverOpen);
              }}
            >
              <Flex
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                h="40px"
                w="40px"
                background="#eee"
              >
                <PersonIcon />
              </Flex>
            </Link>
            <Icon name="triangle-down" m="auto" size="12px" color="#333" />
          </Flex>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default Header;

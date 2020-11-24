import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import SendIcon from "@material-ui/icons/Send";
import { Form, Formik } from "formik";
import { toErrorMap } from "../../util/toErrorMap";

import { FormInput } from "../Form/FormInput";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Box,
  Button,
} from "@chakra-ui/core";

import { useCreatePostMutation } from "../../generated/graphql";

const NewPost = () => {
  const [, createPost] = useCreatePostMutation();

  const [multiplier, setMultiplier] = useState(30);

  function auto_grow(event) {
    let element = document.getElementById(event.currentTarget.id);
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  return (
    <Flex
      borderRadius="10px"
      background="white"
      minH="70px"
      justifyContent="center"
      m="15px"
      pt="15px"
    >
      <Flex w="100%" pl="10px">
        <Flex
          background="#666"
          borderRadius="50%"
          h="40px"
          w="40px"
          color="white"
          mr="10px"
        >
          <PersonIcon className="post-picture-icon" />
        </Flex>

        <Formik
          initialValues={{ content: "", initial_balance: 5 }}
          onSubmit={async (values) => {
            console.log(values, multiplier);

            const { error } = await createPost({ input: values });
            if (!error) {
              console.log("post criado!");
              // router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%", padding: "15px" }}>
              <Box w="100%">
                <FormInput
                  textarea={true}
                  id="new_post_input"
                  onInput={(event) => auto_grow(event)}
                  placeholder="Qual foi seu vacilo de hoje?"
                  className="new-post-input"
                  name="content"
                  label=""
                />
              </Box>

              <Slider
                defaultValue={multiplier}
                onChange={(evt: number) => setMultiplier(evt)}
              >
                <SliderTrack />
                <SliderFilledTrack />
                <SliderThumb />
              </Slider>

              <Box>
                <Flex>
                  {isSubmitting ? null : (
                    <Button
                      variantColor="color-50"
                      className="btn-send"
                      type="submit"
                    >
                      Enviar
                      {/* //TODO Change this send icon (It's from material-ui) */}
                      <SendIcon />
                    </Button>
                  )}
                </Flex>
              </Box>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default NewPost;

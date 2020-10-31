import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import SendIcon from "@material-ui/icons/Send";
import { Form, Formik, getIn } from "formik";
import { toErrorMap } from "../../util/toErrorMap";

import { FormInput } from "../Form/FormInput";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/core";
import { useCreatePostMutation } from "../../generated/graphql";

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc((-50% + 4px))",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const NewPost = () => {
  const [, createPost] = useCreatePostMutation();

  const [multiplier, setMultiplier] = useState(30);

  function auto_grow(event) {
    let element = document.getElementById(event.currentTarget.id);
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  return (
    <div className="dashboard-card">
      <div className="new-post-container">
        <div className="post-profile-pic">
          <PersonIcon className="post-picture-icon" />
        </div>

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
            <Form>
              <div>
                <FormInput
                  textarea={true}
                  id="new_post_input"
                  onInput={(event) => auto_grow(event)}
                  placeholder="Qual foi seu vacilo de hoje?"
                  className="new-post-input"
                  name="content"
                  label=""
                />
              </div>

              <Slider
                defaultValue={multiplier}
                onChange={(evt: number) => setMultiplier(evt)}
              >
                <SliderTrack />
                <SliderFilledTrack />
                <SliderThumb />
              </Slider>

              <div className="new-post-btn-group">
                <div className="popover-btn-group">
                  {isSubmitting ? null : (
                    <button className="btn-send" type="submit">
                      Enviar
                      <SendIcon />
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewPost;

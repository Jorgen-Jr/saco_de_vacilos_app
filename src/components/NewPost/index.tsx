import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import PersonIcon from "@material-ui/icons/Person";
import SendIcon from "@material-ui/icons/Send";

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
  const [content, setContent] = useState("");
  const [initial_balance, setInitialBalance] = useState(5);

  async function handleSend() {
    console.log(content, initial_balance);
  }

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
        <textarea
          id="new_post_input"
          onChange={(event) => setContent(event.target.value)}
          onInput={(event) => auto_grow(event)}
          placeholder="Qual foi seu vacilo de hoje?"
          className="new-post-input"
        />
      </div>
      <div className="post-slider">
        <span>Quanto pesa esse vacilo?</span>
        {/* TODO */}
        {/* <PrettoSlider
          onChange={event => setInitialBalance(event.currentTarget.innerText)}
          scale={(x) => (x / 10).toFixed(0)}
          valueLabelDisplay="auto"
          aria-label="Valor"
          defaultValue={50}
        /> */}
      </div>
      <div className="new-post-btn-group">
        <div className="popover-btn-group">
          <button className="btn-send" onClick={handleSend}>
            Enviar
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

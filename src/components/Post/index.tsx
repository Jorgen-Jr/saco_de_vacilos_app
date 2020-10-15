import React from "react";

import PersonIcon from "@material-ui/icons/Person";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ReceiptIcon from "@material-ui/icons/Receipt";

import { DeservedSection } from "./../DeservedSection";

import { convertToDate } from "./../../util";
import { Flex } from "@chakra-ui/core";
import { Box } from "@chakra-ui/core";

const Post = ({ data }) => {
  async function handleCommentClick() {}

  return (
    <div className="post-container">
      <div className="post-author-pic">
        <div className="post-profile-pic">
          <PersonIcon className="post-picture-icon" />
        </div>
      </div>
      <div className="post-content-container">
        <Flex>
          <div className="post-content">
            <div className="post-header">
              <h1>
                <span className="post-username">@{data.author.username}</span>
                {data.author.name}
                {/* {data.author.profile.surname} */}
              </h1>
              <div className="created-at">
                <AccessTimeIcon className="created-at-icon" />
                <span>
                  {convertToDate(data.createdAt).toLocaleDateString("pt-BR") +
                    " " +
                    convertToDate(data.createdAt).getHours() +
                    ":" +
                    convertToDate(data.createdAt).getMinutes()}
                </span>
              </div>
            </div>
            <p className="post-content-text">{data.content}</p>

            <p className="post-content-value">
              <ReceiptIcon />
              <span>
                {data.initial_balance * data.deserved_count -
                  data.initial_balance * data.undeserved_count}
              </span>
            </p>
          </div>

          <DeservedSection post={data} />
        </Flex>
      </div>
    </div>
  );
};
export default Post;

import React from "react";

import PersonIcon from "@material-ui/icons/Person";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CommentIcon from "@material-ui/icons/Comment";

import { convertToDate } from "./../../util";

const Post = ({ data }) => {
  async function handleDeserveClick() {}
  async function handleUndeserveClick() {}
  async function handleCommentClick() {}

  return (
    <div className="post-container">
      <div className="post-author-pic">
        <div className="post-profile-pic">
          <PersonIcon className="post-picture-icon" />
        </div>
      </div>
      <div className="post-content-container">
        <div className="post-content">
          <div className="post-header">
            <h1>
              {data.author.name} {data.author.profile.surname}
              <span className="post-username">@{data.author.username}</span>
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
              {parseInt(data.initial_balance) +
                parseInt(data.deserved_count) -
                parseInt(data.undeserved_count)}
            </span>
          </p>
        </div>
        <div className="post-btn-group">
          <div className="post-btn">
            <span className="btn-icon">
              <ThumbUpAltIcon className="btn-icon-icon" />{" "}
              <span>{data.deserved_count}</span>
            </span>
          </div>
          <div className="post-btn">
            <span className="btn-icon">
              <ThumbDownIcon className="btn-icon-icon" />{" "}
              <span>{data.undeserved_count}</span>
            </span>
          </div>
          <div className="post-btn">
            <span className="btn-icon">
              <CommentIcon className="btn-icon-icon" />{" "}
              <span>{data.comments.length}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;

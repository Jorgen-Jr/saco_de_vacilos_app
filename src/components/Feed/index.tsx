import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";

import Post from "../Post";

const Feed = ({ data }) => {
  return (
    <div className="dashboard-card">
      {data ? (
        data.length > 0 ? (
          data.map((post) => <Post data={post} />)
        ) : (
          <p>Não existem posts...</p>
        )
      ) : (
        <p>Não foram encontrado dados...</p>
      )}
    </div>
  );
};

export default Feed;

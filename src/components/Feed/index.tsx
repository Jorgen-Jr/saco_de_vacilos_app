import React from "react";

import Post from "../Post";

const Feed = ({ data }) => {
  return (
    <div className="dashboard-card">
      {data ? (
        data.length > 0 ? (
          data.map((post) => <Post key={post.id} data={post} />)
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

import React, { useState } from "react";

import PersonIcon from "@material-ui/icons/Person";

const UserCard = () => {
  return (
    <div className="user-card">
      <div className="user-profile-pic">
        <PersonIcon className="profile-picture-icon" />
      </div>
      <div className="user-data">
        <span className="user-name">"Sara"</span>
        <span className="user-username">@userName</span>
        <p className="user-bio">bio</p>
      </div>
      <div className="user-counters">
        <div className="user-counter">
          <span className="counter-name">Vacilos</span>
          <span className="counter-count">234</span>
        </div>
        <div className="user-counter">
          <span className="counter-name">Peso</span>
          <span className="counter-count">1.325</span>
        </div>
        <div className="user-counter">
          <span className="counter-name">Rank</span>
          <span className="counter-count">#1</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

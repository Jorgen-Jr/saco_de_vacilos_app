import React, { useState } from 'react';
import { connect } from 'react-redux';

import './style.css';

import * as UserActions from '../../../store/actions/user';

import PersonIcon from '@material-ui/icons/Person';

const UserCard = ({ user, dispatch }) => {
    const { persistedLogin } = user;

    const login = persistedLogin;


    return (
        <div className="user-card">
            <div className="user-profile-pic" >
                <PersonIcon className="profile-picture-icon"/>
            </div>
            <div className="user-data">
                <span className="user-name">{login.user.name + " " + login.user.profile.surname}</span>
                <span className="user-username">@{login.user.username}</span>
                <p className="user-bio">{login.user.profile.bio}</p>
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
}

export default connect(state => ({ user: state.user }))(UserCard);
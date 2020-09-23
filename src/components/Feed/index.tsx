import React, { useState } from 'react';
import { connect } from 'react-redux';

import './style.css';

import PersonIcon from '@material-ui/icons/Person';

import Post from '../Post';

const Feed = ({ user, dispatch, data }) => {
    const { persistedLogin } = user;

    const login = persistedLogin;

    return (
        <div className="dashboard-card">
            {data ? data.length > 0 ? data.map(post => (
                <Post data={post}/>
            )): <p>Não existem posts...</p> : <p>Não foram encontrado dados...</p>}
        </div>
    );
}

export default connect(state => ({ user: state.user }))(Feed);
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './style.css';

import * as UserActions from '../../../store/actions/user';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';

import SearchIcon from '@material-ui/icons/Search';

import SettingsIcon from '@material-ui/icons/Settings';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import Popover, { ArrowContainer } from 'react-tiny-popover';

import { FormInput } from '../Form/FormInput';

import NotificationItem from './NotificationItem';

const Header = ({ user, dispatch }) => {
    const [isProfilePopoverOpen, setProfilePopover] = useState();
    const [isNotificationPopoverOpen, setNotificationPopover] = useState();
    const [notifications, setNotifications] = useState([]);
    const { persistedLogin } = user;

    const login = persistedLogin;

    function handleLogout() {
        dispatch(UserActions.logout({}));

        window.location = '/Login';
    }

    return (
        <div className="header-container">
            <h1 className="header-title">
                <Link to="/" className="header-link">Sobre</Link>
                <Link to="/" className="header-link">Ajuda</Link>
            </h1>
            <div className="search-bar">
                <div className="search-icon">
                    <SearchIcon />
                </div>
                <input
                    placeholder="Busca..."
                    className="search-input"
                    inputProps={{ 'aria-label': 'Busca' }}
                />
            </div>
            <div className="header-btn-group">
                <Popover
                    isOpen={isNotificationPopoverOpen}
                    position={'bottom'}
                    containerStyle={{overflow: 'unset'}}
                    content={({ position, targetRect, popoverRect }) => (
                        <ArrowContainer
                            position={position}
                            targetRect={targetRect}
                            popoverRect={popoverRect}
                            arrowColor={'white'}
                            arrowSize={10}
                        >
                            <div className="popover-container" style={{ minWidth:"350px", display: "flex", flexDirection: "column" }}>
                                <div style={{ maxHeight: "600px", overflowY: "scroll" }}>
                                    {notifications.length > 0 ? notifications.map((notification, index) => (
                                        <>
                                            <NotificationItem key={index} data={notification} />
                                        </>
                                    )) :
                                        <div style={{ minHeight: "150px", padding: "15px", display: "flex", flexDirection: "column-reverse", textAlign: "center", color: "#555" }}>
                                            <p>Não existem novas notificações...</p>
                                        </div>
                                    }
                                </div>
                                <button className="btn-popover btn-edit"
                                    onClick={handleLogout}
                                >
                                    <MoreHorizIcon />
                                </button>
                            </div>
                        </ArrowContainer>
                    )} >
                    <div onClick={() => setNotificationPopover(!isNotificationPopoverOpen)} className="header-item">
                        <div className="profile">
                            <NotificationsIcon className="header-icon" />
                        </div>
                    </div>
                </Popover>

                <Popover
                    isOpen={isProfilePopoverOpen}
                    position={'bottom'}
                    containerStyle={{ overflow: 'unset' }}
                    content={({ position, targetRect, popoverRect }) => (
                        <ArrowContainer
                            position={position}
                            targetRect={targetRect}
                            popoverRect={popoverRect}
                            arrowColor={'white'}
                            arrowSize={10}
                        >
                            <div className="popover-container">
                                <div className="popover-content">
                                    <h1 className="profile-username">
                                        Olá, {login.user.name}
                                    </h1>
                                    <p className="profile-info">
                                        Nome de Usuário: <b>{login.user.username}</b>
                                    </p>
                                    <p className="profile-info">
                                        E-Mail: <b>{login.user.email}</b>
                                    </p>
                                </div>
                                <div className="popover-btn-group">
                                    <Link className="btn-popover"
                                        to='/User'
                                    >
                                        <SettingsIcon />
                                        Editar
                                        </Link>
                                    <button className="btn-popover btn-logout"
                                        onClick={handleLogout}
                                    >
                                        <CancelIcon />
                                        Sair
                                    </button>
                                </div>
                            </div>
                        </ArrowContainer>
                    )} >
                    <div onClick={() => setProfilePopover(!isProfilePopoverOpen)} className="header-item">
                        <div className="profile">
                            <PersonIcon className="header-icon"/>
                        </div>
                        <ArrowDropDownIcon className="popover-icon" />
                    </div>
                </Popover>
            </div>
        </div>
    );
}

export default connect(state => ({ user: state.user }))(Header);
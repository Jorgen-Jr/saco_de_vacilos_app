import React from 'react';

import List from '@material-ui/core/List';
import Divider from "@material-ui/core/Divider";

import SidebarItem from './SidebarItem';

import logo from '../../../assets/image/onda_azul_prime.png';

import { push as Menu } from 'react-burger-menu';

import './style.css';

const SourceSidebar = ({ className, items, depthStep, depth, expanded }) => {
    return (
            <div className={className}>
                <div className="sidebar-logo">
                    <img src={logo} alt="Logomarca" />
                </div>
                <List className="menu-itens-container" disablePadding dense>
                    {items.map((sidebarItem, index) => (
                        <React.Fragment key={`${sidebarItem.name}${index}`}>
                            {sidebarItem === "divider" ? (
                                <Divider style={{ margin: "6px 0" }} />
                            ) : (
                                    <SidebarItem
                                        depthStep={depthStep}
                                        depth={depth}
                                        expanded={expanded}
                                        item={sidebarItem}
                                    />
                                )}
                        </React.Fragment>
                    ))}
                </List>
        </div>
    );
}

const Sidebar = ({ items }) => {
    return (
        <>
            <Menu
                pageWrapId={"system_container"}
                outerContainerId={"root"}
            >
                <SourceSidebar className="sidebar-container-responsible" items={items}/>
            </Menu>

            <SourceSidebar className="sidebar-container" items={items}/>
        </>
    )
}
export default (Sidebar);
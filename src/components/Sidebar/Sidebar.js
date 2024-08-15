import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";


function Sidebar({ openModal }) {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <button onClick={openModal}>
                            Add Task
                        </button>
                    </li>
                    <li>
                        <NavLink to="/today" activeClassName="active">
                        Today
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/completed" activeClassName="active">
                        Completed
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/skipped" activeClassName="active">
                        Skipped
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/upcoming" activeClassName="active">
                        Upcoming
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

Sidebar.propTypes = {
    openModal: PropTypes.func
};

export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";


function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul>
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

export default Sidebar;

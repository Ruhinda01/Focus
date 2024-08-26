import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FaPlus, FaClipboardList, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaSignOutAlt, FaChevronLeft } from "react-icons/fa";
import { doSignOut } from "../../auth";


function Sidebar({ openModal }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside className={`bg-gray-800 text-white h-screen flex-shrink-0 ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
            <nav className="flex flex-col h-full">
                <div className="flex items-center justify-between p-2 sm:p-4">
                    {isOpen &&<NavLink to="/today" className="text-lg sm:text-xl font-bold hidden sm:block">FOCUS</NavLink>}
                    <button onClick={toggleSidebar} className="text-white w-full sm:w-auto">
                        <FaChevronLeft className={`mx-auto transform transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} />
                    </button>
                </div>
                <ul className="flex-1 space-y-2 sm:space-y-4 px-2 sm:px-4">
                    <li>
                        <button onClick={() => openModal()} className="flex items-center hover:bg-gray-700 p-2 w-full rounded">
                            <div className="w-8 flex justify-center">
                                <FaPlus className="text-xl" aria-label="Add Task" title="Add Task" />
                            </div>
                            {isOpen && <span className="ml-4 hidden sm:inline">Add Task</span>}
                        </button>
                    </li>
                    <li>
                        <NavLink to="/today" className="flex items-center hover:bg-gray-700 p-2 w-full rounded" activeClassName="bg-gray-700">
                            <div className="w-8 flex justify-center">
                                <FaClipboardList className="text-xl" aria-label="Today" title="Today" />
                            </div>
                            {isOpen && <span className="ml-4 hidden sm:inline">Today</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/completed" className="flex items-center hover:bg-gray-700 p-2 w-full rounded" activeClassName="bg-gray-700">
                            <div className="w-8 flex justify-center">
                                <FaCheckCircle className="text-xl" aria-label="Completed" title="Completed" />
                            </div>
                            {isOpen && <span className="ml-4 hidden sm:inline">Completed</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/skipped" className="flex items-center hover:bg-gray-700 p-2 w-full rounded" activeClassName="bg-gray-700">
                            <div className="w-8 flex justify-center">
                                <FaTimesCircle className="text-xl" aria-label="Skipped" title="Skipped" />
                            </div>
                            {isOpen && <span className="ml-4 hidden sm:inline">Skipped</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/upcoming" className="flex items-center hover:bg-gray-700 p-2 w-full rounded" activeClassName="bg-gray-700">
                            <div className="w-8 flex justify-center">
                                <FaCalendarAlt className="text-xl" aria-label="Upcoming" title="Upcoming" />
                            </div>
                            {isOpen && <span className="ml-4 hidden sm:inline">Upcoming</span>}
                        </NavLink>
                    </li>
                </ul>
                <div className="p-2 sm:p-4">
                    <button onClick={() => doSignOut()} className="flex items-center hover:bg-gray-700 p-2 w-full rounded">
                        <div className="w-8 flex justify-center">
                            <FaSignOutAlt className="text-xl" aria-label="Sign Out" title="Sign Out" />
                        </div>
                        {isOpen && <span className="ml-4 hidden sm:inline">Sign Out</span>}
                    </button>
                </div>
            </nav>
        </aside>
    );
};

Sidebar.propTypes = {
    openModal: PropTypes.func
};

export default Sidebar;


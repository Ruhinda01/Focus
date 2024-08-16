import React from 'react';
import PropTypes from 'prop-types';


function Header({ health, experience }) {
    return (
        <header className="header">
            <h1>Focus</h1>
            <div className='health-bar'>
                <p>Health: {health}</p>
            </div>
            <div className='experience-bar'>
                <p>Experience: {experience}</p>
            </div>
        </header>
    );
};

Header.propTypes = {
    health: PropTypes.number.isRequired,
    experience: PropTypes.number.isRequired
};

export default Header;

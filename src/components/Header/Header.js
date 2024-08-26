import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function Header({ health, experience }) {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 bg-gray-800 text-white shadow-md">
            <Link className='text-2xl font-bold md:text-3xl mb-3 sm:mb-0' to="/today">FOCUS</Link>
            <div className='flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto'>
                <div className='flex items-center justify-between sm:justify-start w-full sm:w-auto mb-2 sm:mb-0'>
                    <p className='mr-2 text-sm sm:text-base'>Health: {health}</p>
                    <div className='w-1/2 sm:w-24 h-3 sm:h-4 bg-gray-700 rounded-full overflow-hidden'>
                        <div className='h-full bg-red-500' style={{ width: `${(health / 100) * 100}%` }}></div>
                    </div>
                </div>
                <div className='flex items-center justify-between sm:justify-start w-full sm:w-auto'>
                    <p className='mr-2 text-sm sm:text-base'>Experience: {experience}</p>
                    <div className='w-1/2 sm:w-24 h-3 sm:h-4 bg-gray-700 rounded-full overflow-hidden'>
                        <div className='h-full bg-blue-500' style={{ width: `${(experience / 100) * 100}%` }}></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    health: PropTypes.number.isRequired,
    experience: PropTypes.number.isRequired
};

export default Header;

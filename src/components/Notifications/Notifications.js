import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const Notification = ({ id, message, type, removeNotification }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => removeNotification(id), 5000);

        return () => clearTimeout(timer);
    }, [id, removeNotification]);

    const typeStyles = {
        success: "bg-green-500 text-white",
        failure: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-white"
    };

    const handleDismiss = () => {
        setVisible(false);
        setTimeout(() => removeNotification(id), 200);
    };

    return (
        <CSSTransition
            in={visible}
            timeout={200}
            classNames="notification"
            unmountOnExit
        >
            <div
                className={`p-3 sm:p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:item-center ${typeStyles[type]} max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg`}
                onClick={handleDismiss}
            >
                <p className="font-bold text-sm sm:text-base mb-2 sm:mb-0 mr-2">{message}</p>
                <button className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors mt-2 sm:mt-0">
                    Dismiss
                </button>
            </div>
        </CSSTransition>
    );
};

Notification.propTypes = {
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'failure', 'info', 'warning']).isRequired,
    removeNotification: PropTypes.func.isRequired
};

export default Notification;

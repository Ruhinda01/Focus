import React from "react";
import { useNotification } from "./NotificationContext";
import Notification from "./Notifications";


const NotificationContainer = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="fixed z-50 flex flex-col items-end space-y-2 sm:space-y-3 md:space-y-4 p-2 sm:p-3 md:p-4 top-12 sm:top-16 md:top-20 right-2 sm:right-3 md:right-4 left-2 sm:left-auto max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    id={notification.id}
                    message={notification.message}
                    type={notification.type}
                    removeNotification={removeNotification}
                />
            ))}
        </div>
    );
};

export default NotificationContainer;

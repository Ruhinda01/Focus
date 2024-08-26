import React from "react";
import PropTypes from "prop-types";
import TaskCard from "../components/TaskCard/TaskCard";


function Completed({ tasks, pendingTask, deleteTask }) {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="header flex justify-start items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Completed</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            pendingTask={pendingTask}
                            deleteTask={deleteTask}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No completed tasks.</p>
                )}
            </div>
        </div>
    );
};

Completed.propTypes = {
    tasks: PropTypes.array.isRequired,
    pendingTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default Completed;

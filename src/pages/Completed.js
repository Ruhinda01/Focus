import React from "react";
import PropTypes from "prop-types";
import TaskCard from "../components/TaskCard/TaskCard";


function Completed({ tasks, pendingTask, deleteTask }) {
    return (
        <div className="completed-tasks">
            <h2>Completed</h2>
            <div className="task-list">
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
                    <p>No completed tasks.</p>
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

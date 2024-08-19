import React from "react";
import PropTypes from "prop-types";
import TaskCard from "../components/TaskCard/TaskCard";


function Skipped({ tasks, pendingTask, deleteTask }) {
    return (
        <div className="skipped-tasks">
            <h2>Skipped Tasks</h2>
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
                    <p>No skipped tasks.</p>
                )}
            </div>
        </div>
    );
};

Skipped.propTypes = {
    tasks: PropTypes.array.isRequired,
    pendingTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default Skipped;

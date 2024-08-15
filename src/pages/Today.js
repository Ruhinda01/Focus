import React from "react";
import PropTypes from "prop-types";
import TaskCard from "../components/TaskCard/TaskCard";

function Today({ tasks, addTask, editTask, deleteTask, openModal }) {
    const todayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        const today = new Date();
        return taskDate.toDateString() === today.toDateString();
    });

    return (
        <div className="today">
            <h2>Today's Tasks</h2>
            <div className="task-list">
                {todayTasks.length > 0 ? (
                    todayTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            editTask={editTask}
                            deleteTask={deleteTask}
                        />
                    ))
                ) : (
                    <>
                        <p>No tasks for today.</p>
                        <button onClick={openModal}>Create Task</button>
                    </>
                )}
            </div>
        </div>
    );
};

Today.propTypes = {
    tasks: PropTypes.array.isRequired,
    addTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    openModal: PropTypes.func
};

export default Today;

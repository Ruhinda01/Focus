import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskModal from "../TaskModal/TaskModal";


const TaskCard = ({ task, editTask, deleteTask }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const formattedDate = new Date(task.dueDate).toLocaleDateString();
    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };
    const handleSaveChanges = (updatedTask) => {
        editTask(task.id, updatedTask);
        setIsEditModalOpen(false);
    };
    // const handleCancel = () => {
    //     setIsEditModalOpen(false);
    // };
    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p>Due Date: {formattedDate}</p>
            <p>{task.description}</p>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            {isEditModalOpen && (
                <TaskModal
                    task={task}
                    onClose={() => setIsEditModalOpen(false)}
                    onAddTask={handleSaveChanges}
                />
            )};
        </div>
    );
};

TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default TaskCard;

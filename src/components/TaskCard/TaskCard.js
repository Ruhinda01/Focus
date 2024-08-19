import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskModal from "../TaskModal/TaskModal";


const TaskCard = ({ task, editTask, deleteTask, completeTask, skipTask, pendingTask }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const formattedDate = new Date(task.dueDate).toLocaleDateString();
    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };
    const handleSaveChanges = (updatedTask) => {
        editTask(updatedTask);
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
            {task.status === "pending" && (
                <>
                    <button onClick={handleEditClick}>Edit</button>
                    <button onClick={() => completeTask(task.id)}>Complete</button>
                    <button onClick={() => skipTask(task.id)}>Skip</button>
                </>
            )}
            {(task.status === "completed" || task.status === "skipped") && (
                <button onClick={() => pendingTask(task.id)}>Respawn</button>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            {isEditModalOpen && (
                <TaskModal
                    task={task}
                    onClose={() => setIsEditModalOpen(false)}
                    onAddTask={handleSaveChanges}
                    onEditTask={handleSaveChanges}
                />
            )}
        </div>
    );
};

TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    completeTask: PropTypes.func.isRequired,
    skipTask: PropTypes.func.isRequired,
    pendingTask: PropTypes.func
};

export default TaskCard;

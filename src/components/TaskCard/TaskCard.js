import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskModal from "../TaskModal/TaskModal";
import { FaEdit, FaCheck, FaTimes, FaTrash } from "react-icons/fa";


const TaskCard = ({ task, editTask, deleteTask, completeTask, skipTask, pendingTask, hideActions }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const formattedDate = new Date(task.dueDate).toLocaleDateString();
    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };
    const handleSaveChanges = (updatedTask) => {
        editTask(updatedTask);
        setIsEditModalOpen(false);
    };

    const priorityColors = {
        urgent: "bg-red-500",
        medium: "bg-orange-500",
        low: "bg-green-500",
    };

    // const handleCancel = () => {
    //     setIsEditModalOpen(false);
    // };
    return (
        <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md relative flex flex-col space-y-4">
            <div className={`w-2 h-full absolute left-0 top-0 rounded-l-lg ${priorityColors[task.priority]}`}></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                <h3 className="font-bold text-md md:text-lg text-gray-800">{task.title}</h3>
                <p className="text-xs md:text-sm font-bold uppercase text-gray-500">Due Date: {formattedDate}</p>
            </div>
            <p className="text-sm md:text-base text-gray-600 flex-grow">{task.description}</p>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                <p className="text-gray-500 font-bold uppercase text-xs md:text-sm">Status: {task.status}</p>
                <div className="flex space-x-2">
                    {task.status === "pending" && !hideActions && (
                        <>
                            <button onClick={handleEditClick} className="relative text-blue-500 hover:text-blue-700">
                                <FaEdit size={20} />
                                <span className="tooltip absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity duration-300">
                                    Edit
                                </span>
                            </button>
                            <button onClick={() => completeTask(task.id)} className="relative text-green-500 hover:text-green-700" title="Complete">
                                <FaCheck size={20} />
                                <span className="tooltip absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity duration-300">
                                    Complete
                                </span>
                            </button>
                            <button onClick={() => skipTask(task.id)} className="relative text-yellow-500 hover:text-yellow-700" title="Skip">
                                <FaTimes size={20} />
                                <span className="tooltip absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity duration-300">
                                    Skip
                                </span>
                            </button>
                        </>
                    )}
                    {(task.status === "completed" || task.status === "skipped") && !hideActions && (
                        <button onClick={() => pendingTask(task.id)} className="text-orange-700 hover:text-orange-900">
                            Respawn
                        </button>
                    )}
                    <button onClick={() => deleteTask(task.id)} className="relative text-red-600 hover:text-red-800" title="Delete">
                        <FaTrash size={20} />
                        <span className="tooltip absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity duration-300">
                            Delete
                        </span>
                    </button>
                </div>
            </div>

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
    completeTask: PropTypes.func,
    skipTask: PropTypes.func,
    pendingTask: PropTypes.func,
    hideActions: PropTypes.bool
};

export default TaskCard;

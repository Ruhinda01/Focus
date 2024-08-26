import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TaskModal = ({ onClose, onAddTask, onEditTask, task, existingTasks, defaultDueDate }) => {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [priority, setPriority] = useState(task?.priority || "medium");
    const initialDueDate = task?.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : (defaultDueDate ? new Date(defaultDueDate).toISOString().split("T")[0] : "");
    const [dueDate, setDueDate] = useState(initialDueDate);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
            if (task.dueDate) {
                const parsedDate = new Date(task.dueDate);
                if (!isNaN(parsedDate)) {
                    setDueDate(parsedDate.toISOString().split("T")[0]);
                }
            }
        } else {
            setTitle("");
            setDescription("");
            setPriority("medium");
            setDueDate(defaultDueDate ? new Date(defaultDueDate).toISOString().split("T")[0] : "");
        }
    }, [task, defaultDueDate]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTask = {
            id: task?.id || Date.now(),
            title,
            description,
            priority,
            dueDate: new Date(dueDate).toISOString(),
            status: task?.status || "pending",
        }
        if (task) {
            console.log("Editing task:", task.id, updatedTask);
            onEditTask(updatedTask);
        } else {
            onAddTask(updatedTask);
        }
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 w-full max-w-lg sm:max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold">{task ? "Edit Task" : "Add Task"}</h2>
                    <label className="block">
                        <span className="text-gray-300">Title:</span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-300">Description:</span>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-300">Priority:</span>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        >
                            <option value="urgent">Urgent</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-300">Due Date:</span>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        />
                    </label>
                    <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-2 sm:space-y-0">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            {task ? "Save Changes" : "Add Task"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};


TaskModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    task: PropTypes.object,
    existingTasks: PropTypes.array,
    defaultDueDate: PropTypes.instanceOf(Date)
};

export default TaskModal;

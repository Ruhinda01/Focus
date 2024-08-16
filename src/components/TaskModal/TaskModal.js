import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TaskModal = ({ onClose, onAddTask, task }) => {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [priority, setPriority] = useState(task?.priority || "medium");
    const [dueDate, setDueDate] = useState(task ? new Date(task.dueDate).toISOString().split("T")[0] : "");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
            setDueDate(new Date(task.dueDate).toISOString().split("T")[0]);
        }
    }, [task]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTask = {
            id: task?.id || Date.now(),
            title,
            description,
            priority,
            dueDate: new Date(dueDate),
            status: task?.status || "pending",
        }
        onAddTask(updatedTask);
        onClose();
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <h2>{task ? "Edit Task" : "Add Task"}</h2>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Priority:
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="urgent">Urgent</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </label>
                    <label>
                        Due Date:
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">{task ? "Save Changes" : "Add Task"}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
};


TaskModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
    task: PropTypes.object
};

export default TaskModal;

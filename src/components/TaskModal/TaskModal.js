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
    onEditTask: PropTypes.func.isRequired,
    task: PropTypes.object,
    existingTasks: PropTypes.array,
    defaultDueDate: PropTypes.instanceOf(Date)
};

export default TaskModal;

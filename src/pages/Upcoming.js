import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PropTypes from "prop-types";
import TaskModal from "../components/TaskModal/TaskModal";
import TaskCard from "../components/TaskCard/TaskCard";


const Upcoming = ({ tasks, addTask, editTask, deleteTask }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (date) => {
        date.setHours(12);
        setSelectedDate(date);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
    }

    const today = new Date();
    const upcomingTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate > today;
    });

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Upcoming</h2>
            <div className="calendar mb-4 md:mb-6">
                <Calendar
                    onClickDay={openModal}
                    className="border border-gray-300 rounded-lg shadow-lg bg-white w-full"
                />
            </div>

            {isModalOpen && (
                <TaskModal
                    onClose={closeModal}
                    onAddTask={(newTask) => {
                        addTask({ ...newTask, dueDate: selectedDate.toISOString().split("T")[0] });
                        closeModal();
                    }}
                    onEditTask={editTask}
                    existingTasks={tasks}
                    defaultDueDate={selectedDate}
                />
            )}

            <div className="grid grid-cols-1 gap-4">
                {upcomingTasks.length > 0 ? (
                    upcomingTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            editTask={editTask}
                            deleteTask={deleteTask}
                            hideActions={true}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No upcoming tasks.</p>
                )}
            </div>
        </div>
    );
};

Upcoming.propTypes = {
    tasks: PropTypes.array.isRequired,
    addTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default Upcoming;

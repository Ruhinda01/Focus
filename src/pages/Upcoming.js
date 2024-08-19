import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PropTypes from "prop-types";
import TaskModal from "../components/TaskModal/TaskModal";


const Upcoming = ({ tasks, addTask, editTask }) => {
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
    return (
        <div>
            <h2>Upcoming</h2>
            <Calendar
                onClickDay={openModal}
            />

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
        </div>
    );
};

Upcoming.propTypes = {
    tasks: PropTypes.array.isRequired,
    addTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired
};

export default Upcoming;

import React from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import TaskCard from "../components/TaskCard/TaskCard";
import { FaPlus } from "react-icons/fa";

function Today({ tasks, addTask, editTask, deleteTask, openModal, completeTask, skipTask, setFocusedTask, setTasks }) {
    const navigate = useNavigate();

    const handleStartDay = () => {
        if (tasks.length > 0) {
            const topTask = tasks[0];
            setFocusedTask(topTask);
            navigate("/focus");
        }
    };

    const todayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        const today = new Date();
        return taskDate.toDateString() === today.toDateString();
    });

    console.log("Today's Tasks:", todayTasks);

    const handleOnDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTasks(items);
    };

    return (
        <div className="bg-gray-100 p-4 sm:p-6 md:p-8 relative min-h-screen">
            <div className="header flex justify-start items-center mb-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Today's Tasks</h2>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {todayTasks.length > 0 ? (
                    <Droppable droppableId="todayTasks">
                        {(provided) => (
                            <div className="space-y-4 mt-4 sm:mt-6" ref={provided.innerRef} {...provided.droppableProps}>
                                    {todayTasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <TaskCard
                                                        key={task.id}
                                                        task={task}
                                                        editTask={editTask}
                                                        deleteTask={deleteTask}
                                                        completeTask={completeTask}
                                                        skipTask={skipTask}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ) : (
                    <p className="text-gray-800 mt-4 sm:mt-6">No tasks for today.</p>
                )}
            </DragDropContext>
            <button
                onClick={() => openModal()}
                className="create-task-btn border-2 border-dashed border-gray-400 text-gray-600 hover:bg-gray-200 focus:outline-none p-4 w-full rounded-md flex items-center justify-center mt-4 sm:mt-6"
            >
                <FaPlus className="mr-2" />
                Create Task
            </button>
            <div className="mt-8 sm:mt-12">
                <button
                    onClick={handleStartDay}
                    className="start-day-btn px-4 sm:px-6 py-2 sm:py-3 mr-4 bg-green-600 text-white font-bold rounded-md focus:outline-none animate-pulse hover:animate-none hover:bg-green-700 w-full sm:w-auto"
                >
                    Start Day
                </button>
            </div>
        </div>
    );
};

Today.propTypes = {
    tasks: PropTypes.array.isRequired,
    addTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    openModal: PropTypes.func,
    completeTask: PropTypes.func.isRequired,
    skipTask: PropTypes.func.isRequired,
    setFocusedTask: PropTypes.func,
    setTasks: PropTypes.func
};

export default Today;

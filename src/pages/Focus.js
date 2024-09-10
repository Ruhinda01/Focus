import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Focus = ({ task, completeTask, skipTask, deleteTask, upcomingTask }) => {
    const [progress, setProgress] = useState(50);
    const [timerValue, setTimerValue] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionType, setSessionType] = useState("focus");

    const minutes = Math.floor(timerValue / 60);
    const seconds = timerValue % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    useEffect(() => {
        let intervalId;
        if (isRunning && timerValue > 0) {
            intervalId = setInterval(() => {
                setTimerValue((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
            if (timerValue <= 0 && sessionType === "focus") {
                setSessionType("break");
                setTimerValue(5 * 60);
            } else if (timerValue <= 0 && sessionType === "break") {
                setSessionType("focus");
                setTimerValue(25 * 60);
            }
        };
    }, [isRunning, timerValue, sessionType]);

    useEffect(() => {
        return () => setProgress(50);
    }, [task]);

    if (!task) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-900">
                <p className="text-white text-3xl">No task to focus on.</p>
            </div>
        );
    }

    const handleComplete = () => {
        completeTask(task.id);
        setProgress(100);
    };

    const handleSkip = () => {
        skipTask(task.id);
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };

    const startTimer = () => {
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTimerValue(25 * 60);
        setIsRunning(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center p-6">
                <div className="w-full flex flex-col md:w-1/3 items-center mb-6 md:mb-0">
                    <div className="w-2/3 max-w-xs mb-4">
                        <CircularProgressbar
                            value={sessionType === "focus" ? (timerValue / (25 * 60)) * 100 : (timerValue / (5 * 60)) * 100}
                            text={formattedTime}
                            styles={buildStyles({
                                textColor: "#fff",
                                pathColor: sessionType === "focus" ? "#38bdf8" : "#4ade80",
                                trailColor: "#1f2937",
                            })}
                        />
                    </div>
                    <div className="w-full flex justify-around mb-4">
                        {isRunning ? (
                            <button onClick={pauseTimer} className="px-4 py-2 bg-yellow-500 text-gray-800 rounded-lg">Pause</button>
                        ) : (
                            <button onClick={startTimer} className="px-4 py-2 bg-green-500 text-gray-800 rounded-lg">Start</button>
                        )}
                        <button onClick={resetTimer} className="px-4 py-2 bg-red-500 text-gray-800 rounded-lg">Reset</button>     
                    </div>
                    <span className="text-sm justify-start mb-4 font-bold">Progress: {progress}%</span>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}></div>
                    </div>
                </div>
                <div className="w-full md:w-2/3 md:ml-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">Today's Focus</h1>
                    <div className="p-4 bg-gray-800 rounded-lg mb-4">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">{task.title}</h2>
                        <div className="flex flex-wrap mb-4">
                            <span className={`px-2 py-1 rounded-lg mr-2 mb-2 uppercase ${task.priority === "low" ? "bg-green-500" : task.priority === "medium" ? "bg-orange-500" : "bg-red-500"}`}>
                                {task.priority}
                            </span>
                            <span className="px-2 py-1 bg-gray-700 rounded-lg uppercase mb-2">
                                Due Date: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-sm mb-6">{task.description}</p>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            <button onClick={handleComplete} className="w-full sm:w-1/3 bg-green-500 px-4 py-2 rounded-lg">Complete</button>
                            <button onClick={handleSkip} className="w-full sm:w-1/3 bg-yellow-500 px-4 py-2 rounded-lg">Skip</button>
                            <button onClick={handleDelete} className="w-full sm:w-1/3 bg-red-500 px-4 py-2 rounded-lg">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center mt-6 md:mt-0">
                <p className="text-white text-xl md:text-2xl text-center mb-4">
                    Focus on your task and when the timer runs out, take a break!
                </p>
                <p className="text-white text-xl md:text-2xl text-center">
                    You have {upcomingTask ? upcomingTask.title : "no"} upcoming task(s).
                </p>
            </div>
        </div>
    )
}

Focus.propTypes = {
    task: PropTypes.object,
    completeTask: PropTypes.func.isRequired,
    skipTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    upcomingTask: PropTypes.object
};

export default Focus;


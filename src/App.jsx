import React, { useEffect, useState } from 'react';
import './TaskApp.css';
import SubTask from "./components/SubTask"

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      initializeTasks();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const initializeTasks = () => {
    const subTasks = {
      Bathroom: [
        { name: 'Vacuuming', completed: false, color: "#c0392b" },
        { name: 'Dust Whiping', completed: false, color: "#a93226" },
        { name: 'Clean Toilet', completed: false, color: "#8e281f" },
        { name: 'Fixing Laundry Machine', completed: false, color: "#731f19" },
        { name: 'Clean The Mirror', completed: false, color: "#5c1713" },
      ],
      Livingroom: [
        { name: 'Vacuuming', completed: false, color: "#d36b1f" },
        { name: 'Dust Whiping', completed: false, color: "#bf591c"},
        { name: 'Clean The Couch', completed: false, color: "#ab4619" },
        { name: 'Clean The Windows', completed: false, color: "#972416" },
        { name: 'Mopping', completed: false, color: "#831313" },
        { name: 'Wipe The Tables', completed: false, color: "#6f1010" },
      ],
      Bedroom: [
        { name: 'Vacuuming', completed: false, color: "#2e84c8" },
        { name: 'Changing Bed Sheets', completed: false, color: "#2771b5" },
        { name: 'Dust Whiping', completed: false, color: "#205e9f" },
        { name: 'Clean The Mirror', completed: false, color: "#1a4b89" },
        { name: 'Refill Diffuser', completed: false, color: "#143773" },
      ],
      Kitchen: [
        { name: 'Cleaning Countertops', completed: false, color: "#82d997" },
        { name: 'Doing Dishes', completed: false, color: "#77dd86" },
        { name: 'Clean The Windows', completed: false, color: "#5dcf68" },
        { name: 'Check The Fridge', completed: false, color: "#45c34c" },
        { name: 'Check The Oven/Furnace', completed: false, color: "#2eb631" },
      ],
      Garden: [
        { name: 'Watering Plants', completed: false, color: "#894ea9" },
        { name: 'Brushing', completed: false, color: "#75459c" },
        { name: 'Recycle', completed: false, color: "#623b8f" },
      ],
    };

    const initialTasks = Object.keys(subTasks).map((room) => ({
      room,
      subTasks: subTasks[room],
    }));

    setTasks(initialTasks);
  };

  const handleRoomChange = (room) => {
    setCurrentRoom(room);
  };

  const handleSubTaskToggle = (taskIndex, subTaskIndex) => {
    setTasks((prevTasks) => {
    const updatedTasks = [...prevTasks];
    const task = updatedTasks[taskIndex];
    const subTasks = [...task.subTasks];
    const updatedSubTask = { ...subTasks[subTaskIndex] };
    updatedSubTask.completed = !updatedSubTask.completed;
    subTasks[subTaskIndex] = updatedSubTask;
    task.subTasks = subTasks;
    return updatedTasks;
  });
  };

  const getButtonClassName = (room) => {
    const task = tasks.find((task) => task.room === room);
    if (!task) return '';
    const completedTasks = task.subTasks.filter((subTask) => subTask.completed);
    if (completedTasks.length === task.subTasks.length) {
      return `room-button ${room} completed`;
    }
    return `room-button ${room}`;
  };

  const isRoomCompleted = (room) => {
    const task = tasks.find((task) => task.room === room);
    if (!task) return false;
    const completedTasks = task.subTasks.filter((subTask) => subTask.completed);
    return completedTasks.length === task.subTasks.length;
  };

  const changeTitleShadow = () => {
    switch(currentRoom){
      case "Bathroom":
        return '0px 0px 5px #e74c3c, 0px 0px 10px #e74c3c, 0px 0px 10px #e74c3c, 0px 0px 20px #e74c3c'
      case "Livingroom":
        return '0px 0px 5px #e67e22, 0px 0px 10px #e67e22, 0px 0px 10px #e67e22, 0px 0px 20px #e67e22'
      case "Bedroom":
        return '0px 0px 5px #3498db, 0px 0px 10px #3498db, 0px 0px 10px #3498db, 0px 0px 20px #3498db'
      case "Kitchen":
        return '0px 0px 5px #2ecc71, 0px 0px 10px #2ecc71, 0px 0px 10px #2ecc71, 0px 0px 20px #2ecc71'
      case "Garden":
        return '0px 0px 5px #9b59b6, 0px 0px 10px #9b59b6, 0px 0px 10px #9b59b6, 0px 0px 20px #9b59b6'
    }
  }

  return (
    <div className="task-app">
      <h1 className='task-title' style={{textShadow: `${changeTitleShadow()}`}}>Task App</h1>
      <div className="room-list">
        <div className="room-button-list">
          {tasks.map((task, index) => (
            <button
              key={index}
              className={`${getButtonClassName(task.room)} ${
                task.room === currentRoom ? 'active' : ''
              }`}
              onClick={() => handleRoomChange(task.room)}
            >
              <p className='room-button-name'>{task.room}</p> {isRoomCompleted(task.room) && <span className='room-button-star'>&#9733;</span>}
            </button>
          ))}
        </div>
      </div>
      {currentRoom && (
        <div className="task-list">
          {tasks.map(
            (task, index) =>
              task.room === currentRoom && (
                <div key={index} className="task-container">
                  <div>
                    {task.subTasks.map((subTask, subIndex) => (
                      <SubTask 
                        key={subIndex} 
                        className={`sub-task ${subTask.completed ? 'completed' : ''}`} 
                        onClick={() => handleSubTaskToggle(index, subIndex)}
                        name={subTask.name}
                        color={subTask.color}
                        currentRoom={currentRoom}
                        number={subIndex + 1}
                        completed={subTask.completed}
                      />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default App;

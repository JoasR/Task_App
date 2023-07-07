import React, { useEffect, useState } from 'react';
import './TaskApp.css';

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
        { name: 'Vacuuming', completed: false },
        { name: 'Cleaning', completed: false },
      ],
      Livingroom: [
        { name: 'Vacuuming', completed: false },
        { name: 'Dusting', completed: false },
      ],
      Bedroom: [
        { name: 'Vacuuming', completed: false },
        { name: 'Changing Bed Sheets', completed: false },
      ],
      Kitchen: [
        { name: 'Cleaning Countertops', completed: false },
        { name: 'Doing Dishes', completed: false },
      ],
      Garden: [
        { name: 'Watering Plants', completed: false },
        { name: 'Brushing', completed: false },
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
      const subTask = task.subTasks[subTaskIndex];
      subTask.completed = !subTask.completed;
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

  return (
    <div className="task-app">
      <h1>Task App</h1>
      <div className="room-list">
        <h2>Select Room</h2>
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
          <h2>Tasks</h2>
          {tasks.map(
            (task, index) =>
              task.room === currentRoom && (
                <div key={index} className="task-container">
                  <h3>{task.room}</h3>
                  <ul>
                    {task.subTasks.map((subTask, subIndex) => (
                      <li
                        key={subIndex}
                        className={`sub-task ${
                          subTask.completed ? 'completed' : ''
                        }`}
                        onClick={() => handleSubTaskToggle(index, subIndex)}
                      >
                        {subTask.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default App;

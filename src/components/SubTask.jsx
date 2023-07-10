import React from 'react'
import "../TaskApp.css"

const SubTask = ({name, color, currentRoom, number, onClick, completed}) => {

const getBgcFromCurrentRoom = () => {
    if(currentRoom === "Bathroom"){
        return "#f7baba"
    } else if (currentRoom === "Livingroom"){
        return "#f7c9a6"
    } else if (currentRoom === "Bedroom"){
        return "#a8c9e9"
    } else if (currentRoom === "Kitchen"){
        return "#d7f7d1"
    } else if (currentRoom === "Garden"){
        return "#c59ed6"
    }
}
  return ( 
    <div className='container-wrapper' onClick={onClick}>
        <div className="container" style={{backgroundColor: `${getBgcFromCurrentRoom()}`}}>
            <div className="figure-container">
                <div className="square" style={{backgroundColor: `${color}`}}></div>
                <div className="triangle-right" style={{borderLeft: `50px solid ${color}`}}>
            </div>
            
            <div className="text-container">
                <div className="text">{number.toString().padStart(2, '0')}</div>
            </div>
            </div>
            <div className="content-container" style={{color: `${color}`}}>
                <h1>{name}</h1>
            </div>
            {
                completed &&
                <span className='completed-subtask-star'>&#9733;</span>
            }
            
        </div>
    </div>
  )
}

export default SubTask
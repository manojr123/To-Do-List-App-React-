import React, {useState, useRef} from 'react'
import logo from './logo.svg'
import './App.css'

function App() {

const [todoList, setTodoList ] = useState([]);
const [currentTask, setCurrentTask] = useState("")
const [editTaskData, seteditTaskData] = useState("")
const [editTask, setEditTask] = useState(false)

const inputTask = useRef(null)


const addTask = () => {
    setTodoList([...todoList, { task: currentTask, complete : false }])
    inputTask.current.value = ""
    setCurrentTask=""
}

const deleteTask = (taskToDelete) =>  {
    setTodoList(
        todoList.filter( (task)=> {
         return task.task !== taskToDelete
    })
    );

};

const completeTask = (taskToComplete) => {
    setTodoList(
        todoList.map( (task)=> {
         return (task.task === taskToComplete) ? 
                   {task : taskToComplete, complete : true} :
                   {task: task.task, complete : task.complete? true : false } 
    })   );

}


const editTaskFn = (event, taskToEdit) => {

    console.log('Fn editTaskFn : TaskToEdit', taskToEdit);
    //console.log('Fn editTaskFn : event', event);
    //console.log('Fn editTaskFn : event.target.parentElement', event.target.parentElement);
    //console.log('Fn editTaskFn : event.target.parentElement.parentElement', event.target.parentElement.parentElement);

    let li = event.target.parentElement.parentElement.querySelector("li");
    li.setAttribute("contenteditable", true);
    li.focus();
    setEditTask(true);
    setCurrentTask(taskToEdit);



    /*
    setTodoList(
        todoList.map( (task)=> {
         return (task.task === taskToComplete) ? 
                   {task : taskToComplete, complete : true} :
                   {task: task.task, complete : task.complete? true : false } 
    })   );
*/
}
const saveTaskFn = (event, taskToSave ) => {


        console.log('saveTaskFn event :',event);

        let li = event.target.parentElement.parentElement.querySelector("li");
        li.setAttribute("contenteditable", false);
        setEditTask(false);
    
    setTodoList(
        todoList.map( (task)=> {
         return (task.task === taskToSave) ? 
                   {task : taskToSave, complete : task.complete} :
                   {task: task.task, complete : task.complete } 
    })   );



}

const storeEditTask = (event) => {
        seteditTaskData(event.target.value);
}

	return (
		<div className="App">
            <h1> Todo List </h1>
                <input 
                  ref={inputTask}
                  type="text" 
                  placeholder="Task"
                  onKeyDown={ (event ) => {
                    console.log('event', event.keyCode )
                    if(event.keyCode === 13) {
                         addTask()
                  }}}
                  onChange= { (event) => 
                    setCurrentTask(event.target.value) 
                  }
                />
                <button className="add" onClick = {addTask}> Add Task </button>
            <div>
                <hr/>
            </div>
            <ul>
                { todoList.map( (value, index) =>
                    { return (
                        <div id="task">
                          { console.log('value', value) }

                          <li onChange = {storeEditTask }>
                           {value.complete ? <del> {value.task}</del> :value.task}
                            </li> 
                           <button className="edit" 
                              onClick= { ()=> completeTask(value.task )  }>
                              <i class="fa-solid fa-square-check"></i>
                            </button>
                            { console.log('value2', value) }
                            { console.log('editTask', editTask) }

                            {editTask && (value.task === currentTask) ?
                            <button className="save" onClick= { (e)=> saveTaskFn(e,value.task )  }> <i class="fa-solid fa-floppy-disk"></i></button>
                            :<button className="edit" 
                              onClick= { (e)=> editTaskFn(e, value.task )  } > <i class="fa-solid fa-pen-to-square"></i></button>
                            }
                           <button className="edit" onClick={(e)=> deleteTask(e, value.task)}> X </button>
                        </div>
                    )}
                )}

            </ul>
		</div>
	)
}

export default App










//                         {value.complete ? <h1> Task Completed </h1>: <h1> Task Not Completed </h1>}

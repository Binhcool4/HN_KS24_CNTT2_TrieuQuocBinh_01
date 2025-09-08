import React from "react"
import { DeleteOutlined} from '@ant-design/icons'
import { Checkbox} from "antd"

interface Todo {
    id: number
    name: string
    completed: boolean
}
type Action = | {type: 'add', payload: string}
| {type: 'toggle', payload: number}
| {type: 'delete', payload: number}
| {type: 'edit', payload: {id: number, name: string}}

function reducer (state: Todo[], action: Action): Todo[] {
    switch (action.type) {
        case "add":
            if(!action.payload.trim()) return state
                return [...state, {id: Date.now(), name: action.payload, completed: false}]
        case "toggle":
            return state.map(todo => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
        case "delete":
            return state.filter(todo => todo.id !== action.payload)
        case "edit":
            return state.map(todo => todo.id === action.payload.id ? {...todo, name: action.payload.name} : todo)
        default: return state
    }
}

export default function De1() {
    const [newTask, setNewTask] = React.useState<string>("")
    //localStorage
    const [todoList, dispatch] = React.useReducer(reducer, 
    [
        {id: 1, name: 'Code a todo list', completed: false},
        {id: 2, name: 'Learn React TypeScript', completed: true}
    ])
    return (
        <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="w-[400px] py-9 text-white bg-[#ea586a] flex flex-col gap-6 p-1">
                <header className="px-10">
                    <h2 className="text-2xl">Todo List</h2>
                    <p className="text-sm">Get things done, one item at a time</p>
                </header>
                <main>
                    <ul>
                        {todoList.map(todo => (
                            <li key={todo.id} className="flex justify-between items-center mb-4 bg-[#e4818d] px-9 py-3">
                                <span style={{
                                    textDecoration: todo.completed ? "line-through" : ""
                                }}>{todo.name}</span>
                                <div className="flex items-center gap-3">
                                    <Checkbox type="checkbox" onChange={() => {
                                        dispatch({type: 'toggle', payload: todo.id})
                                        localStorage.setItem('todoList', JSON.stringify(todoList))
                                    }} checked={todo.completed}/>
                                    <button onClick={() => {
                                        dispatch({type: 'delete', payload: todo.id})
                                        localStorage.setItem('todoList', JSON.stringify(todoList))
                                    }} className="cursor-pointer"><DeleteOutlined  size={20}/></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end p-3">
                        <p className="text-sm mr-3">Move done items at the end? </p>
                        <input type="checkbox" />
                    </div>
                </main>
                <footer className="flex flex-col px-9">
                    <label htmlFor="name" className="flex justify-start">Add to the todo list</label>
                    <div className="flex justify-between">
                        <input type="text" value={newTask} onChange={event => setNewTask(event.target.value)} className="p-2 bg-white text-gray-700"/>
                        <button onClick={() => {
                            dispatch({type: 'add', payload: newTask})
                            localStorage.setItem('todoList', JSON.stringify(todoList))
                            setNewTask("")
                        }} className="border-1 px-2 rounded">ADD ITEM</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}
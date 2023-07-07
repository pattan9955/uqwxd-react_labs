import React from "react";
import "./App.css";
const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    // Add the handlesubmit code here
    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false
        };

        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
            setTodo("");
        } else {
            alert("Enter a valid task");
            setTodo("");
        }
    }

    // Add the deleteToDo code here
    function deleteToDo(id) {
        let updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    // Add the toggleComplete code here
    function toggleComplete(id) {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    // Add the submitEdits code here
    function submitEdits(id) {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }

    React.useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedToDos = JSON.parse(json);
        if (loadedToDos) {
            setTodos(loadedToDos);
        }
    }, []);

    React.useEffect(() => {
        if (todos.length > 0) {
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
    }, [todos]);

    return (
        <div id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                    placeholder="Add a task"
                />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) =>
                <div className="todo" key={todo.id}>
                    <div className="todo-text">
                        <input type="checkbox" id="completed" checked={todo.completed} onChange={evt => toggleComplete(todo.id)} />
                        {todoEditing === todo.id
                            ? <input type="text" onChange={evt => setEditingText(evt.target.value)} />
                            : todo.text}
                    </div>
                    <div className="todo-actions">
                        {todoEditing === todo.id
                            ? <button onClick={evt => submitEdits(todo.id)}>Submit Edits</button>
                            : <button onClick={evt => setTodoEditing(todo.id)}>Edit</button>}
                        <button onClick={evt => deleteToDo(todo.id)}>Delete</button>
                    </div>
                </div>)}
        </div>
    );
};
export default App;

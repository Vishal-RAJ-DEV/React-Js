import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ToDoList = () => {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showfinshed, SeTShowfinshed] = useState(true);

  useEffect(() => {
    let todosString = localStorage.getItem("Todos");
    if (todosString) {
      let todos = JSON.parse(todosString);
      setTodos(todos);
    }
  }, []);

  const handleShow = () => {
    SeTShowfinshed(!showfinshed);
  };

  const SaveTodos = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  };

  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, iscomplete: false }]);
    setTodo("");
    SaveTodos();
  };

  const handleEdit = (e, id) => {
    let t = Todos.filter(i => i.id === id);
    setTodo(t[0].Todo);
    let newTodos = Todos.filter(item => item.id !== id);
    setTodos(newTodos);
    SaveTodos();
  };

  const handleDelete = (e, id) => {
    let newTodos = Todos.filter(item => item.id !== id);
    setTodos(newTodos);
    SaveTodos();
  };

  const handleChekbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => item.id === id);
    let newtodos = [...Todos];
    newtodos[index].iscomplete = !newtodos[index].iscomplete;
    setTodos(newtodos);
    SaveTodos();
  };

  return (
    <>
    <div className='flex justify-center items-center h-screen p-6 '>
    <div className="bg-violet-200  w-full max-w-lg rounded mt-10 p-4 px-6   ">
        <div className="mb-4">
          <h2 className="text-center font-bold text-2xl">iTask - Handle your todos</h2>
          <h2 className="text-blue-700 mt-4 mb-2">Add Todo</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              className="bg-amber-50 rounded-2xl px-4 py-2 border border-gray-300 w-full"
              value={Todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button
              onClick={handleAdd}
              disabled={Todo.length <= 3}
              className="bg-green-700 px-4 py-2 rounded-2xl hover:bg-violet-600 transition-all duration-700 text-sm font-bold text-white disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input onChange={handleShow} type="checkbox" checked={showfinshed} />{" "}
          Show Finished Todos
        </div>

        <h2 className="font-bold">Your Todos</h2>
        <div className="flex flex-col gap-4 mt-4">
          {Todos.length === 0 && <div>No Todos to display</div>}
          {Todos.map(item => (
            (showfinshed || !item.iscomplete) && (
              <div key={item.id} className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2 bg-white rounded p-3 shadow">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <input
                    name={item.id}
                    onChange={handleChekbox}
                    type="checkbox"
                    checked={item.iscomplete}
                  />
                  <div className={item.iscomplete ? "line-through" : ""}>{item.Todo}</div>
                </div>
                <div className="flex gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-500 md:px-4 md:py-2 px-3 py-1  rounded-2xl hover:bg-violet-600 transition-all duration-700 text-sm font-bold text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-red-400 px-4 py-2 rounded-2xl hover:bg-violet-600 transition-all duration-700 text-sm font-bold text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
      
    </>
  );
};

export default ToDoList;

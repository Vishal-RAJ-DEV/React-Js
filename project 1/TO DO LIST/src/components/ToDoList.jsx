import React, { useEffect, useState, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import gsap from 'gsap';

const ToDoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(() => {
    const saved = localStorage.getItem("showFinished");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isLoading, setIsLoading] = useState(true);
  const todosContainer = useRef(null);
  const animationsRef = useRef({});
  const headerRef = useRef(null);
  const addTaskRef = useRef(null);
  const todoslist = useRef({});

  // Load todos from localStorage
  useEffect(() => {
    const loadTodos = () => {
      try {
        const todosString = localStorage.getItem("Todos");
        if (todosString) {
          const parsedTodos = JSON.parse(todosString);
          setTodos(Array.isArray(parsedTodos) ? parsedTodos : []);
        }
      } catch (error) {
        console.error("Error loading todos:", error);
        setTodos([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Initial animation
  useEffect(() => {
    if (!isLoading) {
      // Animate ToDo list container from left
      gsap.from('.todo-container', {
        duration: 0.7,
        x: -100,
        opacity: 0,
        ease: "power3.out",
        clearProps: "all"
      });
      // Animate header from right
      gsap.from(headerRef.current, {
        duration: 0.7,
        x: 100,
        opacity: 0,
        delay: 0.2,
        ease: "power3.out",
        clearProps: "all"
      });
      // Animate Add Task section from right
      gsap.from(addTaskRef.current, {
        duration: 0.7,
        x: 100,
        opacity: 0,
        delay: 0.4,
        ease: "power3.out",
        clearProps: "all"
      });
    }
  }, [isLoading]);
  // Animate new todo items when added
  useEffect(() => {
    const lastTodo = todos[todos.length - 1];
    if (lastTodo && !isLoading) {
      const todoElement = document.getElementById(`todo-${lastTodo.id}`);
      if (todoElement) {
        gsap.fromTo(todoElement, 
          {
            y: -50,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            clearProps: "all"
          }
        );
      }
    }
  }, [todos, isLoading]);
  // Animate todo items from up to down after container animation
 

  // Save todos to localStorage
  const saveTodos = useCallback((newTodos) => {
    try {
      localStorage.setItem("Todos", JSON.stringify(newTodos));
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  }, []);

  // Save showFinished state
  useEffect(() => {
    localStorage.setItem("showFinished", JSON.stringify(showFinished));
  }, [showFinished]);

  // Handle show/hide completed todos
  const handleShow = useCallback(() => {
    setShowFinished(prev => !prev);
  }, []);

  // Handle add todo
  const handleAdd = useCallback(() => {
    if (todo.trim().length <= 3) return;

    const newTodo = {
      id: uuidv4(),
      todo: todo.trim(),
      isComplete: false,
      createdAt: new Date().toISOString()
    };

    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo];
      saveTodos(updatedTodos);
      return updatedTodos;
    });

    setTodo("");

    // Animate add button
    gsap.to(".add-button", {
      scale: 1.05,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      clearProps: "all"
    });
  }, [todo, saveTodos]);

  // Handle edit todo
  const handleEdit = useCallback((e, id) => {
    e.preventDefault();
    const todoToEdit = todos.find(item => item.id === id);
    if (!todoToEdit) return;

    // Cancel any ongoing animations
    if (animationsRef.current[id]) {
      animationsRef.current[id].kill();
    }

    // Animate item removal
    animationsRef.current[id] = gsap.to(`#todo-${id}`, {
      duration: 0.3,
      x: -20,
      opacity: 0.5,
      onComplete: () => {
        setTodo(todoToEdit.todo);
        setTodos(prevTodos => {
          const newTodos = prevTodos.filter(item => item.id !== id);
          saveTodos(newTodos);
          return newTodos;
        });
        delete animationsRef.current[id];
      }
    });
  }, [todos, saveTodos]);

  // Handle delete todo
  const handleDelete = useCallback((e, id) => {
    e.preventDefault();

    // Cancel any ongoing animations
    if (animationsRef.current[id]) {
      animationsRef.current[id].kill();
    }

    // Animate before deleting
    animationsRef.current[id] = gsap.to(`#todo-${id}`, {
      duration: 0.3,
      x: 20,
      opacity: 0,
      onComplete: () => {
        setTodos(prevTodos => {
          const newTodos = prevTodos.filter(item => item.id !== id);
          saveTodos(newTodos);
          return newTodos;
        });
        delete animationsRef.current[id];
      }
    });
  }, [saveTodos]);

  // Handle checkbox
  const handleCheckbox = useCallback((e) => {
    const id = e.target.name;
    
    setTodos(prevTodos => {
      const newTodos = prevTodos.map(item => 
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      );
      saveTodos(newTodos);
      return newTodos;
    });

    // Animate checkbox completion
    gsap.to(`#todo-text-${id}`, {
      duration: 0.2,
      scale: 1.05,
      yoyo: true,
      repeat: 1,
      clearProps: "all"
    });
  }, [saveTodos]);

  // Handle keyboard events
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && todo.trim().length > 3) {
      handleAdd();
    }
  }, [todo, handleAdd]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6">
      <div className="todo-container max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div ref={headerRef} className="bg-gradient-to-r from-violet-500 to-purple-500 p-6">
          <h2 className="text-center font-bold text-3xl text-white mb-2">
            iTask
          </h2>
          <p className="text-center text-violet-100">Manage your tasks efficiently</p>
        </div>
        
        <div className="p-6">
          <div ref={addTaskRef} className="mb-6">
            <h2 className="text-violet-700 font-semibold mb-3">Add New Task</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                className="flex-1 px-4 py-3 rounded-xl border border-violet-100 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none bg-violet-50"
                placeholder="What needs to be done?"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleAdd}
                disabled={todo.trim().length <= 3}
                className="add-button bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-3 rounded-xl text-white font-semibold hover:from-violet-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showFinished}
                  onChange={handleShow}
                />
                <div className={`w-10 h-6 rounded-full shadow-inner transition-colors duration-300 ${showFinished ? 'bg-violet-500' : 'bg-gray-200'}`}></div>
                <div className={`dot absolute w-4 h-4 bg-white rounded-full shadow transition-all duration-300 left-1 top-1 ${showFinished ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                Show Completed Tasks
              </div>
            </label>
          </div>

          <div ref={todosContainer} className="space-y-3">
            {todos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No tasks to display. Add your first task!
              </div>
            )}
            
            {todos
              .filter(item => showFinished || !item.isComplete)
              .map(item => (
                <div
                  key={item.id}
                  id={`todo-${item.id}`}
                  className="todo-item group bg-white rounded-xl p-4 border border-violet-100 hover:border-violet-300 shadow-sm hover:shadow transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <label className="relative flex-shrink-0">
                        <input
                          name={item.id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          checked={item.isComplete}
                          className="sr-only peer"
                        />
                        <div className={`w-5 h-5 border-2 rounded-md transition-all duration-300
                          ${item.isComplete 
                            ? 'bg-violet-500 border-violet-500' 
                            : 'border-gray-300 peer-hover:border-violet-500'}`}
                        >
                          {item.isComplete && (
                            <svg className="w-full h-full text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          )}
                        </div>
                      </label>
                      <span
                        id={`todo-text-${item.id}`}
                        className={`flex-1 text-gray-800 transition-all duration-300 ${
                          item.isComplete ? 'line-through text-gray-400' : ''
                        }`}
                      >
                        {item.todo}
                      </span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="p-2 rounded-lg hover:bg-violet-100 text-violet-600 transition-colors duration-200"
                        aria-label="Edit task"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors duration-200"
                        aria-label="Delete task"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
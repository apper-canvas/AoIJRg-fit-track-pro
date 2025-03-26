import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Check, X, Filter } from "lucide-react";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setIsLoading(false);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
    setIsFormOpen(false);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id, text) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    setEditingTodo(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Todo List</h1>
          <p className="text-surface-500 dark:text-surface-400">
            Manage your tasks and stay organized
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Filter size={16} className="text-surface-500" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        <div className="flex bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
          {["all", "active", "completed"].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === filterOption
                  ? "bg-white dark:bg-surface-700 shadow-sm"
                  : "text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200"
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-surface-200 dark:bg-surface-700 rounded-md"></div>
                <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Todo Form */}
          {isFormOpen && !editingTodo && (
            <div className="card p-4">
              <TodoForm 
                onSubmit={addTodo} 
                onCancel={() => setIsFormOpen(false)} 
              />
            </div>
          )}

          {/* Todo List */}
          <div className="space-y-4">
            {filteredTodos.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-surface-500 dark:text-surface-400">
                  {filter === "all" 
                    ? "No tasks yet. Add one to get started!" 
                    : filter === "active" 
                    ? "No active tasks. Great job!" 
                    : "No completed tasks yet."}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={startEditing}
                  isEditing={editingTodo?.id === todo.id}
                  onUpdate={updateTodo}
                  onCancelEdit={cancelEditing}
                />
              ))
            )}
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center text-sm text-surface-500 dark:text-surface-400 px-2">
            <div>
              {todos.filter(todo => !todo.completed).length} items left
            </div>
            {todos.some(todo => todo.completed) && (
              <button
                onClick={() => setTodos(todos.filter(todo => !todo.completed))}
                className="hover:text-surface-800 dark:hover:text-surface-200"
              >
                Clear completed
              </button>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Todo;
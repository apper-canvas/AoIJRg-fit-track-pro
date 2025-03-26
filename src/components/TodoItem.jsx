import { Trash2, Edit, CheckSquare, Square } from "lucide-react";
import TodoForm from "./TodoForm";

const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  onUpdate,
  onCancelEdit
}) => {
  if (isEditing) {
    return (
      <div className="card p-4">
        <TodoForm
          initialValue={todo.text}
          onSubmit={(text) => onUpdate(todo.id, text)}
          onCancel={onCancelEdit}
          isEditing
        />
      </div>
    );
  }

  return (
    <div className="card">
      <div className="p-4 flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className="mt-0.5 flex-shrink-0 text-surface-500 hover:text-primary transition-colors"
        >
          {todo.completed ? (
            <CheckSquare size={20} className="text-primary" />
          ) : (
            <Square size={20} />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <p className={`${todo.completed ? "line-through text-surface-400 dark:text-surface-500" : ""}`}>
            {todo.text}
          </p>
          <p className="text-xs text-surface-400 dark:text-surface-500 mt-1">
            Added {new Date(todo.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(todo)}
            className="p-1.5 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
            aria-label="Edit todo"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-red-500 transition-colors"
            aria-label="Delete todo"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
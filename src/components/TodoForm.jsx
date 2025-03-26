import { useState } from "react";
import { Check, X } from "lucide-react";

const TodoForm = ({ initialValue = "", onSubmit, onCancel, isEditing = false }) => {
  const [text, setText] = useState(initialValue);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      setError("Task cannot be empty");
      return;
    }
    
    onSubmit(trimmedText);
    setText("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div>
          <label htmlFor="todoText" className="label">
            {isEditing ? "Update task" : "New task"}
          </label>
          <input
            id="todoText"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
            placeholder="What needs to be done?"
            className="input"
            autoFocus
          />
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline flex items-center gap-2"
          >
            <X size={16} />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
          >
            <Check size={16} />
            <span>{isEditing ? "Update" : "Add"}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
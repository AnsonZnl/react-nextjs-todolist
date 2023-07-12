"use client";
import { useState } from "react";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
const TodoList = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    } else {
      alert("Please enter a valid todo.");
    }
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleAddTodo();
    }
  };
  return (
    <div className="container mx-auto p-4 min-h-[400px] w-[400px]">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo"
          className="border border-gray-300 rounded-lg px-4 py-2 mr-2 flex-grow text-gray-600"
        />
        <button onClick={handleAddTodo} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add
        </button>
      </div>
      {todos.length > 0 ? (
        <ul className="h-[300px] overflow-y-auto">
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center mb-2">
              <input type="checkbox" name="" id="" className="w-4 h-4" />
              <span className="flex-grow px-1 text-gray-200">{todo}</span>
              <button onClick={() => handleDeleteTodo(index)} className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                <TrashIcon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos yet.</p>
      )}
    </div>
  );
};

export default TodoList;

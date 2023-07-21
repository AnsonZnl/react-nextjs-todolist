"use client";
import { useEffect, useState } from "react";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { ItodoItem } from "types";
import { getTodoList, setTodoList, setTodoStatus } from "utils/request";

const TodoList = () => {
  const [todos, setTodos] = useState<ItodoItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { data: session } = useSession() as any;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (session?.user.id) {
      getTodoList(session?.user?.id).then(async (res) => {
        const todo = await res.json();
        console.log("todo=", todo);
        setTodos(todo);
      });
    }
  }, [session]);

  const handleAddTodo = async () => {
    if (inputValue.trim() !== "") {
      const user: any = await setTodoList(inputValue, session.user.id);
      const todoItem = { id: user.id, content: inputValue, complete: false };
      setTodos([...todos, todoItem]);
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
  const checkTodo = async (index: number, complete: boolean) => {
    await setTodoStatus(todos[index].id, complete);
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, complete };
      }
      return todo;
    });
    setTodos(updatedTodos);
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
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={todos[index].complete}
                onChange={(event) => {
                  checkTodo(index, event.target.checked);
                }}
              />
              <span className={todo.complete ? "flex-grow px-1 text-gray-200 line-through" : "flex-grow px-1 text-gray-200"}>{todo.content}</span>
              <button onClick={() => handleDeleteTodo(index)} className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                <TrashIcon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-100">No todos yet.</p>
      )}
    </div>
  );
};

export default TodoList;
"use client";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { SessionContextValue, useSession } from "next-auth/react";
import { ItodoItem } from "types";
import { toast } from "react-hot-toast";
import LoadingDots from "@/components/loading-dots";

const TodoList = () => {
  const [todos, setTodos] = useState<ItodoItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { data: session } = useSession() as SessionContextValue;
  const [userId, setUserId] = useState<number | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const userId = session?.user?.id;
    if (userId) {
      setUserId(userId);
      fetch(`/api/todo?userId=${userId}`, { method: "GET" }).then(async (res) => {
        const todo = (await res.json()) as ItodoItem[];
        setTodos(todo);
      });
    }
  }, [session]);

  const handleAddTodo = async () => {
    if (loading) return;
    if (todos.length > 4) {
      toast.error("The number of todos exceeds five");
      return;
    }

    if (inputValue.trim() !== "") {
      setLoading(true);
      const result: any = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputValue, userId }),
      });
      const item = (await result.json()) as ItodoItem;
      const todoItem = { id: item.id, content: inputValue, complete: false };
      setTodos([...todos, todoItem]);
      setInputValue("");
    } else {
      toast.error("Please enter a valid todo.");
    }
  };

  const handleDeleteTodo = async (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    await fetch(`/api/todo?id=${todos[index].id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleAddTodo();
    }
  };
  const checkTodo = async (index: number, complete: boolean) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, complete };
      }
      return todo;
    });
    setTodos(updatedTodos);
    await fetch("/api/todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: todos[index].id, complete }),
    });
  };

  useEffect(() => {
    setLoading(false);
  }, [todos]);

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
        <button onClick={handleAddTodo} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center w-[80px]">
          {loading ? <LoadingDots color="#fff" /> : "Add"}
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

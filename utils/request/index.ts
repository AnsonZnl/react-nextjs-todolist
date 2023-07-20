"use client";
export const setTodoList = (content: String, userId: Number) => {
  return fetch("/api/todo/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, userId }),
  });
};

export const getTodoList = (userId: Number) => {
  return fetch(`/api/todo/get?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

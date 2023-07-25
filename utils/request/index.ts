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

export const setTodoStatus = (id: Number, status: boolean) => {
  fetch("/api/todo/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status }),
  });
};
export const deleteTodoList = (id: Number) => {
  return fetch(`/api/todo/delete?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

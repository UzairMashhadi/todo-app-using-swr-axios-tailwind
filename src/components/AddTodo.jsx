import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import { postRequest } from "../config/axiosConfig";

// request to add todo
const addTdo = (url, { arg }) => postRequest(url, arg);

export default function AddTodo({ mutate }) {
  const [todo, setTodo] = useState("");

  // add todo mutation
  const { trigger, isMutating: addLoading } = useSWRMutation(
    "add-todo",
    addTdo
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await trigger({ title: todo, status: false });
    mutate();
    setTodo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-5 justify-center items-center mt-16"
    >
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter Title"
        type="text"
        className="outline-none py-2 px-4 text-[1.4rem] rounded-lg border shadow-lg"
      />
      <button
        disabled={addLoading}
        type="submit"
        className={`py-2 px-4 text-[1.4rem] bg-indigo-800 rounded-lg font-bold text-white shadow-lg ${
          addLoading && "bg-indigo-400"
        }`}
      >
        Add Todo
      </button>
    </form>
  );
}

import React from "react";
import { patchRequest, deleteRequest } from "../config/axiosConfig";
import useSWRMutation from "swr/mutation";

// request to update the status of todo
const updateStatus = (url, { arg }) => patchRequest(url, arg);

// request to delete the todo
const deleteTodo = (url, { arg }) => deleteRequest(url, arg);

export default function TodoCard({ item, mutate }) {
  // update status mutation
  const { trigger: updateTrigger, isMutating: updateLoading } = useSWRMutation(
    `update/${item?._id}`,
    updateStatus
  );

  // delete todo mutation
  const { trigger: deleteTrigger, isMutating: deleteLoading } = useSWRMutation(
    `delete/${item?._id}`,
    deleteTodo
  );

  const handleOnChange = async (e) => {
    await updateTrigger({ status: e.target.checked });
    mutate();
  };

  const handleDelete = async () => {
    await deleteTrigger({ id: item?._id });
    mutate();
  };

  return (
    <div className="flex items-center gap-5 border-2 p-5 rounded-lg">
      <input
        disabled={updateLoading}
        type="checkbox"
        checked={item?.status}
        onChange={handleOnChange}
        className="w-[1.6rem] min-w-[1.6rem] h-[1.6rem] cursor-pointer"
      />
      <h4
        className={`text-[1.4rem] text-bold break-all ${
          item?.status && "line-through text-gray-500"
        }`}
      >
        {item?.title}
      </h4>
      <button
        disabled={deleteLoading}
        onClick={handleDelete}
        className={`cursor-pointer ml-auto border-2 bg-red-600 text-white font-bold rounded-lg p-5 ${
          deleteLoading && "bg-gray-400"
        }`}
      >
        Delete
      </button>
    </div>
  );
}

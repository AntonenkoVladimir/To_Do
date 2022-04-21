import React from "react";
import {useMutation} from "@apollo/client";
import {addTask} from "../services";
import {ITask} from "../types";

interface IHeaderProps {
  setTasksList: (tasks: (tasks: ITask[]) => ITask[]) => void
}

const Header = ({setTasksList}: IHeaderProps) => {
  const [newTask] = useMutation(addTask);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = new FormData(e.currentTarget).get("text");
    e.currentTarget.reset();
    const res = text && await newTask({variables: {text}});
    res && setTasksList((tasks: ITask[]) => [...tasks, res.data.addTask]);
  }
  return (
    <div className="bg-blue-700 shadow-lg w-screen mb-6">
      <h1 className="text-white text-center text-5xl font-bold py-5">To-Do List</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={formSubmit}
      >
        <input
          name="text"
          type="text"
          className="w-1/4 rounded px-3"
        />
        <button className="add-btn">Add task</button>
      </form>
    </div>
  );
}

export default Header;

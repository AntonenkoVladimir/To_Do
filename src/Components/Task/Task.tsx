import React from "react";
import {useMutation} from "@apollo/client";
import {ITask} from "../types";
import {deleteTask, updateTask} from "../services";
import EditIMG from "../../images/edit.png";
import DeleteIMG from "../../images/delete.png";

interface ITaskProps {
  task: ITask,
  setEditableTask: (id: string) => void,
  setTasksList: (tasks: (tasks: ITask[]) => ITask[]) => void
}

const Task = ({task, setEditableTask, setTasksList}: ITaskProps) => {
  const [removeTask] = useMutation(deleteTask);
  const [editTask] = useMutation(updateTask);

  const deleteTaskFunc = async () => {
    const res = await removeTask({variables: {id: task.id}});
    res && setTasksList((tasks: ITask[]) => tasks.filter(task => task.id !== res.data.deleteTask.id));
  }

  const changeCheck = async () => {
    const res = await editTask({variables: {id: task.id, text: task.text, isCheck: !task.isCheck}});
    res && setTasksList((tasks: ITask[]) => tasks.map(item => (
        item.id === task.id ? res.data.updateTask : item
      )
    ));
  }

  return (
    <div
      key={task.id}
      className={`flex items-center w-1/4 my-1 justify-between bg-orange-500 p-2 rounded ${task.isCheck && "decoration-2 line-through"}`}
    >
      <input
        type="checkbox"
        checked={task.isCheck}
        onChange={changeCheck}
      />
      <p className="w-3/4 overflow-clip">{task.text}</p>
      <div className="flex">
        {
          !task.isCheck && <img
            src={EditIMG}
            className="icon"
            onClick={() => setEditableTask(task.id)}
            alt=""
          />
        }
        <img
          src={DeleteIMG}
          className="icon"
          onClick={deleteTaskFunc}
          alt=""
        />
      </div>
    </div>
  );
}

export default Task;

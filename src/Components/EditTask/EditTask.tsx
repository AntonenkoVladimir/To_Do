import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import {ITask} from "../types";
import {updateTask} from "../services";
import DoneIMG from "../../images/done.png";
import CancelIMG from "../../images/cancel.png";

interface IEditTaskProps {
  task: ITask,
  setEditableTask: (id: string) => void,
  setTasksList: (tasks: (tasks: ITask[]) => ITask[]) => void
}

const EditTask = ({task, setEditableTask, setTasksList}: IEditTaskProps) => {
  const [newText, setNewText] = useState(task.text);
  const [editTask] = useMutation(updateTask);

  const changeTask = async () => {
    const res = await editTask({variables: {id: task.id, text: newText, isCheck: task.isCheck}});
    setEditableTask("");
    res && setTasksList((tasks: ITask[]) => tasks.map(item => (
        item.id === task.id ? res.data.updateTask : item
      )
    ));
  }

  return (
    <div
      key={task.id}
      className="flex items-center w-1/4 my-1 justify-between bg-orange-500 p-2 rounded"
    >
      <input
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onKeyPress={e => (e.charCode === 13) && changeTask()}
        className="w-5/6 ml-2 px-2"
      />
      <div className="flex">
        <img
          src={DoneIMG}
          className="icon"
          onClick={changeTask}
          alt=""
        />
        <img
          src={CancelIMG}
          className="icon"
          onClick={() => setEditableTask("")}
          alt=""
        />
      </div>
    </div>
  );
}

export default EditTask;

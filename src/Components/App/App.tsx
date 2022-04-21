import React, {useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import EditTask from "../EditTask/EditTask";
import Header from "../Header/Header";
import Task from "../Task/Task";
import {ITask} from "../types";
import {tasksQuery} from "../services";

const App = () => {
  const [editableTask, setEditableTask] = useState("");
  const [tasksList, setTasksList] = useState<ITask[]>([]);
  const [getTasks, {data}] = useLazyQuery(tasksQuery);

  useEffect(() => {
    getTasks();
    if (data) setTasksList(data.allTasks);
  }, [data, getTasks]);

  const arrToMap = JSON.parse(JSON.stringify(tasksList)).sort((a: ITask, b: ITask) => {
    if (a.isCheck === b.isCheck) return 0;
    return (a.isCheck > b.isCheck ? 1 : -1);
  });

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Header setTasksList={setTasksList}/>
      {
        arrToMap.map((task: ITask) => (
          <div
            key={task.id}
            className="w-screen flex justify-center my-1 transition-all duration-1000"
          >
            {task.id === editableTask ?
              <EditTask
                task={task}
                setEditableTask={setEditableTask}
                setTasksList={setTasksList}
              />
              :
              <Task
                task={task}
                setEditableTask={setEditableTask}
                setTasksList={setTasksList}
              />}
          </div>
        ))
      }
    </div>
  );
};

export default App;

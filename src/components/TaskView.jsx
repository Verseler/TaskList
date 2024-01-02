import { useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import IconButton from "./IconButton";
import Banner from "./Banner";
import { getCurrentDate } from "../Utilities/TimeStamp";

export default function TaskView({
  currentTask,
  deleteTask,
  updateTask,
  hideTaskView,
}) {
  const EMPTY = "";
  const [name, setName] = useState(EMPTY);
  const [desc, setDesc] = useState(EMPTY);
  const [dueDate, setDueDate] = useState(EMPTY);

  //This re-renders the task view when the current task is changed
  useEffect(() => {
    setName(currentTask?.name || EMPTY);
    setDesc(currentTask?.desc || EMPTY);
    setDueDate(currentTask?.dueDate || EMPTY);
  }, [currentTask]);

  //template for modified task
  let modifiedTask = {
    id: currentTask?.id,
    name: name,
    desc: desc,
    dueDate: dueDate,
    completed: false,
  };

  return (
    <div className="px-5 min-h-screen md:min-h-full absolute inset-0 z-30 md:relative  lg:w-[425px] py-7 md:rounded-2xl bg-secondary">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task:</h1>
        <IconButton iconType="close" onClickAction={hideTaskView} />
      </header>
      {
        //check if currentTask is not empty, not completed, and duedate is overdue
        currentTask.dueDate &&
          !currentTask.completed &&
          currentTask.dueDate <= getCurrentDate() && (
            <Banner type="danger" text="overdue" />
          )
      }

      <div className="flex flex-col pt-8 gap-y-5">
        <input
          className="p-3 transition-colors bg-transparent border rounded-md border-zinc-200 outline-primary hover:border-primary"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="p-3 transition-colors bg-transparent border rounded-md min-h-32 max-h-96 border-zinc-200 outline-primary hover:border-primary"
          placeholder="Description"
          value={desc}
          cols={3}
          rows={9}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex items-center gap-8">
          <label>Due Date</label>
          <input
            className="p-2 text-sm transition-colors bg-transparent border rounded-md cursor-pointer border-zinc-200 outline-primary hover:border-primary"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="absolute inset-x-0 flex px-5 justify-evenly bottom-7 gap-x-7">
          <ActionButton
            bgColorStyle="bg-transparent"
            label="Delete"
            onClickAction={() => deleteTask(currentTask?.id)}
          />
          <ActionButton
            bgColorStyle="bg-primary"
            label="Save"
            onClickAction={() => updateTask(modifiedTask)}
          />
        </div>
      </div>
    </div>
  );
}

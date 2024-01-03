export default function TaskCard({ task, handleShowTaskView, updateTask }) {
  function onChangeBox(task) {
    let modifiedTask = {
      id: task.id,
      name: task.name,
      desc: task.desc,
      dueDate: task.dueDate,
      completed: !task.completed, //only this property was changed
    };

    //remove the selected task from the current list
    updateTask(modifiedTask);
  }

  const taskDueTime = task.dueDate.split("T")[1];

  return (
    <button
      key={task.id}
      onClick={() => handleShowTaskView(task.id)}
      className="flex w-full px-5 py-4 transition-colors border-b cursor-pointer gap-x-3 border-zinc-200 active:bg-zinc-50"
    >
      <div className="w-6 h-6">
        <input
          type="checkbox"
          onClick={() => onChangeBox(task)}
          defaultChecked={task.completed}
          className="w-full align-middle bg-red-700"
        />
      </div>
      <div className="flex items-center gap-x-3">
        <p
          className={`${
            task.completed && "line-through"
          } overflow-hidden text-ellipsis`}
        >
          {task.name}
        </p>
        {task.dueDate &&
        (<div className="px-2 py-0.5 text-xs border rounded-md border-zinc-200">
          {taskDueTime}
        </div>)}
      </div>

      <span className="ml-auto material-symbols-outlined">navigate_next</span>
    </button>
  );
}

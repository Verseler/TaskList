import TaskCount from "./TaskCount";
import TaskCardList from "./TaskCardList";

export default function ListView({
  listTasks,
  listName,
  listCount,
  createNewTask,
  handleShowTaskView,
  updateTask
}) {
  const addTaskButton = () => {
    return (
      <button
        onClick={createNewTask}
        className="flex w-full px-5 py-3 whitespace-pre transition-transform border rounded-md cursor-pointer gap-x-3 text-start border-zinc-200 active:scale-95"
      >
        <span className="material-symbols-outlined">add</span>
        <p>Add New Task</p>
      </button>
    );
  };

  return (
    <div className="flex-1 min-h-[svh]">
      <header className="flex items-end sm:mt-5 h-max gap-x-5">
        <p className="text-4xl font-bold">{listName}</p>
        <TaskCount size="large" count={listCount} />
      </header>

      <div className="py-6 sm:py-10">
        {addTaskButton()}
        <TaskCardList
          listTasks={listTasks}
          type="Today"
          handleShowTaskView={handleShowTaskView}
          updateTask={updateTask}
        />
        <TaskCardList
          listTasks={listTasks}
          type="Upcoming"
          handleShowTaskView={handleShowTaskView}
          updateTask={updateTask}
        />
        <TaskCardList
          listTasks={listTasks}
          type="Overdue"
          handleShowTaskView={handleShowTaskView}
          updateTask={updateTask}
        />
        <TaskCardList
          listTasks={listTasks}
          type="Completed"
          handleShowTaskView={handleShowTaskView}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}

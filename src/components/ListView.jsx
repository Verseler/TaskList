import TaskCard from "./TaskCard";
import TaskCount from "./TaskCount";

export default function ListView({
  listTasks,
  listName,
  listCount,
  createNewTask,
  handleShowTaskView,
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

  const taskCardList = () => {
    return listTasks?.map((task) => (
      <TaskCard
        key={task.id}
        id={task.id}
        name={task.name}
        handleShowTaskView={handleShowTaskView}
      />
    ));
  };

  return (
    <div className="flex-1 min-h-[svh]">
      <header className="flex items-end sm:mt-5 h-max gap-x-5">
        <p className="text-4xl font-bold">{listName}</p>
        <TaskCount size="large" count={listCount} />
      </header>

      <div className="py-6 sm:py-10">
        {addTaskButton()}
        {taskCardList()}
      </div>
    </div>
  );
}

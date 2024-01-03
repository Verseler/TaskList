import TaskCount from "./TaskCount";
import TaskCardList from "./TaskCardList";
import { getCurrentDate } from "../Utilities/TimeStamp";

export default function ListView({
  listTasks,
  listName,
  listCount,
  createNewTask,
  handleShowTaskView,
  updateTask,
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

  const currentDate = getCurrentDate();
  const listTasksToday = listTasks.filter(
    (task) => !task.completed && task.dueDate === currentDate
  );
  const listTasksUpcoming = listTasks.filter(
    (task) => !task.completed && task.dueDate > currentDate
  );
  const listTasksOverdue = listTasks.filter(
    (task) => !task.completed && task.dueDate < currentDate
  );
  const listTasksCompleted = listTasks.filter((task) => task.completed);

  return (
    <div className="flex-1 min-h-[svh]">
      <header className="flex items-end sm:mt-5 h-max gap-x-5">
        <p className="text-4xl font-bold">{listName}</p>
        <TaskCount size="large" count={listCount} />
      </header>

      <div className="py-6 sm:py-10">
        {addTaskButton()}
        {listTasksToday.length >= 1 && (
          <TaskCardList
            listTasks={listTasksToday}
            label="Today"
            handleShowTaskView={handleShowTaskView}
            updateTask={updateTask}
          />
        )}
        {listTasksUpcoming.length >= 1 && (
          <TaskCardList
            listTasks={listTasksUpcoming}
            label="Upcoming"
            handleShowTaskView={handleShowTaskView}
            updateTask={updateTask}
          />
        )}
        {listTasksOverdue.length >= 1 && (
          <TaskCardList
            listTasks={listTasksOverdue}
            label="Overdue"
            handleShowTaskView={handleShowTaskView}
            updateTask={updateTask}
          />
        )}
        {listTasksCompleted.length >= 1 && (
          <TaskCardList
            listTasks={listTasksCompleted}
            label="Completed"
            handleShowTaskView={handleShowTaskView}
            updateTask={updateTask}
          />
        )}
      </div>
    </div>
  );
}

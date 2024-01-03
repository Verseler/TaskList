import TaskCard from "./TaskCard";
import { getCurrentDate } from "../Utilities/TimeStamp";

export default function TaskCardList({
  listTasks,
  type,
  handleShowTaskView,
  updateTask
}) {
  const TaskCardListUI = listTasks?.map((task) => {
    if (type === "Today") {
      if (!task.completed && task.dueDate === getCurrentDate()) {
        return (
          <TaskCard
            key={task.id}
            task={task}
            handleShowTaskView={handleShowTaskView}
            updateTask={updateTask}
          />
        );
      }
    }
    if (type === "Upcoming") {
      if (!task.completed && task.dueDate > getCurrentDate()) {
        return (
          <TaskCard
            key={task.id}
            task={task}
            handleShowTaskView={handleShowTaskView}
            updateTask={updateTask}
          />
        );
      }
    }

    if (type === "Overdue") {
      if (!task.completed && task.dueDate < getCurrentDate()) {
        return (
          <TaskCard
            key={task.id}
            task={task}
            handleShowTaskView={handleShowTaskView}
            updateTask={updateTask}
          />
        );
      }
    }

    if (type === "Completed") {
      if (task.completed) {
        return (
          <TaskCard
            key={task.id}
            task={task}
            handleShowTaskView={handleShowTaskView}
            updateTask={updateTask}
          />
        );
      }
    } else {
      return;
    }
  });

  return (
    <div className="py-5">
      <h2 className="text-xl font-semibold">{type}</h2>
      {TaskCardListUI}
    </div>
  );
}

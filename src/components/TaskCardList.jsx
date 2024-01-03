import TaskCard from "./TaskCard";

export default function TaskCardList({
  listTasks,
  label,
  handleShowTaskView,
  updateTask,
}) {
  const TaskCardListUI = listTasks?.map((task) => {
    return (
      <TaskCard
        key={task.id}
        task={task}
        handleShowTaskView={handleShowTaskView}
        updateTask={updateTask}
      />
    );
  });

  return (
    <div className="py-5">
      <h2 className="text-xl font-semibold">{label}</h2>
      {TaskCardListUI}
    </div>
  );
}

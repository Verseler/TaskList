import { getCurrentDate } from "../Utilities/TimeStamp";
import Banner from "./Banner";

export default function TaskCard({ task, handleShowTaskView }) {
  //change this later on
  //when select multiple task item feature is created
  function handleTaskChecked(e) {
    e.stopPropagation();
    console.log(`tasks ${name} ${id} is checked`);
  }

  return (
    <button
      key={task.id}
      onClick={() => handleShowTaskView(task.id)}
      className="flex w-full px-5 py-4 transition-colors border-b cursor-pointer gap-x-3 border-zinc-200 active:bg-zinc-50"
    >
      <div className="w-6 h-6">
        <input
          type="checkbox"
          onClick={handleTaskChecked}
          className="w-full align-middle bg-red-700"
        />
      </div>
      <div className="flex items-center gap-x-3">
        <p>{task.name}</p>
        {
          //check if currentTask is not empty, not completed, and duedate is overdue
          task.dueDate &&
            !task.completed &&
            task.dueDate <= getCurrentDate() && (
              <Banner type="danger" text="overdue" />
            )
        }
      </div>

      <span className="ml-auto material-symbols-outlined">navigate_next</span>
    </button>
  );
}

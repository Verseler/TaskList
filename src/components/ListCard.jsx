import { useState } from "react";
import TaskCount from "./TaskCount";

export default function List({ name, count, selected, onClickAction, onDeleteClickAction, defaultList }) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  function handleOnClick(event) {
    switch (event.detail) {
      //if single click
      case 1: {
        onClickAction();
        break;
      }
      //if double click
      case 2: {
          if(!defaultList) {
            setShowDeleteIcon(prevShowDeleteIcon => !prevShowDeleteIcon);
          }
        break;
      }
      default: {
        break;
      }
    }
  }

  return (
    <button
      onClick={handleOnClick}
      className={`${
        selected && "bg-zinc-200 font-bold"
      } w-full rounded-md flex items-center px-3 py-2 gap-x-2 transition-colors active:bg-zinc-100`}
    >
      {showDeleteIcon ? (
        <span
          onClick={onDeleteClickAction}
          className="text-red-600 material-symbols-outlined"
        >
          delete
        </span>
      ) : (
        <span className="material-symbols-outlined">
          keyboard_double_arrow_right
        </span>
      )}

      <span>{name}</span>
      <div className="ml-auto">
        <TaskCount count={count} />
      </div>
    </button>
  );
}

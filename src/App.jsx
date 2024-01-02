import { useEffect, useState } from "react";
import TaskView from "./components/TaskView";
import SideMenu from "./components/SideMenu";
import ListView from "./components/ListView";
import { getCurrentDate } from "./Utilities/TimeStamp";
import { nanoid } from "nanoid";


export default function App() {
  const [showTaskView, setShowTaskView] = useState(false);

  const defaultListCollection = [{ id: nanoid(), name: "My Tasks", tasks: [] }];
  const [listCollection, setListCollection] = useState(
    () =>
      JSON.parse(localStorage.getItem("listCollection")) ||
      defaultListCollection
  );

  //everytime listCollection is updated, update also the localStorage
  useEffect(() => {
    localStorage.setItem("listCollection", JSON.stringify(listCollection));
  });

  const [currentListId, setCurrentListId] = useState(listCollection[0].id);
  const currentList =
    listCollection.find((list) => list.id === currentListId) ||
    listCollection[0];
  const currentListIndex = listCollection.findIndex(
    (list) => list.id === currentListId
  );

  const [currentTaskId, setCurrentTaskId] = useState(
    currentList.tasks?.length > 0 ? currentList.tasks[0]?.id : ""
  );
  let currentTask =
    currentList.tasks?.find((task) => task.id === currentTaskId) || {};

  /*
   *
   * List Functions
   *
   */
  //update currentlist in the listCollection
  function setCurrentList(newCurrentList) {
    const newListCollection = [...listCollection];
    newListCollection[currentListIndex] = newCurrentList;
    setListCollection(newListCollection);
  }

  function createList(name) {
    const newList = { id: nanoid(), name: name, tasks: [] };
    setListCollection((prevListCollection) => [...prevListCollection, newList]);
  }

  function deleteList(selectedListId) {
    //dont allow to delete the default list: My Tasks
    const defaultList = listCollection[0];
    if (defaultList.id === selectedListId) return;

    //after deleting selectedList, set defaultList as current List
    setCurrentListId(defaultList.id);

    setListCollection((prevListCollection) =>
      prevListCollection.filter((list) => list.id !== selectedListId)
    );
  }

  function changeCurrentListId(id) {
    setCurrentListId(id);
    //after changing list, close task view
    setShowTaskView(false);
  }

  /*
   *
   * Task Functions
   *
   */
  function createNewTask() {
    const newTask = {
      id: nanoid(),
      name: "New Task",
      description: "",
      dueDate: getCurrentDate(),
    };

    //add the new task with the current taskList
    const newCurrentList = {
      ...currentList,
      tasks: [...currentList.tasks, newTask],
    };
    setCurrentList(newCurrentList);

    setCurrentTaskId(newTask.id);
    //after creating task, show taskview and display the current task
    setShowTaskView(true);
  }

  function deleteTask(selectedTaskId) {
    //if currentList.tasks is empty dont allow to delete more task
    if (currentList.tasks.length < 1) return;

    //remove the selected task from the current list
    const newCurrentList = {
      ...currentList,
      tasks: currentList.tasks.filter((task) => task.id !== selectedTaskId),
    };
    setCurrentList(newCurrentList);

    //close taskView
    setShowTaskView(false);
  }

  function updateTask(modifiedTask) {
    //if currentList.tasks is empty dont allow to modify more task
    if (currentList.tasks.length < 1) return;

    //update the modified task in the current list
    const newCurrentList = {
      ...currentList,
      tasks: currentList.tasks.map((task) => {
        if (task.id === currentTaskId) {
          return modifiedTask;
        } else {
          return task;
        }
      }),
    };
    setCurrentList(newCurrentList);

    //close taskView with delay
    setTimeout(() => {
      setShowTaskView(false);
    }, 400);
  }

  function handleShowTaskView(selectedTaskId) {
    setShowTaskView((prevShowTaskView) =>
      selectedTaskId === currentTaskId ? !prevShowTaskView : true
    );

    setCurrentTaskId(selectedTaskId);
  }

  return (
    <div className="flex min-h-screen p-6 gap-x-2 sm:gap-x-8">
      <SideMenu
        listCollection={listCollection}
        createList={createList}
        changeCurrentListId={changeCurrentListId}
        currentListId={currentListId}
        deleteList={deleteList}
      />

      <ListView
        listTasks={currentList.tasks}
        listName={currentList.name}
        listCount={currentList.tasks?.length}
        createNewTask={createNewTask}
        setCurrentTaskId={setCurrentTaskId}
        handleShowTaskView={handleShowTaskView}
      />

      {showTaskView && (
        <TaskView
          currentTask={currentTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
          hideTaskView={() => setShowTaskView(false)}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import TaskView from "./components/TaskView";
import SideMenu from "./components/SideMenu";
import ListView from "./components/ListView";
import { getCurrentDate } from "./Utilities/TimeStamp";
import { nanoid } from "nanoid";
import logo from "/logo.png";

export default function App() {
  const EMPTY = "";
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

  //current list states
  const [currentListId, setCurrentListId] = useState(listCollection[0].id);
  const currentList =
    listCollection.find((list) => list.id === currentListId) ||
    listCollection[0];
  const currentListIndex = listCollection.findIndex(
    (list) => list.id === currentListId
  );

  //current task states
  const [currentTaskId, setCurrentTaskId] = useState(
    currentList.tasks?.length > 0 ? currentList.tasks[0]?.id : ""
  );
  const currentTask =
    currentList.tasks?.find((task) => task.id === currentTaskId) || {};


  const [permission, setPermission] = useState("default");

  //Notification functionality
  //ask for permision for notification to user
  useEffect(() => {
    if (Notification.permission != "granted") {
      Notification.requestPermission().then((permission) => {
        setPermission(permission);
      });
    } else {
      setPermission(Notification.permission);
    }
  }, []);

  //check if task is due
  useEffect(() => {
    const allList = listCollection.map((list) => list.tasks).flat();
    allList.forEach((task) => {
      //check if task dueDate is not empty
      if (task.dueDate) {
        //check if task duedate is overdue and permission is already granted by users
        if (task.dueDate <= getCurrentDate() && permission === "granted") {
          const dueTime = task.dueDate.split("T")[1];
          const notification = new Notification(`Tasks ${task.name} is due!`, {
            body: dueTime,
            tag: task.id,
            icon: logo,
          });
          notification.addEventListener("close", () => {
            notification.close();
          });

          return () => {
            notification.removeEventListener("close");
          };
        }
      }
    });
  }, [listCollection]);

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
      name: EMPTY,
      desc: EMPTY,
      dueDate: EMPTY,
      completed: false,
    };

    //add the new task with the current taskList
    const newCurrentList = {
      ...currentList,
      tasks: [...currentList.tasks, newTask],
    };

    
    //after clicking add new task it will delay for a few ms to avoid spamming
    setTimeout(() => {
      setCurrentList(newCurrentList);

      setCurrentTaskId(newTask.id);
      //after creating task, show taskview and display the current task
      setShowTaskView(true);
    }, 250);
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

    //if task is empty, delete it
    if (
      modifiedTask.name === EMPTY &&
      modifiedTask.desc === EMPTY &&
      modifiedTask.dueDate === EMPTY
    ) {
      deleteTask(modifiedTask.id);
      return;
    }

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
        updateTask={updateTask}
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

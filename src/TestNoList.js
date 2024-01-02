let myTasks = [];

let currentTaskId = myTasks[0]?.id || ""; 
let currentTask = currentList.tasks.find(task => task.id === currentTaskId) || currentList[0];
let currentTaskIndex = myTasks.findIndex(task => task.id === currentTaskId) || 0;


function createNewTask() {
  //get current date
  const date  = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const newTask = {
    id: id, //change to auto generate
    name: "",
    description: "",
    dueDate: `${day}-${month}-${year}`,
  };

    setMyTask(prevMyTask => [...prevMyTask, newTask]);
    setCurrentTaskId(newTask.id);
}


function deleteTask(taskId) {
  setMyTask(prevMyTask => prevMyTask.filter(task => task.id !== taskId));
}


function updateTask(modifiedTask) {
  const newMyTasks = [...myTasks];
  newMyTasks[currentTaskIndex] = modifiedTask;
  setNewMyTasks(newMyTasks);
}




//test exec
// createNewTask(1001, 'task 1', "this task is for testing", 'myList', '29/12/2023');
// createNewTask(1002, 'task 2', "this task is for second testing", 'myList', '29/12/2023');
// createNewTask(1003, 'task 2', "this task is for second testing", 'myList', '29/12/2023');
// deleteTask(1002);
// deleteTask(1003);
// //currentTaskId = (1001);
// // updateTask({
// //   id: 1001,
// //   name: 'task 1 modified',
// //   description: 'this task is for testing',
// //   listType: 'myList',
// //   dueDate: '29/12/2023'
// // },);

// createNewList(2000, 'new list 2');
// console.log(listCollection);
// deleteList(2000);
// console.log(listCollection);






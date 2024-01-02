
let listCollection = [{id: 1000, name: 'My List', tasks: []}, {id: 2000, name: 'new list', tasks: []}]; //state

let currentListId = listCollection[0]?.id || ""; //state
//currentlist purpose is to render list of task to the listview
let currentList = listCollection.find(list => list.id === currentListId) || listCollection[0]; 
let currentListIndex = findListIndex(currentListId);

let currentTaskId = currentList[0]?.id || ""; //state
//currenttask purpose is to render task to the taskview
let currentTask = currentList.tasks.find(task => task.id === currentTaskId) || currentList[0];


function createNewTask(id, name, desc, listType, dueDate) {
  const newTask = {
    id: id, //change to auto generate
    name: name,
    description: desc,
    listType: listType,
    dueDate: dueDate,
  };

    listCollection[currentListIndex].tasks = [...currentList.tasks, newTask]; //state func
    currentTaskId = newTask.id; //state func
}


function deleteTask(taskId) {
  const newCurrentList = currentList.tasks.filter(task => task.id !== taskId); //state func
  listCollection[currentListIndex].tasks = newCurrentList;
}


function updateTask(modifiedTask) {
  const newCurrentList = [];
  
  for(let i=0; i <currentList.tasks.length; i++) {
    const oldTask = currentList.tasks[i];
    if(oldTask.id === currentTaskId) {
      newCurrentList.push({...modifiedTask});
    }
    else {
      newCurrentList.push(oldTask);
    }
  }
 

  listCollection[currentListIndex].tasks =  newCurrentList; 
  //state func
}




// list methods
function createNewList(id, name) {
  const newList = {
    id: id, //change to auto generate
    name: name,
    tasks: [],
  };

    listCollection = [...listCollection, newList]; //state func
    currentListId = newList.id; //state func
}



function deleteList(listId) {
  listCollection = listCollection.filter(list => list.id !== listId); //state func
}


function findListIndex(id) {
  return listCollection.indexOf(listCollection.find(list => list.id === id));
}


function updateList(id, newName) {
  const selectedlistIndex = findListIndex(id);
  const newlistCollection = [...listCollection];

  newlistCollection[selectedlistIndex] = {...listCollection[selectedlistIndex], name: newName};
  listCollection =  newlistCollection; 
  //state func
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






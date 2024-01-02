const date = new Date();
//get current date
let day =  (date.getDate() < 10 ? "0" : "") + date.getDate();
let month =  (date.getMonth() < 10 ? "0" : "") + (date.getMonth() + 1);
let year = date.getFullYear();
//get current time
let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();


const getCurrentDate = () => `${year}-${month}-${day}`;

const getCurrentTime = () => `${hours}:${minutes}`;

export { getCurrentDate, getCurrentTime };

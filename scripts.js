// functions for disabled dates at add main task
function disableEndDates() {
  let d1 = document.getElementById('startDate').value;
  var startDate = new Date(d1).toISOString().split('T')[0];
  document.getElementById('endDate').setAttribute('min', startDate);
}
function disableStartDates() {
  let d1 = document.getElementById('endDate').value;
  var endDate1 = new Date(d1);
  var endDate = new Date(d1).toISOString().split('T')[0];
  document.getElementById('startDate').setAttribute('max', endDate);
  if (endDate1 > (new Date())) {
    document.getElementById('status').innerHTML = ` <option value="">select</option>
    <option value="inprogress">In-progress</option>
    <option value="completed">Completed</option>
  <option value="cancelled">cancelled</option>
`;}
  else if (endDate1 <= (new Date())) {
    document.getElementById('status').innerHTML = ` <option value="">select</option>
    <option value="completed">Completed</option>
    <option value="cancelled">cancelled</option>
    <option value="due passed">Due Passed</option>
  `;
  }

}


// function for disabled date at edit main task
function disableEndDates1() {

  let d1 = document.getElementById('startDate1').value;
  var startDate = new Date(d1).toISOString().split('T')[0];
  document.getElementById('endDate1').setAttribute('min', startDate);


}
function disableStartDates1() {

  let d1 = document.getElementById('endDate1').value;
  var endDate1 = new Date(d1);
  var endDate = new Date(d1).toISOString().split('T')[0];
  document.getElementById('startDate1').setAttribute('max', endDate);
  if (endDate1 > (new Date())) {
    document.getElementById('status1').innerHTML = `<option value="">select</option>
    <option value="inprogress">In-progress</option>
     <option value="completed">Completed</option>
  <option value="cancelled">cancelled</option>`;
  }
  else if (endDate1 <= (new Date())) {
    document.getElementById('status1').innerHTML = ` <option value="">select</option>
    <option value="completed">Completed</option>
    <option value="cancelled">cancelled</option>
    <option value="duePassed">Due Passed</option>`;
  }
}

// add main task in array
const form = document.getElementById("tasks");
const tasks = {};
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let idTask = document.getElementById("idTask").value;
  let name = document.getElementById("name").value;
  let startDate = document.getElementById("startDate").value;
  endDate = document.getElementById("endDate").value;
  if (tasks[idTask] || deleteArray[idTask]) {
    document.getElementById('msg').innerHTML = "id is exists";
    return false;
  }
  if (!((/^[a-zA-Z ]*$/).test(name))) {
    document.getElementById('msg').innerHTML = "Name should be alphabet";
    return false;
  }
  let status = document.getElementById('status').value;
  if (status == "") {
    document.getElementById('msg').innerHTML = "select status";
    return false;
  }
  document.getElementById('mainTasks').style.display = "none";
  const task = {
    id: idTask,
    name: name,
    startDate: startDate,
    endDate: endDate,
    status: status,
    subTask: {}
  };
  tasks[idTask] = task;
  document.getElementById('msg').innerHTML = "";
  showTasks()
  form.reset();
});

// delete task or subtask
const deleteArray = [];
function deleteSubData(id, subId) {
  console.log(id);
  console.log(subId);
  delete tasks[id].subTask[subId];
  let p1 = document.getElementById('display');
  p1.addEventListener('click', function (e) {
    if (e.target.name) {
      e.target.parentElement.parentElement.remove();
    }
  }, false);
}
function deleteData(id) {
  let div = document.getElementById(id.toString());
  div.parentElement.removeChild(div);
  deleteArray.push(id);
  delete tasks[id];
}
// sub task add in array
const subForm = document.getElementById("subForm");
subForm.addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById('message').innerHTML = "";
  let parentId = document.querySelector('.parentId').value;

  let id2 = Number(new Date());
  let name = document.querySelector('.nameSub').value;
  let startDates = document.querySelector('.startDate').value;
  let endDates = document.querySelector('.endDate').value;
  let status = document.querySelector('.statusSub').value;
  if (status == "") {
    document.getElementById('message').innerHTML = "select status";
    return false;
  }
  
  let startDates1 = new Date(startDates);
  let endDates1 = new Date(endDates);
  let parentEndDate = new Date(tasks[parentId].endDate);
  let parentStartDate = new Date(tasks[parentId].startDate);
  if (parentStartDate <= startDates1 && parentStartDate < endDates1 && parentEndDate > startDates1 && parentEndDate > endDates1) {
    if (tasks[parentId]) {
      document.querySelector('.form').style.display = "none";
      const subtaskData = {
        id: id2,
        name: name,
        startDate: startDates,
        endDate: endDates,
        status: status
      };
      tasks[parentId].subTask[id2] = subtaskData;
    }
  }
  else {
    document.getElementById('message').innerHTML = `dates should be between ${tasks[parentId].startDate} and ${tasks[parentId].endDate}`;
    return false;
  }
  showTasks()
  subForm.reset();
})

function input() {
  document.getElementById('display').innerHTML = "";
  let input = document.querySelector('#input input').value;
  console.log(input);
      let y = Object.keys(tasks)
        .filter(key => ((tasks[key].name).toLowerCase()).match(input.toLowerCase()));
      console.log(y);
      for(x of y){
      let id1 = tasks[x].id;
      let name1 = tasks[x].name;
      let startDate1 = tasks[x].startDate;
      let endDate1 = tasks[x].endDate;
      let status1 = tasks[x].status;
      let display = document.getElementById('display');
      display.innerHTML += ` 
    <div id="${id1}">
    <hr>
    <h2>task</h2>
  <table >
  <tr>
    <th>Id</th>
    <th>Name</th>
    <th>Start Date</th>
    <th>End Date</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
  <tr>
  <td>${id1}</td>
  <td>${name1}</td>
  <td>${startDate1}</td>
  <td>${endDate1}</td>
  <td>${status1}</td>
  <td> <input type="button" onclick="deleteData(${id1})" name="${id1}" value="delete" class="delete">
  <button onclick="editParentTask()" class="edit1"  value="${id1}">Edit</button></td>
  </tr></table>  
  <h2>sub task</h2>
 
  <input type="button" value="show" class="show" onclick="document.getElementById('task${id1}').style.display='block'" >
  <input type="button" value="hide" class="hide" onclick="document.getElementById('task${id1}').style.display='none'" >

  <table id="task${id1}" class="subtask">
  <tr>
  <th>Id</th>
  <th>Name</th>
  <th></th>
  <th>Start Date</th>
  <th></th>
  <th>End Date</th>
  <th>Status</th>
  <th>Action</th>
</tr>
  </table></div>
  `;
      let subTasks = tasks[x].subTask;
      if (subTasks) {
        let subKey = Object.keys(subTasks);
        for (y of subKey) {
          let name2 = subTasks[y].name;
          let idSub = subTasks[y].id;
          let idSub1 = id1 + "-" + (subTasks[y].id);
          let startDate2 = subTasks[y].startDate;
          let endDate2 = subTasks[y].endDate;
          let status2 = subTasks[y].status;
          let idd = 'task' + id1;
          document.getElementById(idd.toString()).innerHTML += `<tr>
  <td>${idSub1}</td>
  <td>${name2}<td>
  <td>${startDate2}<td>
  <td>${endDate2}</td>
  <td>${status2}</td>
  <td><input name="${idSub}" onclick="deleteSubData(${id1},${idSub})" value="delete" class="delete"> 
  <button onclick="editSubtask(${id1},${idSub})"  class="edit" value="${idSub}">edit</button></td>
  </tr>`;
        }
      }
    }
  
}

// display task and subtask
function showTasks() {
  document.getElementById('display').innerHTML = "";
  let key = Object.keys(tasks);
  for (x of key) {
    let id1 = tasks[x].id;
    let name1 = tasks[x].name;
    let startDate1 = tasks[x].startDate;
    let endDate1 = tasks[x].endDate;
    let status1 = tasks[x].status;
    let arr = tasks[x].subTask;
 let array1= Object.keys(arr).filter(key => (arr[key].status=="completed"));
 let array2= Object.keys(arr).filter(key => (arr[key].status=="inprogress"));
 let array3= Object.keys(arr).filter(key => (arr[key].status=="cancelled"));
 let array4= Object.keys(arr).filter(key => (arr[key].status=="duePassed"));
 
  if ((Object.keys(arr)).length==array1.length) {
    tasks[x].status = "completed";
  }
  else if ((Object.keys(arr)).length==array2.length) {
    tasks[x].status = "inprogress";
  }
  else if ((Object.keys(arr)).length==array3.length) {
    tasks[x].status = "cancelled";
  }
  else if ((Object.keys(arr)).length==array4.length) {
    tasks[x].status = "duePassed";
  }
    let display = document.getElementById('display');
    display.innerHTML += ` 
    <div id="${id1}">
    <hr>
    <h2>task</h2>

  <table >
  <tr>
    <th>Id</th>
    <th>Name</th>
    <th>Start Date</th>
    <th>End Date</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
  <tr>
  <td>${id1}</td>
  <td>${name1}</td>
  <td>${startDate1}</td>
  <td>${endDate1}</td>
  <td>${status1}</td>
  <td> <input type="button" onclick="deleteData(${id1})" name="${id1}" value="delete" class="delete">
  <button onclick="editParentTask()" class="edit1"  value="${id1}">Edit</button></td>
  </tr></table>  
  <h2>sub task</h2>
 
  <input type="button" value="show" class="show" onclick="document.getElementById('task${id1}').style.display='block'" >
  <input type="button" value="hide" class="hide" onclick="document.getElementById('task${id1}').style.display='none'" >

  <table id="task${id1}" class="subtask">
  <tr>
  <th>Id</th>
  <th>Name</th>
  <th></th>
  <th>Start Date</th>
  <th></th>
  <th>End Date</th>
  <th>Status</th>
  <th>Action</th>
</tr>
  </table></div>
  `;
    let subTasks = tasks[x].subTask;
    if (subTasks) {
      let subKey = Object.keys(subTasks);
      for (y of subKey) {
        let name2 = subTasks[y].name;
        let idSub = subTasks[y].id;
        let idSub1 = id1 + "-" + (subTasks[y].id);
        let startDate2 = subTasks[y].startDate;
        let endDate2 = subTasks[y].endDate;
        let status2 = subTasks[y].status;
        let idd = 'task' + id1;
        document.getElementById(idd.toString()).innerHTML += `<tr>
  <td>${idSub1}</td>
  <td>${name2}<td>
  <td>${startDate2}<td>
  <td>${endDate2}</td>
  <td>${status2}</td>
  <td><input name="${idSub}" onclick="deleteSubData(${id1},${idSub})" value="delete" class="delete"> 
  <button onclick="editSubtask(${id1},${idSub})"  class="edit" value="${idSub}">edit</button></td>
  </tr>`;
      }

    }
  }
}

let editSubId;
let editSubParentId;
function editSubtask(id) {
  editSubParentId = id;
  editSubId = document.querySelector('.edit').value;
  document.getElementById('mainTasks2').style.display = 'block';
}
let editParentId;
function editParentTask() {
  editParentId = document.querySelector('.edit1').value;
  document.getElementById('mainTasks1').style.display = 'block';
}

// edit main task
const form1 = document.getElementById("taskSs");
form1.addEventListener("submit", function (event) {
  event.preventDefault();
  let id1 = document.getElementById('id1').value;
  let name1 = document.getElementById('name1').value;
  let startDate1 = document.getElementById('startDate1').value;
  let endDate1 = document.getElementById('endDate1').value;
  let status1 = document.getElementById('status1').value;
  if (!((/^[a-zA-Z ]*$/).test(name1))) {
    document.getElementById('msg1').innerHTML = "Name should be alphabet";
    return false;
  }
  if (tasks[editParentId]) {
if(tasks[id1] || deleteArray[id1])
{
  document.getElementById('msg1').innerHTML = "id exists";
  return false;
}
    document.getElementById('mainTasks1').style.display = "none";
    const data = {
      id: id1,
      name: name1,
      startDate: startDate1,
      endDate: endDate1,
      status: status1,
      subTask: tasks[editParentId].subTask
    }
    tasks[id1] = data;
    delete tasks[editParentId];

  }
  showTasks();
  form.reset();

})

// edit subtask
const form2 = document.getElementById("taskSSs");
form2.addEventListener("submit", function (event) {
  event.preventDefault();
  let id1 = Number(new Date());
  let name1 = document.getElementById('name2').value;
  let startDate1 = document.getElementById('startDate2').value;
  let endDate1 = document.getElementById('endDate2').value;
  let status1 = document.getElementById('status2').value;
  let arr = tasks[editSubParentId].subTask;
  arr = arr => arr.flatMap((status) => [status])
  if (arr => arr.every(status => status === "completed")) {
    tasks[editSubParentId].status = "completed";
  }
  else if (arr => arr.every(status => status === "cancelled")) {
    tasks[editSubParentId].status = "cancelled";
  }
  else if (arr => arr.every(status => status === "duePassed")) {
    tasks[editSubParentId].status = "duePassed";
  }
  else if (arr => arr.every(status => status === "inprogress")) {
    tasks[editSubParentId].status = "inprogress";
  }
  if (!((/^[a-zA-Z ]*$/).test(name1))) {
    document.getElementById('msg2').innerHTML = "Name should be alphabet";
    return false;
  }
  let startDate2 = new Date(startDate1);
  let endDate2 = new Date(endDate1);
  let parentEndDate = new Date(tasks[editSubParentId].endDate);
  let parentStartDate = new Date(tasks[editSubParentId].startDate);
  if (parentStartDate <= startDate2 && parentStartDate < endDate2 && parentEndDate > startDate2 && parentEndDate > endDate2) {
    if (tasks[editSubParentId]) {
      document.getElementById('mainTasks2').style.display = "none";
      const data = {
        id: id1,
        name: name1,
        startDate: startDate1,
        endDate: endDate1,
        status: status1
      }
      tasks[editSubParentId].subTask[id1] = data;
      delete tasks[editSubParentId].subTask[editSubId];
      console.log(tasks);

    }
  }
  else {
    document.getElementById('message').innerHTML = `dates should be between ${tasks[editSubParentId].startDate} and ${tasks[editSubParentId].endDate}`;
    return false;
  }
  showTasks();
  form.reset();
})

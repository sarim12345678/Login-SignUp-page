let signUp = document.getElementById("signUp");
let loginForm = document.getElementById("loginForm");
let welcomeUser = document.getElementById("welcomeUser");
let todoInput = document.getElementById("todoInput");
const taskLists = document.getElementById("taskLists");
let isSignUp = true;
let currentUserEmail = null;


if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

function switchbtn() {
  if (isSignUp) {
    loginForm.style.display = "block";
    signUp.style.display = "none";
    isSignUp = false;
  } else {
    loginForm.style.display = "none";
    signUp.style.display = "block";
    isSignUp = true;
  }
}

function signUpBtn() {
  let userName = document.getElementById("userName");
  let signUpEmail = document.getElementById("signUpEmail");
  let signUpPassword = document.getElementById("signUpPassword");
  let number = document.getElementById("number");
  let dateOfBirth = document.getElementById("dateOfBirth");
  let selectGender = document.getElementById("selectGender");

  if (
    !userName.value ||
    !signUpEmail.value ||
    !signUpPassword.value ||
    !number.value ||
    !dateOfBirth.value ||
    !selectGender.value
  ) {
    alert("Please fill full field");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let found = users.find(
    (element) => element.signUpEmailInput === signUpEmail.value
  );

  if (found) {
    alert("Email Already Exist");
    return;
  }

  let myData = {
    userNameInput: userName.value,
    signUpEmailInput: signUpEmail.value,
    signUpPasswordInput: signUpPassword.value,
    numberInput: number.value,
    dateOfBirthInput: dateOfBirth.value,
    selectGenderInput: selectGender.value,
    tasks: [],
  };

  users.push(myData);
  localStorage.setItem("users", JSON.stringify(users));
  alert("SignUp Successfully");

  userName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  number.value = "";
  dateOfBirth.value = "";
  selectGender.value = "";

  switchbtn();
}

function loginBtn() {
  let loginEmail = document.getElementById("loginEmail");
  let loginPassword = document.getElementById("loginPassword");
  let todoAddBtn = document.getElementById("todoAddBtn");
  let todoh1 = document.getElementById("todoh1");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let found = users.find(
    (element) =>
      element.signUpEmailInput === loginEmail.value &&
      element.signUpPasswordInput === loginPassword.value
  );

  if (found) {
    alert("Login Successfully");
    loginForm.style.display = "none";
    welcomeUser.style.display = "block";
    todoAddBtn.style.display = "block";
    todoh1.style.display = "block";
    todoInput.style.display = "block";

    welcomeUser.innerText = "Welcome to " + found.userNameInput;
    currentUserEmail = found.signUpEmailInput;
    renderTasks(found.tasks);
  } else {
    alert("Invalid Email or Password");
  }
}

function renderTasks(tasks) {
  taskLists.innerHTML = "";
  tasks.forEach((task, index) => {
    createTaskElement(task, index);
  });
}

function createTaskElement(taskText, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  span.classList.add("task");
  li.classList.add("li");

  const btns = document.createElement("div");
  btns.classList.add("btns");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    let newTask = prompt("Edit your task:", span.textContent);
    if (newTask && newTask.trim() !== "") {
      span.textContent = newTask.trim();
      updateTaskInLocalStorage(index, newTask.trim());
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    deleteTaskFromLocalStorage(index);
  });

  btns.appendChild(completeBtn);
  btns.appendChild(editBtn);
  btns.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(btns);
  taskLists.appendChild(li);
}

function addTask() {
  if (!currentUserEmail) {
    alert("Please login first");
    return;
  }

  let taskText = todoInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = users.find(
    (u) => u.signUpEmailInput === currentUserEmail
  );

  if (!currentUser) {
    alert("User not found!");
    return;
  }

  if (!currentUser.tasks) currentUser.tasks = [];

  currentUser.tasks.push(taskText);
  localStorage.setItem("users", JSON.stringify(users));

  createTaskElement(taskText, currentUser.tasks.length - 1);
  todoInput.value = "";
}

function deleteTaskFromLocalStorage(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = users.find(
    (u) => u.signUpEmailInput === currentUserEmail
  );
  if (!currentUser) return;
  currentUser.tasks.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
}

function updateTaskInLocalStorage(index, newTask) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = users.find(
    (u) => u.signUpEmailInput === currentUserEmail
  );
  if (!currentUser) return;
  currentUser.tasks[index] = newTask;
  localStorage.setItem("users", JSON.stringify(users));
}

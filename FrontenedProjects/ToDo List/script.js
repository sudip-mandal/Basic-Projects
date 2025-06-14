function addTask() {
  const taskInput = document.getElementById("taskInput").value;
  if (taskInput.trim() === "") return;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginRight = "10px";


  const li = document.createElement("li");

  li.appendChild(checkbox);

  const textNode = document.createTextNode(taskInput);
  li.appendChild(textNode);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "DELETE";
  deleteBtn.className = "delete-btn";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.onclick = function () {
    li.remove();
  };
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);

  document.getElementById("taskInput").value = "";
}

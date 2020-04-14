const tasks = [
  {
    id: "1",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    id: "2",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  },
  {
    id: "3",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    id: "4",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  }
];

(function(arrOfTasks) {
  let objOfTask = arrOfTasks.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  // ELEMENT UI

  const taskContainer = document.querySelector(".tasks_wrapper");
  const form = document.querySelector(".form");
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];
  const theme = document.querySelector("#theme-select");
  const allTasks = document.querySelectorAll(".task");
  ///

  /// Events
  renderAllTask(objOfTask);
  form.addEventListener("submit", onFormSubmit);
  taskContainer.addEventListener("click", onDeleteHandler);
  theme.addEventListener("change", changeTheme);
  ///

  // 1. функция которая принимает на вход обьект, проверяет что обьект передан и пушит фрагмент каждой задачи в фрагмент, после фрагмент пушится в разметку
  function renderAllTask(tasksList) {
    if (!tasksList) {
      console.log("Задачи не были переданы");
      return;
    }
    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach(task => {
      const divTask = taskItem(task);
      fragment.appendChild(divTask);
    });
    taskContainer.appendChild(fragment);
  }

  // 2. функция которая принимает на вход одно свойство обьекта (одну таску) и создает разметку
  function taskItem({ id, title, body }) {
    // деструктурировали обьект
    const div = document.createElement("div"); // создали блок для задачи
    div.classList.add("task"); // добавил класс, к которому предварительно в цсс добавил стили
    div.setAttribute("data-task-id", id);

    const span = document.createElement("span"); // создали заголовок для задачи
    span.classList.add("task_title"); // добавил класс, к которому предварительно в цсс добавил стили
    span.innerText = title; // добавил заголовок, который был диструктурирован с переданного обьекта

    const p = document.createElement("p"); // создали текст для задачи
    p.classList.add("task_body"); // добавил класс, к которому предварительно в цсс добавил стили
    p.textContent = body; // добавил текст, который был диструктурирован с переданного обьекта

    const btn = document.createElement("button"); // создали кнопку для удаления задачи
    btn.textContent = "Delete task"; // добавили название кнопки
    btn.classList.add("task_btn"); // добавил класс, к которому предварительно в цсс добавил стили

    div.appendChild(span);
    div.appendChild(p);
    div.appendChild(btn);

    return div;
  }

  // 3. создаем обработку события сабмит в форме

  function onFormSubmit(e) {
    e.preventDefault();
    const formTitle = inputTitle.value; // переменная для хранения созданного заголовка
    const formBody = inputBody.value; // переменная для хранения созданного текста

    if (!formTitle || !formBody) {
      alert("Пожалуйста, проверьте форму. Все поля должны быть заполнены");
      return;
    }
    const task = createNewTask(formTitle, formBody);
    const listItem = taskItem(task);
    taskContainer.insertAdjacentElement("afterbegin", listItem); // вставляем новую таску в контейнер задач перед всеми задачами
    form.reset();
  }

  // 4. создание новой задачи

  function createNewTask(title, body) {
    const newTask = {
      id: `task-${Math.random()}`,
      title,
      body,
      completed: false
    };

    objOfTask[newTask.id] = newTask;

    return { ...newTask };
  }

  // 5. удаление задачи

  function deleteTask(id) {
    const isConfirm = confirm("Вы точно хотите удалить задачу?", "");
    if (!isConfirm) return isConfirm;
    delete objOfTask[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeleteHandler(e) {
    const target = e.target;

    if (target.classList.contains("task_btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
    }
  }

  function changeTheme(e) {
    e.preventDefault();
    let themeValue = theme.value;
    if (themeValue === "dark") {
      document.body.style.backgroundColor = "silver";
      document.querySelector(".header").style.backgroundColor = "black";
      document.querySelector(".header_logo").style.color = "white";
      form.style.backgroundColor = "silver";
      form.style.border = "1px solid black";
      inputTitle.style.backgroundColor = "silver";
      inputTitle.style.border = "1px solid black";
      inputBody.style.backgroundColor = "silver";
      inputBody.style.border = "1px solid black";
      taskContainer.style.backgroundColor = "rgb(193, 193, 190)";
    } else if (themeValue === "light") {
      document.body.style.backgroundColor = "white";
      document.querySelector(".header").style.backgroundColor = "white";
      document.querySelector(".header").style.border = "1px solid silver";
      document.querySelector(".header_logo").style.color = "black";
      inputBody.style.backgroundColor = "white";
      inputTitle.style.backgroundColor = "white";
      form.style.backgroundColor = "white";
      taskContainer.style.backgroundColor = "white";
    } else if (themeValue === "default") {
      document.querySelector(".header").style.backgroundColor =
        "rgb(57, 84, 109)";
      document.body.style.backgroundColor = "white";
      taskContainer.style.backgroundColor = "white";
      form.style.backgroundColor = "white";
      inputBody.style.backgroundColor = "white";
      inputTitle.style.backgroundColor = "white";
      document.querySelector(".header_logo").style.color = "white";
    }
  }
})(tasks);

const colors = {
  GREEN: "green",
  BLUE: "blue",
  RED: "red",
  YELLOW: "yellow",
  PURPLE: "purple",
};

const MOCK_NOTES = [
  {
    id: 1,
    title: "Работа с формами",
    content:
      "К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name",
    color: colors.GREEN,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Работа с fasdldfsl",
    content:
      "К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name",
    color: colors.BLUE,
    isFavorite: false,
  },
  {
    id: 3,
    title: "Работа с fasdldfsl",
    content:
      "К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name",
    color: colors.BLUE,
    isFavorite: false,
  },
  // ...
];

//    MODEL
const model = {
  notes: [],
  isShowOnlyFavorite: false,
  addNote(title, content, color) {
    const id = Math.random();
    const isFavorite = false;
    const note = {
      title,
      content,
      color,
      id,
      isFavorite,
    };

    // 2. добавим заметку в начало списка
    this.notes.unshift(note);

    // 3. обновим view
    this.updateNotesView();
  },

  deleteNote(noteId) {
    this.notes = this.notes.filter((note) => note.id !== noteId);
    this.updateNotesView();
  },

  toggleLike(noteId) {
    this.notes = this.notes.map((note) => {

      if (note.id === noteId) {
        note.isFavorite = !note.isFavorite;

      }

      return note;
    });

    this.updateNotesView();
  },


  toggleShowOnlyFavorite() {

    this.isShowOnlyFavorite = !this.isShowOnlyFavorite
    this.updateNotesView();
  },


  updateNotesView() {
    // используем метод filter для фильтрации заметок

    const notesToRender = !this.isShowOnlyFavorite ? this.notes : this.notes.filter((note) => note.isFavorite === true)


    // 1. рендерит список заметок (вызывает метод view.renderNotes)
    view.renderNotes(notesToRender);
    // 2. рендерит количество заметок (вызывает метод view.renderNotesCount)
    view.renderNotesCount(model.notes);
  },
};

//    VIEW
const view = {
  init() {
    this.renderNotes(model.notes);
    this.renderNotesCount(model.notes);

    const form = document.querySelector(".note-form");
    const input = document.querySelector(".input");
    const textArea = document.querySelector("textarea");
    const messagesBox = document.querySelector(".messages-box");

    input.addEventListener('input', function () {
      input.value.length >= 1 ? this.style.width = this.scrollWidth + 'px' : this.style.width = '344px';
      input.value.length > 50 ? input.style.background = '#f37d7d' : input.style.background = 'white';

    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const title = document.querySelector(".input").value;
      const content = document.querySelector("textarea").value;
      const color = document.querySelector("input[name=color]:checked").value;

      controller.addNote(title, content, color);

      if (title.length <= 50) {
        input.value = "";
        textArea.value = "";
      }
    });


    const filterButton = document.querySelector('.show-liked');
    filterButton.addEventListener('change', () => {

      controller.toggleShowOnlyFavorite()
    })

    const list = document.querySelector(".notes-list");

    list.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete")) {
        const noteId =
          +event.target.parentElement.parentElement.parentElement.id;
        controller.deleteNote(noteId);
      }

      if (event.target.classList.contains("like-icon")) {
        const noteId = +event.target.closest('li').id;
        controller.toggleLike(noteId);
      }
    });


  },

  showMessage(message, messageClass) {
    const messagesBox = document.querySelector(".messages-box");

    messagesBox.style.display = "flex";
    messagesBox.innerHTML = `<img src="/images/icons/Done.svg" alt="" /><p>${message}</p>`;

    messagesBox.className = `messages-box ${messageClass}`;

    setTimeout(() => {
      messagesBox.style.display = "none";
    }, 3000);
  },

  renderNotes(notes) {
    // your code here
    // находим контейнер для заметок и рендерим заметки в него (если заметок нет, отображаем соответствующий текст)
    const list = document.querySelector(".notes-list");
    const filterBox = document.querySelector(".filter-box");
    let notesHTML = "";
    // "У вас нет еще ни одной заметки Заполните поля выше и создайте свою первую заметку!";
    if (model.notes.length > 0) {
      filterBox.style.display = "flex";
      notes.forEach((element) => {
        notesHTML += `<li id='${element.id}' class='note-block ${element.isFavorite ? 'favourite' : 'not-favourite'}'>
        <div class="note-head ${element.color}">
        <h3>${element.title}</h3>
        <div class="note-buttons">
        
        <button class='like-icon ${element.isFavorite ? 'liked' : 'not-liked'}'></button>
        <img src="/images/icons/trash.svg" alt="" class='delete icon'>
        </div></div>
        <p>${element.content}</p>
        </li>`;
      });

    } else {
      notesHTML = `<h2>У вас нет еще ни одной заметки <br> Заполните поля выше и создайте свою первую заметку!</h2>`;
      filterBox.style.display = "none";
    }





    list.innerHTML = notesHTML;
  },

  renderNotesCount() {
    const notesCount = document.querySelector("#count");
    notesCount.textContent = model.notes.length;
  },
};

//     CONTROLLER
const controller = {
  addNote(title, content, color) {
    if (title.length <= 50) {
      model.addNote(title, content, color);
      view.showMessage("Заметка добавлена", "message-accept");
    } else {
      view.showMessage(
        "Максимальная длина заголовка - 50 символов",
        "message-warning"
      );
    }
  },

  deleteNote(noteId) {
    model.deleteNote(noteId);
  },

  toggleLike(noteId) {
    model.toggleLike(noteId);
  },

  toggleShowOnlyFavorite() {
    model.toggleShowOnlyFavorite();
  }
};

function init() {
  view.init();
}

init();

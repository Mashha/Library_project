//book objects stored in array
let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

function Book(title, author, pages, haveRead, bookImg, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.bookImg = bookImg;
  this.id = id;
}
window.onload = loopOverAndDisplay;
console.log(myLibrary);
let main = document.querySelector(".main-inner");
let addEditedCard = document.querySelector(".edit_the_card");
//id
let currentId = 0;

function loopOverAndDisplay() {
  //remove objects from the list
  let cardItem = document.querySelectorAll(".card");
  cardItem.forEach((item) => {
    item.remove();
  });
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].id = i;
    addBookToCard(myLibrary[i]);
  }
}

function addBookToCard(libraryBook) {
  //cards with books
  let bookCard = document.createElement("div");
  let bookCardLeft = document.createElement("div");
  let bookCardRight = document.createElement("div");
  let statusDetails = document.createElement("div");
  let editDeleteStatus = document.createElement("div");
  let authorDetails = document.createElement("div");
  let pageStatus = document.createElement("div");

  // main, left and right part
  main.appendChild(bookCard);
  bookCard.appendChild(bookCardLeft);
  bookCard.appendChild(bookCardRight);

  bookCard.classList.add("card");
  bookCardLeft.classList.add("card-left");
  bookCardRight.classList.add("card-right");
  editDeleteStatus.classList.add("editDeleteStatus");
  authorDetails.classList.add("author-div");
  pageStatus.classList.add("page-status");
  bookCard.id = libraryBook.id;
  currentId = libraryBook.id;

  let removeBook = document.createElement("button");
  let cardTitle = document.createElement("h1");
  let cardAuthor = document.createElement("h4");
  let cardPages = document.createElement("span");
  let cardHaveRead = document.createElement("span");
  let cardBookImg = document.createElement("img");
  let status = document.createElement("span");
  let editBook = document.createElement("span");
  let byAuthor = document.createElement("span");
  let pagesTitle = document.createElement("span");

  //added classes
  cardTitle.classList.add("cardTitleClass");
  cardAuthor.classList.add("cardAuthorClass");
  cardPages.classList.add("cardPagesClass");
  cardHaveRead.classList.add("card-have-read");

  cardTitle.textContent = libraryBook.title;
  cardAuthor.textContent = libraryBook.author;
  cardPages.textContent = libraryBook.pages;
  removeBook.classList.add("fa-regular", "fa-trash-can");
  cardBookImg.classList.add("imageOfBook");
  status.textContent = "Have read ";
  editBook.classList.add("fa-solid", "fa-pen-to-square");
  byAuthor.textContent = `${"By"}`;
  pagesTitle.textContent = `${"Pages:"}`;

  statusDetails.appendChild(status);
  statusDetails.appendChild(cardHaveRead);

  editDeleteStatus.appendChild(editBook);
  editDeleteStatus.appendChild(removeBook);

  authorDetails.appendChild(byAuthor);
  authorDetails.appendChild(cardAuthor);

  pageStatus.appendChild(pagesTitle);
  pageStatus.appendChild(cardPages);

  bookCardRight.appendChild(editDeleteStatus);
  bookCardRight.appendChild(cardTitle);
  bookCardRight.appendChild(authorDetails);
  bookCardRight.appendChild(pageStatus);
  bookCardRight.appendChild(statusDetails);
  bookCardLeft.appendChild(cardBookImg);

  //add image
  cardBookImg.id = libraryBook.id;
  myLibrary.forEach(function (book) {
    if (book.bookImg === "" && book.id === parseInt(cardBookImg.id)) {
      cardBookImg.setAttribute("src", "images/mock_cover.svg");
    } else if (book.bookImg !== "" && book.id === parseInt(cardBookImg.id)) {
      cardBookImg.setAttribute("src", book.bookImg);
    }
  });

  //add icon to haveRead
  let checkBox = document.getElementById("haveRead");
  if (checkBox.checked === true) {
    cardHaveRead.innerHTML = '<i class="fa-solid fa-check"></i>';
  } else {
    cardHaveRead.innerHTML = '<i class="fa-solid fa-x"></i>';
  }

  // change status of have read
  cardHaveRead.addEventListener("click", function () {
    if (this.innerHTML === '<i class="fa-solid fa-check"></i>') {
      this.innerHTML = '<i class="fa-solid fa-x"></i>';
      myLibrary.forEach(function (item) {
        if (bookCard.id === item.id) {
          item.haveRead = false;
        }
      });
    } else {
      this.innerHTML = '<i class="fa-solid fa-check"></i>';
      myLibrary.forEach(function (item) {
        if (bookCard.id === item.id) {
          item.haveRead = true;
        }
      });
    }
  });

  // edit the form
  editBook.addEventListener("click", function () {
    document.getElementById("title").value = cardTitle.textContent;
    document.getElementById("author").value = cardAuthor.textContent;
    document.getElementById("pages").value = cardPages.textContent;
    document.getElementById("imgUrl").value = cardBookImg.src;
    document.getElementById("haveRead").checked;
    currentId = libraryBook.id;

    addEditedCard.classList.remove("no-button");
    addToTheList.classList.add("no-button");

    modal.classList.toggle("active");
    wrapper.classList.toggle("blur");
    spanOnInput();
  });

  //remove books from library and table one by one
  removeBook.addEventListener("click", function (bookCard) {
    myLibrary = myLibrary.filter(
      (bookCard) =>
        bookCard.id !==
        parseInt(this.parentElement.parentElement.parentElement.id)
    );
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    if (bookCard.id === Object.id) {
      this.parentElement.parentElement.parentElement.remove();
    }
  });
}

// add edited form to card
addEditedCard.addEventListener("click", function (e) {
  e.preventDefault();

  let newTitle = document.getElementById("title").value;
  let newAuthor = document.getElementById("author").value;
  let newPages = document.getElementById("pages").value;
  let newReadBook = document.getElementById("haveRead").checked;
  let newBookUrl = document.getElementById("imgUrl").value;

  myLibrary.forEach(function (editedBook) {
    if (editedBook.id === currentId) {
      let newEditedBook = new Book(
        newTitle,
        newAuthor,
        newPages,
        newReadBook,
        newBookUrl,
        currentId
      );
      Object.assign(editedBook, newEditedBook);
    }
  });
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  loopOverAndDisplay();
  modal.classList.toggle("active");
  wrapper.classList.toggle("blur");

  //clear the input fields
  clearTheInputFields();
});

let form = document.querySelector("form");
form.id = currentId;
//add new book on button click
form.addEventListener("submit", function (e) {
  //prevent from submitting
  e.preventDefault();

  //get values from input
  let titleValue = document.getElementById("title").value;
  let authorValue = document.getElementById("author").value;
  let pagesNum = document.getElementById("pages").value;
  let haveReadBook = document.getElementById("haveRead").checked;
  let bookUrl = document.getElementById("imgUrl").value;

  //add new book
  let newBook = new Book(
    titleValue,
    authorValue,
    pagesNum,
    haveReadBook,
    bookUrl
  );

  // push a book to array
  myLibrary.push(newBook);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

  loopOverAndDisplay();

  //close the modal and remove the blur effect
  modal.classList.toggle("active");
  wrapper.classList.toggle("blur");

  //clear the input fields
  clearTheInputFields();
});

//open/close the modal + blur
let modal = document.querySelector(".modal-form");
let wrapper = document.querySelector(".wrapper");
let addToTheList = document.querySelector(".addToTheList");

document.querySelector(".addNewBook").addEventListener("click", () => {
  addEditedCard.classList.add("no-button");
  addToTheList.classList.remove("no-button");
  clearTheInputFields();
  spanOnInput();
  showModalForm();
});
document.querySelector(".close").addEventListener("click", showModalForm);

function showModalForm() {
  modal.classList.toggle("active");
  wrapper.classList.toggle("blur");
}

//clear cards and array
let clearAll = document.querySelector('.clear-all')

clearAll.addEventListener('click', () => {
  //remove items from array
  myLibrary.splice(0, myLibrary.length)
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  
  //remove objects from the list
  let cardItem = document.querySelectorAll('.card')
  cardItem.forEach((item) => {
    item.remove()
  })
})

//added light/dark body background
let toggle = document.querySelector(".toggleDark");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark_mode");
  if (document.body.classList.contains("dark_mode")) {
    toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

//push span up when input is full
document.getElementById("imgUrl").addEventListener("blur", spanOnInput);

function spanOnInput() {
  if (document.getElementById("imgUrl").value !== "") {
    document.querySelector(".img-name").classList.add("span-up");
  } else {
    document.querySelector(".img-name").classList.remove("span-up");
  }
}

//clear the input fields
function clearTheInputFields() {
  document.querySelectorAll("input").forEach((node) => {
    node.value = "";
  });
}

//book objects stored in array
let myLibrary = []

function Book(title, author, pages, haveRead, id) {
  this.title = title
  this.author = author
  this.pages = pages
  this.haveRead = haveRead
  this.id = id
}

//table
let table = document.getElementById('table')

function addBookToTable() {
  //Table with books
  let tableRow = document.createElement('tr')
  table.appendChild(tableRow)

  tableRow.classList.add('row')
  tableRow.id = `${Date.now()}`

  let tableTitle = document.createElement('td')
  let tableAuthor = document.createElement('td')
  let tablePages = document.createElement('td')
  let tableHaveRead = document.createElement('td')
  let removeBook = document.createElement('button')

  tableTitle.textContent = title.value
  tableAuthor.textContent = author.value
  tablePages.textContent = pages.value
  removeBook.classList.add('fa-regular', 'fa-trash-can')

  tableRow.appendChild(tableTitle)
  tableRow.appendChild(tableAuthor)
  tableRow.appendChild(tablePages)
  tableRow.appendChild(tableHaveRead)
  tableRow.appendChild(removeBook)

  //add button to haveRead
  let checkBox = document.getElementById('haveRead')
  if (checkBox.checked === true) {
    tableHaveRead.innerHTML = '<i class="fa-solid fa-check"></i>'
  } else {
    tableHaveRead.innerHTML = '<i class="fa-solid fa-x"></i>'
  }

  // change status of have read
  tableHaveRead.addEventListener('click', function () {
    if (this.innerHTML === '<i class="fa-solid fa-check"></i>') {
      this.innerHTML = '<i class="fa-solid fa-x"></i>'
      myLibrary.forEach(function (item) {
        if (tableRow.id === item.id) {
          item.haveRead = false
        }
      })
    } else {
      this.innerHTML = '<i class="fa-solid fa-check"></i>'
      myLibrary.forEach(function (item) {
        if (tableRow.id === item.id) {
          item.haveRead = true
        }
      })
    }
  })

  //remove books from library and table one by one
  removeBook.addEventListener('click', function (book) {
    myLibrary = myLibrary.filter((book) => book.id !== this.parentElement.id)
    if (book.id === Object.id) {
      this.parentElement.remove()
    }
  })
}

//add new book on button click
document.querySelector('.addToTheList').addEventListener('click', function () {
  //get values from input
  let titleValue = document.getElementById('title').value
  let authorValue = document.getElementById('author').value
  let pagesNum = document.getElementById('pages').value
  let haveReadBook = document.getElementById('haveRead').checked

  let idValue = `${Date.now()}`
  //add new book
  let newBook = new Book(
    titleValue,
    authorValue,
    pagesNum,
    haveReadBook,
    idValue,
  )

  addBookToTable(newBook)

  // push a book to array
  myLibrary.push(newBook)

  //close the modal
  modal.classList.toggle('show-modal')

  //clear the input fields
  document.querySelectorAll('input').forEach((node) => {
    node.value = ''
  })
})

//open the modal
let modal = document.querySelector('.modal-form')

document.querySelector('.addNewBook').addEventListener('click', showModalForm)
document.querySelector('.close').addEventListener('click', showModalForm)

function showModalForm() {
  modal.classList.toggle('show-modal')
}

//clear the table and array
let clearAll = document.querySelector('.clear-all')

clearAll.addEventListener('click', () => {
  //remove items from array
  myLibrary.splice(0, myLibrary.length)

  //remove objects from the list
  let rowItem = document.querySelectorAll('.row')
  rowItem.forEach((item) => {
    item.remove()
  })
})

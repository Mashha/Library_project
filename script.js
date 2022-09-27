//book objects stored in array
let myLibrary = []

function Book(title, author, pages, haveRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.haveRead = haveRead
}

//table
let table = document.getElementById('table')

function addBookToTable() {
  //Table with books
  let tableRow = document.createElement('tr')
  table.appendChild(tableRow)

  let tableTitle = document.createElement('td')
  let tableAuthor = document.createElement('td')
  let tablePages = document.createElement('td')
  let tableHaveRead = document.createElement('td')

  tableTitle.textContent = title.value
  tableAuthor.textContent = author.value
  tablePages.textContent = pages.value
  tableHaveRead.textContent = haveRead.value

  tableRow.appendChild(tableTitle)
  tableRow.appendChild(tableAuthor)
  tableRow.appendChild(tablePages)
  tableRow.appendChild(tableHaveRead)
}

//add new book on button click
document.querySelector('.addToTheList').addEventListener('click', function () {
  //get values from input
  let titleValue = document.getElementById('title').value
  let authorValue = document.getElementById('author').value
  let pagesNum = document.getElementById('pages').value
  let haveReadBook = document.getElementById('haveRead').value
  //add new book
  let newBook = new Book(titleValue, authorValue, pagesNum, haveReadBook)

  addBookToTable()

  // push a book to array
  myLibrary.push(newBook)

  //close the modal
  modal.classList.toggle('show-modal')
})

//open the modal
let modal = document.querySelector('.modal-form')

document.querySelector('.addNewBook').addEventListener('click', showModalForm)
document.querySelector('.close').addEventListener('click', showModalForm)

function showModalForm() {
  modal.classList.toggle('show-modal')
}

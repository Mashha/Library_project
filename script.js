//book objects stored in array
let myLibrary = []

//get values from input
let titleValue = document.getElementById('title').value
let authorValue = document.getElementById('author').value
let pagesNum = document.getElementById('pages').value
let haveReadBook = document.getElementById('haveRead').value

function Book(title, author, pages, haveRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.haveRead = haveRead
}

//add new book
let newBook = new Book(titleValue, authorValue, pagesNum, haveReadBook)

//push to the array
function addBookToLibrary() {
  myLibrary.push(newBook)
}

//table
let table = document.getElementById('table')

function addBookToArray() {
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
  addBookToLibrary()
  addBookToArray()
  modal.classList.toggle('show-modal')
})

console.log(myLibrary)

//open the modal
let modal = document.querySelector('.modal-form')

document.querySelector('.addNewBook').addEventListener('click', showModalForm)
document.querySelector('.close').addEventListener('click', showModalForm)

function showModalForm() {
  modal.classList.toggle('show-modal')
}

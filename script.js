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

  tableRow.classList.add('row')

  let tableTitle = document.createElement('td')
  let tableAuthor = document.createElement('td')
  let tablePages = document.createElement('td')
  let tableHaveRead = document.createElement('td')
  let removeBook = document.createElement('button')

  tableTitle.textContent = title.value
  tableAuthor.textContent = author.value
  tablePages.textContent = pages.value
  removeBook.innerHTML = '<i class="fa-regular fa-trash-can"></i>'

  tableRow.appendChild(tableTitle)
  tableRow.appendChild(tableAuthor)
  tableRow.appendChild(tablePages)
  tableRow.appendChild(tableHaveRead)
  tableRow.appendChild(removeBook)

  //remove books one by one
  removeBook.addEventListener('click', function () {
    this.parentElement.remove()
    myLibrary.splice(0, 1)
  })

  //add button to haveRead
  let checkBox = document.getElementById('haveRead')
  if (checkBox.checked == true) {
    tableHaveRead.innerHTML = '<i class="fa-solid fa-check"></i>'
  } else {
    tableHaveRead.innerHTML = '<i class="fa-solid fa-x"></i>'
  }
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

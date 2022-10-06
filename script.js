//book objects stored in array
let myLibrary = []

function Book(title, author, pages, haveRead, bookImg, id) {
  this.title = title
  this.author = author
  this.pages = pages
  this.haveRead = haveRead
  this.bookImg = bookImg
  this.id = id
}

//div card
let main = document.querySelector('.main-inner')

function addBookToTable() {
  //card with books
  let bookCard = document.createElement('div')
  let bookCardLeft = document.createElement('div')
  let bookCardRight = document.createElement('div')
  let statusDetails = document.createElement('div')
  let editDeleteStatus = document.createElement('div')

  // main, left and right part
  main.appendChild(bookCard)
  bookCard.appendChild(bookCardLeft)
  bookCard.appendChild(bookCardRight)

  bookCard.classList.add('card')
  bookCardLeft.classList.add('card-left')
  bookCardRight.classList.add('card-right')
  bookCard.id = `${Date.now()}`
  editDeleteStatus.classList.add('editDeleteStatus')

  let removeBook = document.createElement('button')
  let cardTitle = document.createElement('h1')
  let cardAuthor = document.createElement('h4')
  let cardPages = document.createElement('p')
  let cardHaveRead = document.createElement('span')
  let cardBookImg = document.createElement('img')
  let status = document.createElement('span')
  let editBook = document.createElement('span')

  cardTitle.textContent = title.value
  cardAuthor.textContent = author.value
  cardPages.textContent = `${pages.value} ${'pages'}`
  removeBook.classList.add('fa-regular', 'fa-trash-can')
  cardBookImg.classList.add('imageOfBook')
  status.textContent = 'Have read '
  editBook.classList.add('fa-solid', 'fa-pen-to-square')

  statusDetails.appendChild(status)
  statusDetails.appendChild(cardHaveRead)

  editDeleteStatus.appendChild(editBook)
  editDeleteStatus.appendChild(removeBook)

  bookCardRight.appendChild(editDeleteStatus)
  bookCardRight.appendChild(cardTitle)
  bookCardRight.appendChild(cardAuthor)
  bookCardRight.appendChild(cardPages)
  bookCardRight.appendChild(statusDetails)
  bookCardLeft.appendChild(cardBookImg)

  //add image
  let imageBookForCard = document.getElementById('imgUrl').value
  if (imageBookForCard === '') {
    cardBookImg.setAttribute('src', 'images/mock_cover.svg')
  } else {
    cardBookImg.setAttribute('src', imageBookForCard)
  }

  //add icon to haveRead
  let checkBox = document.getElementById('haveRead')
  if (checkBox.checked === true) {
    cardHaveRead.innerHTML = '<i class="fa-solid fa-check"></i>'
  } else {
    cardHaveRead.innerHTML = '<i class="fa-solid fa-x"></i>'
  }

  // change status of have read
  cardHaveRead.addEventListener('click', function () {
    if (this.innerHTML === '<i class="fa-solid fa-check"></i>') {
      this.innerHTML = '<i class="fa-solid fa-x"></i>'
      myLibrary.forEach(function (item) {
        if (bookCard.id === item.id) {
          item.haveRead = false
        }
      })
    } else {
      this.innerHTML = '<i class="fa-solid fa-check"></i>'
      myLibrary.forEach(function (item) {
        if (bookCard.id === item.id) {
          item.haveRead = true
        }
      })
    }
  })

  // edit book card
  editBook.addEventListener('click', function () {
    modal.classList.toggle('active')
    wrapper.classList.toggle('blur')
  })

  //remove books from library and table one by one
  removeBook.addEventListener('click', function (bookCard) {
    myLibrary = myLibrary.filter(
      (bookCard) =>
        bookCard.id !== this.parentElement.parentElement.parentElement.id,
    )
    if (bookCard.id === Object.id) {
      this.parentElement.parentElement.parentElement.remove()
    }
  })
}

//add new book on button click
document.querySelector('form').addEventListener('submit', function (e) {
  //prevent from submitting
  e.preventDefault()

  //get values from input
  let titleValue = document.getElementById('title').value
  let authorValue = document.getElementById('author').value
  let pagesNum = document.getElementById('pages').value
  let haveReadBook = document.getElementById('haveRead').checked
  let bookUrl = document.getElementById('imgUrl').value

  let idValue = `${Date.now()}`
  //add new book
  let newBook = new Book(
    titleValue,
    authorValue,
    pagesNum,
    haveReadBook,
    bookUrl,
    idValue,
  )

  addBookToTable(newBook)

  // push a book to array
  myLibrary.push(newBook)

  //close the modal and remove the blur effect
  modal.classList.toggle('active')
  wrapper.classList.toggle('blur')

  //clear the input fields
  document.querySelectorAll('input').forEach((node) => {
    node.value = ''
  })
})

//open/close the modal
let modal = document.querySelector('.modal-form')
let wrapper = document.querySelector('.wrapper')

document.querySelector('.addNewBook').addEventListener('click', showModalForm)
document.querySelector('.close').addEventListener('click', showModalForm)

function showModalForm() {
  modal.classList.toggle('active')
  wrapper.classList.toggle('blur')
}

//clear the table and array
let clearAll = document.querySelector('.clear-all')

clearAll.addEventListener('click', () => {
  //remove items from array
  myLibrary.splice(0, myLibrary.length)

  //remove objects from the list
  let cardItem = document.querySelectorAll('.card')
  cardItem.forEach((item) => {
    item.remove()
  })
})

//added light/dark body background
let toggle = document.querySelector('.toggleDark')

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark_mode')
  if (document.body.classList.contains('dark_mode')) {
    toggle.innerHTML = '<i class="fa-solid fa-sun"></i>'
  } else {
    toggle.innerHTML = '<i class="fa-solid fa-moon"></i>'
  }
})

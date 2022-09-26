//book objects stored in array
let myLibrary = [];

//get values from input
let titleValue = document.getElementById("title").value
let authorValue = document.getElementById("author").value
let pagesNum = document.getElementById("pages").value
let haveReadBook = document.getElementById("haveRead").value


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


addBookToLibrary()
console.log(myLibrary)

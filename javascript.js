"use strict";

let library = [];

function book(title, author, pages, synopsis, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.synopsis = synopsis;
    this.read = read;    
    this.ID = crypto.randomUUID();
    this.info = `${this.title} by ${this.author }. ${this.pages} pages long. You have ${this.status} this book`;
}

book.prototype.status = function() {
    if (this.read) return "read";
    else return "not read";
}

book.prototype.changeStatus = function() {
    this.read = !this.read;
}


function addBook (title,author,pages,synopsis,read) {
    let newBook = new book(title,author,pages,synopsis,read);
    library.push(newBook);
}

addBook("The Hobbit","JRR Tolkien",295,"",true);
addBook("Dragon Ball","Akira Toriyama",125)
addBook("Dragon Ball 2","Akira Toriyama",126)
addBook("Dragon Ball 35","Akira Toriyama",129)

library.forEach((book) => {
    console.log(book.info)
})


function showBook() {
    let bookShelf = document.querySelector(".container");
    bookShelf.innerHTML=""

    library.forEach((book) => {
    let card = document.createElement("div");
    card.setAttribute("class","card");
    bookShelf.append(card);

    let title = document.createElement("div");
    title.setAttribute("class","title");
    title.textContent = book.title;
    card.appendChild(title);
    
    let author = document.createElement("div");
    author.setAttribute("class","author");
    author.textContent = "by "+book.author;
    card.appendChild(author);

    let pages = document.createElement("div");
    pages.setAttribute("class","pages");
    pages.textContent = book.pages + " pages";
    card.appendChild(pages);

    let synopsis = document.createElement("div");
    synopsis.setAttribute("class","synopsis");
    synopsis.textContent = book.synopsis;
    card.appendChild(synopsis);


    let btnContainer = document.createElement("div");
    btnContainer.setAttribute("class","btnContainer");
    card.appendChild(btnContainer);

    let status = document.createElement("button");
    status.setAttribute("class","status");
    status.textContent = book.status();
    btnContainer.appendChild(status);

    status.addEventListener("click", (event)=>{
        book.changeStatus();
        status.textContent = book.status();
        console.log(book.read);
        if (book.read == true) {
            card.classList.add("read");
            card.classList.remove("unread");
        } else {
            card.classList.add('unread');
            card.classList.remove("read");
        }
    })

    let remove = document.createElement("button");
    remove.setAttribute("class","remove");
    remove.setAttribute("data-id", book.ID)
    remove.textContent = "remove";
    btnContainer.appendChild(remove);

    remove.addEventListener("click", (event) => {
        let bookId = event.target.getAttribute("data-id");
        removeBook(bookId);
    });

    if (book.read == true) {
        card.classList.add("read");
        card.classList.remove("unread");
    } else {
        card.classList.add('unread');
        card.classList.remove("read");
    }
    });

    
    let card2 = document.createElement("div");
    card2.setAttribute("class","card holder");
    bookShelf.append(card2);

    let title2 = document.createElement("div");
    title2.setAttribute("class","title");
    title2.textContent = "Sample Title";
    card2.appendChild(title2);
    
    let author2 = document.createElement("div");
    author2.setAttribute("class","author");
    author2.textContent = "by some author";
    card2.appendChild(author2);

    let pages2 = document.createElement("div");
    pages2.setAttribute("class","pages");
    pages2.textContent = "number of pages";
    card2.appendChild(pages2);

    let synopsis2 = document.createElement("div");
    synopsis2.setAttribute("class","synopsis");
    synopsis2.textContent = "some synopsis about the book...";
    card2.appendChild(synopsis2);


    let btnContainer2 = document.createElement("div");
    btnContainer2.setAttribute("class","btnContainer");
    card2.appendChild(btnContainer2);

    let addBook = document.createElement("button");
    addBook.setAttribute("id","addBook");
    addBook.textContent = "add new book";
    btnContainer2.appendChild(addBook);
    
};

function removeBook(id) {
    library = library.filter( (book) => {   
        return book.ID != id;
    });
    showBook();
}

showBook();


const addNewBook = document.querySelector("#addBook");
const newBookDialog = document.querySelector(".addNewBook");

addNewBook.addEventListener("click", (event) => {
    newBookDialog.showModal();
});

const cancelNewBook = document.querySelector(".closeDialog");
const submitNewBook = document.querySelector(".submitNewBook");
const newBookForm = document.querySelector(".newBookForm");

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newBookForm, submitNewBook);
    const bookObject = {};
    for (const [key, value] of formData) {
      bookObject[key] = value;
    }
    addBook(
      bookObject.newTitle,
      bookObject.newAuthor,
      bookObject.newPages,
      bookObject.newSynopsis,
      bookObject.newRead
    );
    newBookForm.reset();
    newBookDialog.close();
    showBook();
  });


cancelNewBook.addEventListener("click", (event) => {
    event.preventDefault();
    newBookForm.reset();
    newBookDialog.close();
});

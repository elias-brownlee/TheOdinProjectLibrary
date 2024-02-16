const myLibrary = [] //This will be the array of book objects
const addButton = document.querySelector('add.book')
const sideBar = document.querySelector('.side-bar');
const library = document.querySelector('.library');
//The addButton EventLister is listening for the click from the "Add Book" button
addButton.addEventListener('click', enterForm);
//The sideBar EventListener listens for form submissions in the sidebar
sideBar.addEventListener('submit', addBookToLibrary);
//The library EventListener listens for clicks on library items
library.addEventListener('click', handleLibraryClick);

//adding 3 books into the myLibrary array
let book = new Book('1984', 'George Orwell', 328, false)
myLibrary.push(book) 
book = new Book('To Kill a Mockingbird', 'Harper Lee', 281, false)
myLibrary.push(book)
book = new Book('The Great Gatsby', 'F.Scott Fitzgerald', 180, true)
myLibrary.push(book)
//Book constructor, creating book objects with the title, author,
//pages, and the finished status properties. 
function Book(title, author, pages, finished){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finished = finished;
    //the info method returns a string with the book's information
    this.info = function(){
        const read = this.finished ? 'You have read this one already' : 'You have not read this one yet';
        return `${this.title} written by ${this.author}, it has ${this.pages} pages, and ${read}`;
    }
}
//This function is responsible for rendering the entire library anytime anything is changed
function renderLibrary(){
    library.innerHTML = myLibrary.map((book, index)=>
    //it generates HTML code for each book in the library using 'map' and template literals.
    //Each book 'card' contains all the book information attatched to it.
    //The resulting HTML below is appended to the 'library' element
    `<div class='book-card' data-index='${index}'>
        <div class='title'>
            <h4>"${book.title}"</h4>
            <button class='delete'>X</button>
        </div>
        <table>
            <tr>
                <td>Author:</td>
                <td>${book.author}</td>
            </tr>
            <tr>
                <td>Pages:</td>
                <td>${book.pages}</td>
            </tr>
            <tr>
                <td><button class='status'>Status</button></td>
                <td>${book.read ? 'Read' : 'Not read'}</td>
            </tr>
        </table>
    </div>` 
    ).join('');
}
//This function handles the submissions of the form in the sidebar
function addBookToLibrary(e){
    e.preventDefault();
    const form = e.target;
    //it retrieves the input values from the form fields
    const title = form.querySelector('#title').value;
    const author = form.querySelector('#author').value;
    const pages = form.querySelector('#pages').value;
    const finished = form.querySelector('input[name="read-notread"]: checked').value === 'true';
    //Using these values, it creates a new Book object and adds it to the 'myLibrary' array
    const book = new Book(title, author, pages, finished);
    myLibrary.push(book);
    //after adding the book to myLibrary, the form is reset and the library is re-rendered
    form.reset();
    renderLibrary();
}
//This functiion handles clicks within the library section
function handleLibraryClick(e){
    const target = e.target;
    //if a click occurs on the delete button, it identifies the index of the book
    //associated with it the clicked button, removing that book from the 'myLibrary' array, then re-renderinng the library
    if(target.classList.contains('delete')){
        const index = target.closest('.book-card').dataset.index;
        myLibrary.splice(index, 1);
        renderLibrary();
    //if a click occurs on the status button, it toggles the read status of the associated book and then re-renders the library
    }else if(target.classList.contains('status')){
        const index = target.closest('.book-card').dataset.index;
        myLibrary[index].finished = !myLibrary[index].finished;
        renderLibrary();
    }
}
//This function is executed when the "Add Book" button is clicked
function enterForm(){
    sideBar.innerHTML = 
    //it replaces the content of the sidebar with a form for adding a new book.
    //The form includes an input field for all the book's information
    `<div class='add-book-form'>
        <form>
            <label for="title">Title</label>
            <input id="title" type="text" required>
            <label for="author">Author</label>
            <input id="author" type="text" required>
            <label for="pages">Number of Pages</label>
            <input id="pages" type="number" required>
            <div class="radio">
                <input id="read" name="read-notread" type="radio" value=true checked>
                <label for="read">Read</label>
                <input id="not-read" name="read-notread" type="radio" value=false>
                <label for="not-read">Not read</label>
            </div>
            <button class="save" type="submit">Save</button>
        </form>
    </div>`;
}
renderLibrary();
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    // Add book to list
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // Craete tr element 
        const row = document.createElement('tr');
        // Insert Cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#!" class="delete">x</a></td>
            `;

        list.appendChild(row);
    }

    // Clear Fields
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('title').style.borderColor = 'gray';
        document.getElementById('author').value = '';
        document.getElementById('author').style.borderColor = 'gray';
        document.getElementById('isbn').value = '';
        document.getElementById('isbn').style.borderColor = 'gray';
    }

    // Error Alert
    showAlert(msg, className) {
        // Create div
        const div = document.createElement('div');
        // Add Class Name
        div.className = `alert ${className}`;
        // Add Text
        div.appendChild(document.createTextNode(msg));
        // Get Parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        // Insert Alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // Delete Book
    deleteBook(target) {
        // Confirm Message
        if (target.className === 'delete') {
            const msg = confirm('Are you sure ?');
            if (msg === true) {
                target.parentElement.parentElement.remove();

                // Show Message
                this.showAlert('Book Removed!', 'success');
            } else {

            }

        }
    }
}

// Local Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            // Add Book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event Listner
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (validateTitle() || validateAuthor() || validateISBN()) {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to LS
        Store.addBook(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear Inputs
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {

    // Instantiate UI
    const ui = new UI();

    // Delete Book
    ui.deleteBook(e.target);

    // Remove From Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
});

// Validate Title
document.querySelector('#title').addEventListener('keyup', validateTitle);

function validateTitle(){
    // Get form Values
    const title = document.getElementById('title');

    // REG var
    var regName = /^[a-zA-Z-'. ]+$/;

    if (title === '') {
        return true;
    }else{
        if (regName.test(title.value)) {
            title.style.borderColor = 'green';
            return false;
        } else {
            title.style.borderColor = 'red';
            return true;
        }
    }
}

// Validate Author
document.querySelector('#author').addEventListener('keyup', validateAuthor);

function validateAuthor() {
    // Get form Values
    const author = document.getElementById('author');

    // REG var
    var regName = /^[a-zA-Z-'. ]+$/;

    if (title === '') {
        return true;
    } else {
        if (regName.test(author.value)) {
            author.style.borderColor = 'green';
            return false;
        } else {
            author.style.borderColor = 'red';
            return true;
        }
    }
}

// Validate ISBN
document.querySelector('#isbn').addEventListener('keyup', validateISBN);

function validateISBN() {
    // Get form Values
    const isbn = document.getElementById('isbn');

    // REG var
    var regName = /^[0-9]+$/;

    if (title === '') {
        return true;
    } else {
        if (regName.test(isbn.value)) {
            isbn.style.borderColor = 'green';
            return false;
        } else {
            isbn.style.borderColor = 'red';
            return true;
        }
    }
}
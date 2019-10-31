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
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
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
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

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

    e.preventDefault();
});
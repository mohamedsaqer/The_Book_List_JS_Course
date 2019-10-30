// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor
function UI(){}

// Add Book to list
UI.prototype.addBookToList = function(book){
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
UI.prototype.clearFields = function(){
    title = document.getElementById('title').value = '';
    author = document.getElementById('author').value = '';
    isbn = document.getElementById('isbn').value = '';
}

// Event Listner
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Add book to list
    ui.addBookToList(book);

    // Clear Inputs
    ui.clearFields();

    e.preventDefault();
})
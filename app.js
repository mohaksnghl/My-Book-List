// Book Class
class Book{
	constructor(title, author,isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI Class : Handles UI Tasks
class UI{
	static displayBooks(){

		const books = Store.getBooks();


		books.forEach(function(book){
			UI.addBookToList(book);
		});

	}

	static addBookToList(book){
		let tbody = document.getElementById('book-list');

		let row = document.createElement('tr');

		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</td>
		`;

		tbody.appendChild(row);
	}

	static deleteBook(el){
		if(el.classList.contains('delete')){
			el.parentElement.parentElement.remove();
		}
	}


	static showElert(message, className){
		const div = document.createElement('div');
		div.className = `alert alert-${className}`

		div.appendChild(document.createTextNode(message));

		const container = document.querySelector('.container');
		const form = document.getElementById('book-form');
		container.insertBefore(div,form);

		//Vanish in 2 sec

		setTimeout(function(){
			document.querySelector('.alert').remove()
		},2000)

	}

	static clearFields(){
		document.getElementById('title').value = "";
		document.getElementById('author').value = "";
		document.getElementById('isbn').value = "";
	}
}

// Store Class : Handle Storage
class Store{
	static getBooks(){
		let books;
		if(localStorage.getItem('books') === null){
			books = [];
		}else{
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	static addBook(book){
		const books = Store.getBooks()
		books.push(book);

		localStorage.setItem('books',JSON.stringify(books));
	}

	static removeBook(isbn){
		const books = Store.getBooks();
		
		books.forEach(function(book, index){
			if(book.isbn == isbn){
				books.splice(index,1);	
			}
		});

		localStorage.setItem('books', JSON.stringify(books));
	}

}


// Evnet : Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks());



// Event : Add a book

document.getElementById('book-form').addEventListener('submit', function(e){

		e.preventDefault();
		
		//get form values
		const title = document.getElementById('title').value;
		const author = document.getElementById('author').value;
		const isbn = document.getElementById('isbn').value;



		if(title == '' || author == '' || isbn == ''){
			UI.showElert("Please fill the form", 'danger')
		}else{
		//Book Obj
			const book = new Book(title, author, isbn);

			UI.addBookToList(book);
			Store.addBook(book);

			UI.showElert("Book Successfully Added", 'success');

			UI.clearFields();
		}
});


// Event : Delete a book

document.getElementById('book-list').addEventListener('click', function(e){
	UI.deleteBook(e.target);
	UI.showElert("Book Successfully Removed", 'success');

	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})

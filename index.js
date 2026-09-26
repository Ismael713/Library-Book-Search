window.addEventListener("DOMContentLoaded", function() {
    const results = document.getElementById("resultContainer");
    results.innerHTML = "";
    books.forEach(book => {
        renderBook(book);
    });
    addForm();
    searchBook();

    function renderBook(book) {
        const div = document.createElement("div");
        div.classList.add("book");
        let bookStatus = "";
        if (!book.checkedOut) {
            div.classList.add("available");
            bookStatus = "Available";
        } else {
            div.classList.add("checked-out");
            bookStatus = "Checked Out";
        }
        div.innerHTML = (`<b><span style="font-size: large">${book.title}</b></span> <p><b>Author:</b> ${book.author}</p> <p><b>Rating:</b> ${book.rating} / 5</p>  
        <p><b>Status:</b> ${bookStatus}</p>  <p><b>Genre:</b><span class="genre-tag"> ${book.genre}</p></span>`);
        results.appendChild(div);
        classifyBooks(div, book);
    }

    function classifyBooks(div, book) {
        if (book.rating < 3.5) {
            div.classList.add("rating-low");
        } else if (book.rating >= 3.5 && book.rating < 4.0) {
            div.classList.add("rating-medium");
        } else if (book.rating >= 4.0) {
            div.classList.add("rating-high");
        }
    }

    function addForm() {
        const toggleForm = document.getElementById("toggleFormButton");
        const addBookForm = document.getElementById("addBookForm");
        const bookForm = document.getElementById("bookForm");
        addBookForm.classList.add("addBookForm");
        toggleForm.addEventListener("click", () => {
            if (addBookForm.style.display === "none") {
                addBookForm.style.display = "block";
            } else {
                addBookForm.style.display = "none";
            }
        });
        bookForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let title = document.getElementById("title");
            let author = document.getElementById("author");
            let rating = document.getElementById("rating");
            let genre = document.getElementById("genre");
            let checkedOut = document.getElementById("checkedOut");
            const newBook = {
                title: title.value.trim(),
                author: author.value.trim(),
                rating: rating.value,
                checkedOut: checkedOut.checked,
                genre: genre.value.trim()
            };
            books.push(newBook);
            results.innerHTML = "";
            books.forEach(newBook => {
                renderBook(newBook);
            });
            bookForm.reset();
        })
    }
    function searchBook(){
        const searchTerm = document.getElementById("searchInput");
        const searchButton = document.getElementById("searchButton");
        results.classList.remove("not-found");
        searchButton.addEventListener("click", () => {
            let bookMatch = false;
            results.innerHTML = "";
            results.classList.remove("not-found");
            if(searchTerm.value === ""){
                alert("Please enter a search term");
                return;
            }
            books.forEach(book => {
                if (searchTerm.value === book.title || searchTerm.value === book.author || searchTerm.value === book.genre) {
                    bookMatch = true;
                    let searchedBook = document.createElement("div");
                    let bookStatus = "";
                    searchedBook.classList.add("book");
                    if (!book.checkedOut) {
                        searchedBook.classList.add("available");
                        bookStatus = "Available";
                    } else {
                        searchedBook.classList.add("checked-out");
                        bookStatus = "Checked Out";
                    }
                    searchedBook.innerHTML = (`<b><span style="font-size: large">${book.title}</b></span> <p><b>Author:</b> ${book.author}</p> <p><b>Rating:</b> ${book.rating} / 5</p>  
                    <p><b>Status:</b> ${bookStatus}</p>  <p><b>Genre:</b><span class="genre-tag"> ${book.genre}</p></span>`);
                    results.appendChild(searchedBook);
                    classifyBooks(searchedBook, book);
                }
            });
            if (!bookMatch) {
                results.innerHTML = "Book not found in library";
                results.classList.add("not-found");
            }
        });
    }
})

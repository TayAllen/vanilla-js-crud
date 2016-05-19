/*jshint esnext: true, browser: true, node: true*/

/*Draft the data structure for a book*/
function Book(entry) {
    this.isbn = entry.isbn;
    this.title = entry.title;
    this.year = entry.year;
}

module.exports.collection = {};


/*Define methods to interact with the storage ("library")*/
//Store books in Collection
module.exports.saveEntry = function() {
    var collection = "",
        isError = false,
        newEntry = Object.keys(Book.collection).length;

    try {
        collection = JSON.stringify(Book.collection);
        localStorage["books"] = collection;
    } catch(error) {
        console.log("Error while saving entry to collection\n" + error);
        isError = true;
    }

    if(!isError) {
        console.log(newEntry + "book saved.");
    }
};

//Helper used to convert entries to object
module.exports.convertEntries = function(entry) {
    var book = new Book(entry);
    return book;
};

//Add new book to Book.collection
module.exports.addNew = function(entry) {
    var book = new Book(entry);
    Book.collection[entry.isbn] = book;
    console.log("New book " + entry.title + " created.");
};


//View all books stored in Book.collection
module.exports.viewAll = function() {
    var collection = "",
        books = {},
        entry = "",
        entryList = [];


    try {
        if(localStorage["books"]) {
            collection = localStorage["books"];
        }
    } catch (error) {
        console.log("Error reading local storage\n" + error);
    }


    if(collection) {
        books = JSON.parse(collection);
        entryList = Object.keys(books);

        for(var i = 0; i < entryList.length; ++i) {
            entry = entryList[i];
            Book.collection[entry] = Book.convertEntries(books[entryList]);
        }

        console.log(entryList.length + " Viewing all books.");
    }
};


//Update a Book
module.exports.editBook = function(entry) {
    var book = Book.collection[entry.isbn],
        year = parseInt(entry.year);

    if(book.title !== entry.title) {
        book.title = entry.title;
    }

    if(book.year !== entry.year) {
        book.year = entry.year;
    }

    console.log("Book " + entry.isbn + " has been modified.");
};


//Delete a Book
module.exports.deleteBook = function(isbn) {
    if(Book.collection[isbn]) {
        delete Book.collection[isbn];
        console.log("Book " + isbn + " has been deleted.");
    } else {
        console.log("This book " + isbn + " does not exist.");
    }
};

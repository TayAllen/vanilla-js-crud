/*jshint esnext: true, browser: true, node: true*/

var Book = require("../model/book");

module.exports.loadCollection = {
    viewAllBooks: function () {
        var bookList = window.document.getElementById("#book-list"),
            entry = "",
            entryList = [],
            listItem = {};

        entryList = Object.keys(Book.collection);

        for (var i = 0; i < entryList.length; ++i) {
            entry = entryList[i];
            var bookInfo = document.createDocumentFragment("<li></li>");
            var bookDetails = bookInfo.appendChild(document.createElement("span"));
            bookDetails.createTextNode = Book.collection[entry].title;
            bookDetails.createTextNode = Book.collection[entry].year;
            bookDetails.createTextNode = Book.collection[entry].isbn;

            bookDetails.appendChild(bookList);
        }

        Book.viewAll();
    }
};

module.exports.newEntry = {
    entryListener: function () {
        var saveEntry = window.document.getElementById("#save-entry");
        saveEntry.addEventListener("click", this.saveEntryHandler, false);

        /*window.document.addEventListener("beforeunload", function() {
            Book.saveEntry();
        });*/
    },

    saveEntryHandler: function () {
        var entryForm = window.document.getElementById("#new-book"),
            newBook = {
                isbn: entryForm.isbn.value,
                title: entryForm.title.value,
                year: entryForm.year.value
            };

        Book.saveEntry.call(this, newBook);
        entryForm.reset();
    }
};

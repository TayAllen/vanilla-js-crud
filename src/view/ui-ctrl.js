/*jshint esnext: true, browser: true, node: true*/

var Book = require("../model/book");

module.exports.loadCollection = {
    viewAllBooks: function() {
        var bookList = window.document.getElementById("#book-list"),
            entry = "",
            entryList = [],
            listItem = {};

        Book.viewAll();
        entryList = Object.keys(Book.collection);

        for(var i = 0; i < entryList.length; ++i) {
            entry = entryList[i];
            listItem = document.createDocumentFragment("<span></span>");
            listItem.textContent = Book.collection[entry].title;
            listItem.textContent = Book.collection[entry].year;
            listItem.textContent = Book.collection[entry].isbn;
        }

        listItem.appendChild(bookList);
    }
};

module.exports.newEntry = {
    entryHandler: function() {
        var saveEntry = window.document.getElementById("#save-entry");
        saveEntry.addEventListener("click", saveEntry.saveEntryHandler, false);

        window.document.addEventListener("load", function() {
            var entryForm = window.document.getElementById("#new-book"),
                newBook = {
                    isbn: entryForm.isbn.value,
                    title: entryForm.title.value,
                    year: entryForm.year.value
                };

            Book.saveEntry(newBook);
            entryForm.reset();
        });
    }
};

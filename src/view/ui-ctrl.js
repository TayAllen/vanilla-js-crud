/*jshint esnext: true, browser: true, node: true*/

var Book = require("../model/book");

module.exports.loadCollection = {
    viewAllBooks: function () {
        var bookList = document.getElementById("#book-list"),
            entry = "",
            entryList = [],
            listItem = {};

        entryList = Object.keys(Book.collection);

        for (var i = 0; i < entryList.length; ++i) {
            entry = entryList[i];
            console.log(entry);
        }

        Book.viewAll();
    }
};

module.exports.newEntry = {
    entryListener: function () {
        var saveEntry = document.getElementById("#save-entry");
        saveEntry.addEventListener("click", this.saveEntryHandler, false);

        /*window.document.addEventListener("beforeunload", function() {
            Book.saveEntry();
        });*/
    },

    saveEntryHandler: function () {
        var entryForm = document.getElementById("#new-book"),
            newBook = {
                isbn: entryForm.isbn.value,
                title: entryForm.title.value,
                year: entryForm.year.value
            };

        Book.saveEntry(newBook);
        entryForm.reset();
    }
};

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint esnext: true, browser: true, node: true*/
var BookCtrl = require("../view/new-book");

var Library = {
    model: {},
    view: {},
    ctrl: {}
};


window.document.addEventListener("load", function() {
    BookCtrl.newEntry.setupUI();
    BookCtrl.loadCollection.viewAllBooks();
});

},{"../view/new-book":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
    setupUI: function() {
        var saveEntry = window.document.getElementById("#save-entry");
        saveEntry.addEventListener("click", saveEntry.saveEntryHandler, false);

        window.document.addEventListener("load", function() {
            Book.addNew();
        });
    },

    saveEntryHandler: function() {
        var entryForm = window.document.getElementById("#new-book"),
            newBook = {
                isbn: entryForm.isbn.value,
                title: entryForm.title.value,
                year: entryForm.year.value
            };

        Book.addNew(newBook);
        entryForm.reset();
    }
};

},{"../model/book":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY3RybC9hcHAuanMiLCJzcmMvbW9kZWwvYm9vay5qcyIsInNyYy92aWV3L25ldy1ib29rLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgbm9kZTogdHJ1ZSovXG52YXIgQm9va0N0cmwgPSByZXF1aXJlKFwiLi4vdmlldy9uZXctYm9va1wiKTtcblxudmFyIExpYnJhcnkgPSB7XG4gICAgbW9kZWw6IHt9LFxuICAgIHZpZXc6IHt9LFxuICAgIGN0cmw6IHt9XG59O1xuXG5cbndpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICBCb29rQ3RybC5uZXdFbnRyeS5zZXR1cFVJKCk7XG4gICAgQm9va0N0cmwubG9hZENvbGxlY3Rpb24udmlld0FsbEJvb2tzKCk7XG59KTtcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgbm9kZTogdHJ1ZSovXG5cbi8qRHJhZnQgdGhlIGRhdGEgc3RydWN0dXJlIGZvciBhIGJvb2sqL1xuZnVuY3Rpb24gQm9vayhlbnRyeSkge1xuICAgIHRoaXMuaXNibiA9IGVudHJ5LmlzYm47XG4gICAgdGhpcy50aXRsZSA9IGVudHJ5LnRpdGxlO1xuICAgIHRoaXMueWVhciA9IGVudHJ5LnllYXI7XG59XG5cbm1vZHVsZS5leHBvcnRzLmNvbGxlY3Rpb24gPSB7fTtcblxuXG4vKkRlZmluZSBtZXRob2RzIHRvIGludGVyYWN0IHdpdGggdGhlIHN0b3JhZ2UgKFwibGlicmFyeVwiKSovXG4vL1N0b3JlIGJvb2tzIGluIENvbGxlY3Rpb25cbm1vZHVsZS5leHBvcnRzLnNhdmVFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2xsZWN0aW9uID0gXCJcIixcbiAgICAgICAgaXNFcnJvciA9IGZhbHNlLFxuICAgICAgICBuZXdFbnRyeSA9IE9iamVjdC5rZXlzKEJvb2suY29sbGVjdGlvbikubGVuZ3RoO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29sbGVjdGlvbiA9IEpTT04uc3RyaW5naWZ5KEJvb2suY29sbGVjdGlvbik7XG4gICAgICAgIGxvY2FsU3RvcmFnZVtcImJvb2tzXCJdID0gY29sbGVjdGlvbjtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hpbGUgc2F2aW5nIGVudHJ5IHRvIGNvbGxlY3Rpb25cXG5cIiArIGVycm9yKTtcbiAgICAgICAgaXNFcnJvciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYoIWlzRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2cobmV3RW50cnkgKyBcImJvb2sgc2F2ZWQuXCIpO1xuICAgIH1cbn07XG5cbi8vSGVscGVyIHVzZWQgdG8gY29udmVydCBlbnRyaWVzIHRvIG9iamVjdFxubW9kdWxlLmV4cG9ydHMuY29udmVydEVudHJpZXMgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgIHZhciBib29rID0gbmV3IEJvb2soZW50cnkpO1xuICAgIHJldHVybiBib29rO1xufTtcblxuLy9BZGQgbmV3IGJvb2sgdG8gQm9vay5jb2xsZWN0aW9uXG5tb2R1bGUuZXhwb3J0cy5hZGROZXcgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgIHZhciBib29rID0gbmV3IEJvb2soZW50cnkpO1xuICAgIEJvb2suY29sbGVjdGlvbltlbnRyeS5pc2JuXSA9IGJvb2s7XG4gICAgY29uc29sZS5sb2coXCJOZXcgYm9vayBcIiArIGVudHJ5LnRpdGxlICsgXCIgY3JlYXRlZC5cIik7XG59O1xuXG5cbi8vVmlldyBhbGwgYm9va3Mgc3RvcmVkIGluIEJvb2suY29sbGVjdGlvblxubW9kdWxlLmV4cG9ydHMudmlld0FsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2xsZWN0aW9uID0gXCJcIixcbiAgICAgICAgYm9va3MgPSB7fSxcbiAgICAgICAgZW50cnkgPSBcIlwiLFxuICAgICAgICBlbnRyeUxpc3QgPSBbXTtcblxuXG4gICAgdHJ5IHtcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlW1wiYm9va3NcIl0pIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBsb2NhbFN0b3JhZ2VbXCJib29rc1wiXTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVhZGluZyBsb2NhbCBzdG9yYWdlXFxuXCIgKyBlcnJvcik7XG4gICAgfVxuXG5cbiAgICBpZihjb2xsZWN0aW9uKSB7XG4gICAgICAgIGJvb2tzID0gSlNPTi5wYXJzZShjb2xsZWN0aW9uKTtcbiAgICAgICAgZW50cnlMaXN0ID0gT2JqZWN0LmtleXMoYm9va3MpO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbnRyeUxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGVudHJ5ID0gZW50cnlMaXN0W2ldO1xuICAgICAgICAgICAgQm9vay5jb2xsZWN0aW9uW2VudHJ5XSA9IEJvb2suY29udmVydEVudHJpZXMoYm9va3NbZW50cnlMaXN0XSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhlbnRyeUxpc3QubGVuZ3RoICsgXCIgVmlld2luZyBhbGwgYm9va3MuXCIpO1xuICAgIH1cbn07XG5cblxuLy9VcGRhdGUgYSBCb29rXG5tb2R1bGUuZXhwb3J0cy5lZGl0Qm9vayA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgdmFyIGJvb2sgPSBCb29rLmNvbGxlY3Rpb25bZW50cnkuaXNibl0sXG4gICAgICAgIHllYXIgPSBwYXJzZUludChlbnRyeS55ZWFyKTtcblxuICAgIGlmKGJvb2sudGl0bGUgIT09IGVudHJ5LnRpdGxlKSB7XG4gICAgICAgIGJvb2sudGl0bGUgPSBlbnRyeS50aXRsZTtcbiAgICB9XG5cbiAgICBpZihib29rLnllYXIgIT09IGVudHJ5LnllYXIpIHtcbiAgICAgICAgYm9vay55ZWFyID0gZW50cnkueWVhcjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhcIkJvb2sgXCIgKyBlbnRyeS5pc2JuICsgXCIgaGFzIGJlZW4gbW9kaWZpZWQuXCIpO1xufTtcblxuXG4vL0RlbGV0ZSBhIEJvb2tcbm1vZHVsZS5leHBvcnRzLmRlbGV0ZUJvb2sgPSBmdW5jdGlvbihpc2JuKSB7XG4gICAgaWYoQm9vay5jb2xsZWN0aW9uW2lzYm5dKSB7XG4gICAgICAgIGRlbGV0ZSBCb29rLmNvbGxlY3Rpb25baXNibl07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQm9vayBcIiArIGlzYm4gKyBcIiBoYXMgYmVlbiBkZWxldGVkLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgYm9vayBcIiArIGlzYm4gKyBcIiBkb2VzIG5vdCBleGlzdC5cIik7XG4gICAgfVxufTtcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgbm9kZTogdHJ1ZSovXG5cbnZhciBCb29rID0gcmVxdWlyZShcIi4uL21vZGVsL2Jvb2tcIik7XG5cbm1vZHVsZS5leHBvcnRzLmxvYWRDb2xsZWN0aW9uID0ge1xuICAgIHZpZXdBbGxCb29rczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBib29rTGlzdCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIiNib29rLWxpc3RcIiksXG4gICAgICAgICAgICBlbnRyeSA9IFwiXCIsXG4gICAgICAgICAgICBlbnRyeUxpc3QgPSBbXSxcbiAgICAgICAgICAgIGxpc3RJdGVtID0ge307XG5cbiAgICAgICAgQm9vay52aWV3QWxsKCk7XG4gICAgICAgIGVudHJ5TGlzdCA9IE9iamVjdC5rZXlzKEJvb2suY29sbGVjdGlvbik7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVudHJ5TGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZW50cnkgPSBlbnRyeUxpc3RbaV07XG4gICAgICAgICAgICBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoXCI8c3Bhbj48L3NwYW4+XCIpO1xuICAgICAgICAgICAgbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBCb29rLmNvbGxlY3Rpb25bZW50cnldLnRpdGxlO1xuICAgICAgICAgICAgbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBCb29rLmNvbGxlY3Rpb25bZW50cnldLnllYXI7XG4gICAgICAgICAgICBsaXN0SXRlbS50ZXh0Q29udGVudCA9IEJvb2suY29sbGVjdGlvbltlbnRyeV0uaXNibjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGJvb2tMaXN0KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5uZXdFbnRyeSA9IHtcbiAgICBzZXR1cFVJOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNhdmVFbnRyeSA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIiNzYXZlLWVudHJ5XCIpO1xuICAgICAgICBzYXZlRW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVFbnRyeS5zYXZlRW50cnlIYW5kbGVyLCBmYWxzZSk7XG5cbiAgICAgICAgd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgQm9vay5hZGROZXcoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNhdmVFbnRyeUhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW50cnlGb3JtID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiI25ldy1ib29rXCIpLFxuICAgICAgICAgICAgbmV3Qm9vayA9IHtcbiAgICAgICAgICAgICAgICBpc2JuOiBlbnRyeUZvcm0uaXNibi52YWx1ZSxcbiAgICAgICAgICAgICAgICB0aXRsZTogZW50cnlGb3JtLnRpdGxlLnZhbHVlLFxuICAgICAgICAgICAgICAgIHllYXI6IGVudHJ5Rm9ybS55ZWFyLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIEJvb2suYWRkTmV3KG5ld0Jvb2spO1xuICAgICAgICBlbnRyeUZvcm0ucmVzZXQoKTtcbiAgICB9XG59O1xuIl19

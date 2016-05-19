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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY3RybC9hcHAuanMiLCJzcmMvbW9kZWwvYm9vay5qcyIsInNyYy92aWV3L25ldy1ib29rLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgbm9kZTogdHJ1ZSovXHJcbnZhciBCb29rQ3RybCA9IHJlcXVpcmUoXCIuLi92aWV3L25ldy1ib29rXCIpO1xyXG5cclxudmFyIExpYnJhcnkgPSB7XHJcbiAgICBtb2RlbDoge30sXHJcbiAgICB2aWV3OiB7fSxcclxuICAgIGN0cmw6IHt9XHJcbn07XHJcblxyXG5cclxud2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgQm9va0N0cmwubmV3RW50cnkuc2V0dXBVSSgpO1xyXG4gICAgQm9va0N0cmwubG9hZENvbGxlY3Rpb24udmlld0FsbEJvb2tzKCk7XHJcbn0pOyIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgbm9kZTogdHJ1ZSovXHJcblxyXG4vKkRyYWZ0IHRoZSBkYXRhIHN0cnVjdHVyZSBmb3IgYSBib29rKi9cclxuZnVuY3Rpb24gQm9vayhlbnRyeSkge1xyXG4gICAgdGhpcy5pc2JuID0gZW50cnkuaXNibjtcclxuICAgIHRoaXMudGl0bGUgPSBlbnRyeS50aXRsZTtcclxuICAgIHRoaXMueWVhciA9IGVudHJ5LnllYXI7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzLmNvbGxlY3Rpb24gPSB7fTtcclxuXHJcblxyXG4vKkRlZmluZSBtZXRob2RzIHRvIGludGVyYWN0IHdpdGggdGhlIHN0b3JhZ2UgKFwibGlicmFyeVwiKSovXHJcbi8vU3RvcmUgYm9va3MgaW4gQ29sbGVjdGlvblxyXG5tb2R1bGUuZXhwb3J0cy5zYXZlRW50cnkgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjb2xsZWN0aW9uID0gXCJcIixcclxuICAgICAgICBpc0Vycm9yID0gZmFsc2UsXHJcbiAgICAgICAgbmV3RW50cnkgPSBPYmplY3Qua2V5cyhCb29rLmNvbGxlY3Rpb24pLmxlbmd0aDtcclxuICAgIFxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb2xsZWN0aW9uID0gSlNPTi5zdHJpbmdpZnkoQm9vay5jb2xsZWN0aW9uKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2VbXCJib29rc1wiXSA9IGNvbGxlY3Rpb247XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aGlsZSBzYXZpbmcgZW50cnkgdG8gY29sbGVjdGlvblxcblwiICsgZXJyb3IpO1xyXG4gICAgICAgIGlzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZighaXNFcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld0VudHJ5ICsgXCJib29rIHNhdmVkLlwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vSGVscGVyIHVzZWQgdG8gY29udmVydCBlbnRyaWVzIHRvIG9iamVjdFxyXG5tb2R1bGUuZXhwb3J0cy5jb252ZXJ0RW50cmllcyA9IGZ1bmN0aW9uKGVudHJ5KSB7XHJcbiAgICB2YXIgYm9vayA9IG5ldyBCb29rKGVudHJ5KTtcclxuICAgIHJldHVybiBib29rO1xyXG59O1xyXG5cclxuLy9BZGQgbmV3IGJvb2sgdG8gQm9vay5jb2xsZWN0aW9uXHJcbm1vZHVsZS5leHBvcnRzLmFkZE5ldyA9IGZ1bmN0aW9uKGVudHJ5KSB7XHJcbiAgICB2YXIgYm9vayA9IG5ldyBCb29rKGVudHJ5KTtcclxuICAgIEJvb2suY29sbGVjdGlvbltlbnRyeS5pc2JuXSA9IGJvb2s7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5ldyBib29rIFwiICsgZW50cnkudGl0bGUgKyBcIiBjcmVhdGVkLlwiKTtcclxufTtcclxuXHJcblxyXG4vL1ZpZXcgYWxsIGJvb2tzIHN0b3JlZCBpbiBCb29rLmNvbGxlY3Rpb25cclxubW9kdWxlLmV4cG9ydHMudmlld0FsbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNvbGxlY3Rpb24gPSBcIlwiLFxyXG4gICAgICAgIGJvb2tzID0ge30sXHJcbiAgICAgICAgZW50cnkgPSBcIlwiLFxyXG4gICAgICAgIGVudHJ5TGlzdCA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZVtcImJvb2tzXCJdKSB7XHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBsb2NhbFN0b3JhZ2VbXCJib29rc1wiXTtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVhZGluZyBsb2NhbCBzdG9yYWdlXFxuXCIgKyBlcnJvcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgaWYoY29sbGVjdGlvbikge1xyXG4gICAgICAgIGJvb2tzID0gSlNPTi5wYXJzZShjb2xsZWN0aW9uKTtcclxuICAgICAgICBlbnRyeUxpc3QgPSBPYmplY3Qua2V5cyhib29rcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVudHJ5TGlzdC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBlbnRyeSA9IGVudHJ5TGlzdFtpXTtcclxuICAgICAgICAgICAgQm9vay5jb2xsZWN0aW9uW2VudHJ5XSA9IEJvb2suY29udmVydEVudHJpZXMoYm9va3NbZW50cnlMaXN0XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGVudHJ5TGlzdC5sZW5ndGggKyBcIiBWaWV3aW5nIGFsbCBib29rcy5cIik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLy9VcGRhdGUgYSBCb29rXHJcbm1vZHVsZS5leHBvcnRzLmVkaXRCb29rID0gZnVuY3Rpb24oZW50cnkpIHtcclxuICAgIHZhciBib29rID0gQm9vay5jb2xsZWN0aW9uW2VudHJ5LmlzYm5dLFxyXG4gICAgICAgIHllYXIgPSBwYXJzZUludChlbnRyeS55ZWFyKTtcclxuICAgIFxyXG4gICAgaWYoYm9vay50aXRsZSAhPT0gZW50cnkudGl0bGUpIHtcclxuICAgICAgICBib29rLnRpdGxlID0gZW50cnkudGl0bGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmKGJvb2sueWVhciAhPT0gZW50cnkueWVhcikge1xyXG4gICAgICAgIGJvb2sueWVhciA9IGVudHJ5LnllYXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKFwiQm9vayBcIiArIGVudHJ5LmlzYm4gKyBcIiBoYXMgYmVlbiBtb2RpZmllZC5cIik7XHJcbn07XHJcblxyXG5cclxuLy9EZWxldGUgYSBCb29rXHJcbm1vZHVsZS5leHBvcnRzLmRlbGV0ZUJvb2sgPSBmdW5jdGlvbihpc2JuKSB7XHJcbiAgICBpZihCb29rLmNvbGxlY3Rpb25baXNibl0pIHtcclxuICAgICAgICBkZWxldGUgQm9vay5jb2xsZWN0aW9uW2lzYm5dO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQm9vayBcIiArIGlzYm4gKyBcIiBoYXMgYmVlbiBkZWxldGVkLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGJvb2sgXCIgKyBpc2JuICsgXCIgZG9lcyBub3QgZXhpc3QuXCIpO1xyXG4gICAgfVxyXG59OyIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgbm9kZTogdHJ1ZSovXHJcblxyXG52YXIgQm9vayA9IHJlcXVpcmUoXCIuLi9tb2RlbC9ib29rXCIpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMubG9hZENvbGxlY3Rpb24gPSB7XHJcbiAgICB2aWV3QWxsQm9va3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBib29rTGlzdCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIiNib29rLWxpc3RcIiksXHJcbiAgICAgICAgICAgIGVudHJ5ID0gXCJcIixcclxuICAgICAgICAgICAgZW50cnlMaXN0ID0gW10sXHJcbiAgICAgICAgICAgIGxpc3RJdGVtID0ge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgQm9vay52aWV3QWxsKCk7XHJcbiAgICAgICAgZW50cnlMaXN0ID0gT2JqZWN0LmtleXMoQm9vay5jb2xsZWN0aW9uKTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVudHJ5TGlzdC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBlbnRyeSA9IGVudHJ5TGlzdFtpXTtcclxuICAgICAgICAgICAgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KFwiPHNwYW4+PC9zcGFuPlwiKTtcclxuICAgICAgICAgICAgbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBCb29rLmNvbGxlY3Rpb25bZW50cnldLnRpdGxlO1xyXG4gICAgICAgICAgICBsaXN0SXRlbS50ZXh0Q29udGVudCA9IEJvb2suY29sbGVjdGlvbltlbnRyeV0ueWVhcjtcclxuICAgICAgICAgICAgbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBCb29rLmNvbGxlY3Rpb25bZW50cnldLmlzYm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGJvb2tMaXN0KTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLm5ld0VudHJ5ID0ge1xyXG4gICAgc2V0dXBVSTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNhdmVFbnRyeSA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIiNzYXZlLWVudHJ5XCIpO1xyXG4gICAgICAgIHNhdmVFbnRyeS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2F2ZUVudHJ5LnNhdmVFbnRyeUhhbmRsZXIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBCb29rLmFkZE5ldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgc2F2ZUVudHJ5SGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVudHJ5Rm9ybSA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIiNuZXctYm9va1wiKSxcclxuICAgICAgICAgICAgbmV3Qm9vayA9IHtcclxuICAgICAgICAgICAgICAgIGlzYm46IGVudHJ5Rm9ybS5pc2JuLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGVudHJ5Rm9ybS50aXRsZS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIHllYXI6IGVudHJ5Rm9ybS55ZWFyLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgQm9vay5hZGROZXcobmV3Qm9vayk7XHJcbiAgICAgICAgZW50cnlGb3JtLnJlc2V0KCk7XHJcbiAgICB9XHJcbn07Il19

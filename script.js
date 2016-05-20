(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint esnext: true, browser: true, node: true*/
var UICtrl = require("../view/ui-ctrl");

document.addEventListener("load", function() {
    UICtrl.loadCollection.viewAllBooks();
});

},{"../view/ui-ctrl":3}],2:[function(require,module,exports){
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
    Book.collection.push(book);
    console.log("New book " + entry.title + " created.");
};


//View all books stored in Book.collection
module.exports.viewAll = function() {
    var collection = "",
        books = {},
        entry = "",
        entryList = [];


    try {
        if(localStorage["book"]) {
            collection = localStorage["book"];
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

},{"../model/book":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY3RybC9hcHAuanMiLCJzcmMvbW9kZWwvYm9vay5qcyIsInNyYy92aWV3L3VpLWN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlLCBicm93c2VyOiB0cnVlLCBub2RlOiB0cnVlKi9cbnZhciBVSUN0cmwgPSByZXF1aXJlKFwiLi4vdmlldy91aS1jdHJsXCIpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICBVSUN0cmwubG9hZENvbGxlY3Rpb24udmlld0FsbEJvb2tzKCk7XG59KTtcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgbm9kZTogdHJ1ZSovXG5cbi8qRHJhZnQgdGhlIGRhdGEgc3RydWN0dXJlIGZvciBhIGJvb2sqL1xuZnVuY3Rpb24gQm9vayhlbnRyeSkge1xuICAgIHRoaXMuaXNibiA9IGVudHJ5LmlzYm47XG4gICAgdGhpcy50aXRsZSA9IGVudHJ5LnRpdGxlO1xuICAgIHRoaXMueWVhciA9IGVudHJ5LnllYXI7XG59XG5cbm1vZHVsZS5leHBvcnRzLmNvbGxlY3Rpb24gPSB7fTtcblxuXG4vKkRlZmluZSBtZXRob2RzIHRvIGludGVyYWN0IHdpdGggdGhlIHN0b3JhZ2UgKFwibGlicmFyeVwiKSovXG4vL1N0b3JlIGJvb2tzIGluIENvbGxlY3Rpb25cbm1vZHVsZS5leHBvcnRzLnNhdmVFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2xsZWN0aW9uID0gXCJcIixcbiAgICAgICAgaXNFcnJvciA9IGZhbHNlLFxuICAgICAgICBuZXdFbnRyeSA9IE9iamVjdC5rZXlzKEJvb2suY29sbGVjdGlvbikubGVuZ3RoO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29sbGVjdGlvbiA9IEpTT04uc3RyaW5naWZ5KEJvb2suY29sbGVjdGlvbik7XG4gICAgICAgIGxvY2FsU3RvcmFnZVtcImJvb2tzXCJdID0gY29sbGVjdGlvbjtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hpbGUgc2F2aW5nIGVudHJ5IHRvIGNvbGxlY3Rpb25cXG5cIiArIGVycm9yKTtcbiAgICAgICAgaXNFcnJvciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYoIWlzRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2cobmV3RW50cnkgKyBcImJvb2sgc2F2ZWQuXCIpO1xuICAgIH1cbn07XG5cbi8vSGVscGVyIHVzZWQgdG8gY29udmVydCBlbnRyaWVzIHRvIG9iamVjdFxubW9kdWxlLmV4cG9ydHMuY29udmVydEVudHJpZXMgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgIHZhciBib29rID0gbmV3IEJvb2soZW50cnkpO1xuICAgIHJldHVybiBib29rO1xufTtcblxuLy9BZGQgbmV3IGJvb2sgdG8gQm9vay5jb2xsZWN0aW9uXG5tb2R1bGUuZXhwb3J0cy5hZGROZXcgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgIHZhciBib29rID0gbmV3IEJvb2soZW50cnkpO1xuICAgIEJvb2suY29sbGVjdGlvbi5wdXNoKGJvb2spO1xuICAgIGNvbnNvbGUubG9nKFwiTmV3IGJvb2sgXCIgKyBlbnRyeS50aXRsZSArIFwiIGNyZWF0ZWQuXCIpO1xufTtcblxuXG4vL1ZpZXcgYWxsIGJvb2tzIHN0b3JlZCBpbiBCb29rLmNvbGxlY3Rpb25cbm1vZHVsZS5leHBvcnRzLnZpZXdBbGwgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29sbGVjdGlvbiA9IFwiXCIsXG4gICAgICAgIGJvb2tzID0ge30sXG4gICAgICAgIGVudHJ5ID0gXCJcIixcbiAgICAgICAgZW50cnlMaXN0ID0gW107XG5cblxuICAgIHRyeSB7XG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZVtcImJvb2tcIl0pIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBsb2NhbFN0b3JhZ2VbXCJib29rXCJdO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZWFkaW5nIGxvY2FsIHN0b3JhZ2VcXG5cIiArIGVycm9yKTtcbiAgICB9XG5cblxuICAgIGlmKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgYm9va3MgPSBKU09OLnBhcnNlKGNvbGxlY3Rpb24pO1xuICAgICAgICBlbnRyeUxpc3QgPSBPYmplY3Qua2V5cyhib29rcyk7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVudHJ5TGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZW50cnkgPSBlbnRyeUxpc3RbaV07XG4gICAgICAgICAgICBCb29rLmNvbGxlY3Rpb25bZW50cnldID0gQm9vay5jb252ZXJ0RW50cmllcyhib29rc1tlbnRyeUxpc3RdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKGVudHJ5TGlzdC5sZW5ndGggKyBcIiBWaWV3aW5nIGFsbCBib29rcy5cIik7XG4gICAgfVxufTtcblxuXG4vL1VwZGF0ZSBhIEJvb2tcbm1vZHVsZS5leHBvcnRzLmVkaXRCb29rID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICB2YXIgYm9vayA9IEJvb2suY29sbGVjdGlvbltlbnRyeS5pc2JuXSxcbiAgICAgICAgeWVhciA9IHBhcnNlSW50KGVudHJ5LnllYXIpO1xuXG4gICAgaWYoYm9vay50aXRsZSAhPT0gZW50cnkudGl0bGUpIHtcbiAgICAgICAgYm9vay50aXRsZSA9IGVudHJ5LnRpdGxlO1xuICAgIH1cblxuICAgIGlmKGJvb2sueWVhciAhPT0gZW50cnkueWVhcikge1xuICAgICAgICBib29rLnllYXIgPSBlbnRyeS55ZWFyO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwiQm9vayBcIiArIGVudHJ5LmlzYm4gKyBcIiBoYXMgYmVlbiBtb2RpZmllZC5cIik7XG59O1xuXG5cbi8vRGVsZXRlIGEgQm9va1xubW9kdWxlLmV4cG9ydHMuZGVsZXRlQm9vayA9IGZ1bmN0aW9uKGlzYm4pIHtcbiAgICBpZihCb29rLmNvbGxlY3Rpb25baXNibl0pIHtcbiAgICAgICAgZGVsZXRlIEJvb2suY29sbGVjdGlvbltpc2JuXTtcbiAgICAgICAgY29uc29sZS5sb2coXCJCb29rIFwiICsgaXNibiArIFwiIGhhcyBiZWVuIGRlbGV0ZWQuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBib29rIFwiICsgaXNibiArIFwiIGRvZXMgbm90IGV4aXN0LlwiKTtcbiAgICB9XG59O1xuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlLCBicm93c2VyOiB0cnVlLCBub2RlOiB0cnVlKi9cblxudmFyIEJvb2sgPSByZXF1aXJlKFwiLi4vbW9kZWwvYm9va1wiKTtcblxubW9kdWxlLmV4cG9ydHMubG9hZENvbGxlY3Rpb24gPSB7XG4gICAgdmlld0FsbEJvb2tzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBib29rTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiI2Jvb2stbGlzdFwiKSxcbiAgICAgICAgICAgIGVudHJ5ID0gXCJcIixcbiAgICAgICAgICAgIGVudHJ5TGlzdCA9IFtdLFxuICAgICAgICAgICAgbGlzdEl0ZW0gPSB7fTtcblxuICAgICAgICBlbnRyeUxpc3QgPSBPYmplY3Qua2V5cyhCb29rLmNvbGxlY3Rpb24pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW50cnlMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBlbnRyeSA9IGVudHJ5TGlzdFtpXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJvb2sudmlld0FsbCgpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLm5ld0VudHJ5ID0ge1xuICAgIGVudHJ5TGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNhdmVFbnRyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiI3NhdmUtZW50cnlcIik7XG4gICAgICAgIHNhdmVFbnRyeS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zYXZlRW50cnlIYW5kbGVyLCBmYWxzZSk7XG5cbiAgICAgICAgLyp3aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEJvb2suc2F2ZUVudHJ5KCk7XG4gICAgICAgIH0pOyovXG4gICAgfSxcblxuICAgIHNhdmVFbnRyeUhhbmRsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVudHJ5Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiI25ldy1ib29rXCIpLFxuICAgICAgICAgICAgbmV3Qm9vayA9IHtcbiAgICAgICAgICAgICAgICBpc2JuOiBlbnRyeUZvcm0uaXNibi52YWx1ZSxcbiAgICAgICAgICAgICAgICB0aXRsZTogZW50cnlGb3JtLnRpdGxlLnZhbHVlLFxuICAgICAgICAgICAgICAgIHllYXI6IGVudHJ5Rm9ybS55ZWFyLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIEJvb2suc2F2ZUVudHJ5KG5ld0Jvb2spO1xuICAgICAgICBlbnRyeUZvcm0ucmVzZXQoKTtcbiAgICB9XG59O1xuIl19

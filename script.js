(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint esnext: true, browser: true, node: true*/
var UICtrl = require("../view/ui-ctrl");

var Library = {
    model: {},
    view: {},
    ctrl: {}
};


window.document.addEventListener("load", function() {
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

Book.collection = {};


/*Define methods to interact with the storage ("library")*/
//Store books in Collection
Book.saveEntry = function() {
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
Book.convertEntries = function(entry) {
    var book = new Book(entry);
    return book;
};

//Add new book to Book.collection
Book.addNew = function(entry) {
    var book = new Book(entry);
    Book.collection[entry.isbn] = book;
    console.log("New book " + entry.title + " created.");
};


//View all books stored in Book.collection
Book.viewAll = function() {
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
Book.editBook = function(entry) {
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
Book.deleteBook = function(isbn) {
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

},{"../model/book":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY3RybC9hcHAuanMiLCJzcmMvbW9kZWwvYm9vay5qcyIsInNyYy92aWV3L3VpLWN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBlc25leHQ6IHRydWUsIGJyb3dzZXI6IHRydWUsIG5vZGU6IHRydWUqL1xudmFyIFVJQ3RybCA9IHJlcXVpcmUoXCIuLi92aWV3L3VpLWN0cmxcIik7XG5cbnZhciBMaWJyYXJ5ID0ge1xuICAgIG1vZGVsOiB7fSxcbiAgICB2aWV3OiB7fSxcbiAgICBjdHJsOiB7fVxufTtcblxuXG53aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgVUlDdHJsLmxvYWRDb2xsZWN0aW9uLnZpZXdBbGxCb29rcygpO1xufSk7XG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUsIGJyb3dzZXI6IHRydWUsIG5vZGU6IHRydWUqL1xuXG4vKkRyYWZ0IHRoZSBkYXRhIHN0cnVjdHVyZSBmb3IgYSBib29rKi9cbmZ1bmN0aW9uIEJvb2soZW50cnkpIHtcbiAgICB0aGlzLmlzYm4gPSBlbnRyeS5pc2JuO1xuICAgIHRoaXMudGl0bGUgPSBlbnRyeS50aXRsZTtcbiAgICB0aGlzLnllYXIgPSBlbnRyeS55ZWFyO1xufVxuXG5Cb29rLmNvbGxlY3Rpb24gPSB7fTtcblxuXG4vKkRlZmluZSBtZXRob2RzIHRvIGludGVyYWN0IHdpdGggdGhlIHN0b3JhZ2UgKFwibGlicmFyeVwiKSovXG4vL1N0b3JlIGJvb2tzIGluIENvbGxlY3Rpb25cbkJvb2suc2F2ZUVudHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSBcIlwiLFxuICAgICAgICBpc0Vycm9yID0gZmFsc2UsXG4gICAgICAgIG5ld0VudHJ5ID0gT2JqZWN0LmtleXMoQm9vay5jb2xsZWN0aW9uKS5sZW5ndGg7XG5cbiAgICB0cnkge1xuICAgICAgICBjb2xsZWN0aW9uID0gSlNPTi5zdHJpbmdpZnkoQm9vay5jb2xsZWN0aW9uKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlW1wiYm9va3NcIl0gPSBjb2xsZWN0aW9uO1xuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aGlsZSBzYXZpbmcgZW50cnkgdG8gY29sbGVjdGlvblxcblwiICsgZXJyb3IpO1xuICAgICAgICBpc0Vycm9yID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZighaXNFcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhuZXdFbnRyeSArIFwiYm9vayBzYXZlZC5cIik7XG4gICAgfVxufTtcblxuLy9IZWxwZXIgdXNlZCB0byBjb252ZXJ0IGVudHJpZXMgdG8gb2JqZWN0XG5Cb29rLmNvbnZlcnRFbnRyaWVzID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICB2YXIgYm9vayA9IG5ldyBCb29rKGVudHJ5KTtcbiAgICByZXR1cm4gYm9vaztcbn07XG5cbi8vQWRkIG5ldyBib29rIHRvIEJvb2suY29sbGVjdGlvblxuQm9vay5hZGROZXcgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgIHZhciBib29rID0gbmV3IEJvb2soZW50cnkpO1xuICAgIEJvb2suY29sbGVjdGlvbltlbnRyeS5pc2JuXSA9IGJvb2s7XG4gICAgY29uc29sZS5sb2coXCJOZXcgYm9vayBcIiArIGVudHJ5LnRpdGxlICsgXCIgY3JlYXRlZC5cIik7XG59O1xuXG5cbi8vVmlldyBhbGwgYm9va3Mgc3RvcmVkIGluIEJvb2suY29sbGVjdGlvblxuQm9vay52aWV3QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSBcIlwiLFxuICAgICAgICBib29rcyA9IHt9LFxuICAgICAgICBlbnRyeSA9IFwiXCIsXG4gICAgICAgIGVudHJ5TGlzdCA9IFtdO1xuXG5cbiAgICB0cnkge1xuICAgICAgICBpZihsb2NhbFN0b3JhZ2VbXCJib29rc1wiXSkge1xuICAgICAgICAgICAgY29sbGVjdGlvbiA9IGxvY2FsU3RvcmFnZVtcImJvb2tzXCJdO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZWFkaW5nIGxvY2FsIHN0b3JhZ2VcXG5cIiArIGVycm9yKTtcbiAgICB9XG5cblxuICAgIGlmKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgYm9va3MgPSBKU09OLnBhcnNlKGNvbGxlY3Rpb24pO1xuICAgICAgICBlbnRyeUxpc3QgPSBPYmplY3Qua2V5cyhib29rcyk7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVudHJ5TGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZW50cnkgPSBlbnRyeUxpc3RbaV07XG4gICAgICAgICAgICBCb29rLmNvbGxlY3Rpb25bZW50cnldID0gQm9vay5jb252ZXJ0RW50cmllcyhib29rc1tlbnRyeUxpc3RdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKGVudHJ5TGlzdC5sZW5ndGggKyBcIiBWaWV3aW5nIGFsbCBib29rcy5cIik7XG4gICAgfVxufTtcblxuXG4vL1VwZGF0ZSBhIEJvb2tcbkJvb2suZWRpdEJvb2sgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgIHZhciBib29rID0gQm9vay5jb2xsZWN0aW9uW2VudHJ5LmlzYm5dLFxuICAgICAgICB5ZWFyID0gcGFyc2VJbnQoZW50cnkueWVhcik7XG5cbiAgICBpZihib29rLnRpdGxlICE9PSBlbnRyeS50aXRsZSkge1xuICAgICAgICBib29rLnRpdGxlID0gZW50cnkudGl0bGU7XG4gICAgfVxuXG4gICAgaWYoYm9vay55ZWFyICE9PSBlbnRyeS55ZWFyKSB7XG4gICAgICAgIGJvb2sueWVhciA9IGVudHJ5LnllYXI7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJCb29rIFwiICsgZW50cnkuaXNibiArIFwiIGhhcyBiZWVuIG1vZGlmaWVkLlwiKTtcbn07XG5cblxuLy9EZWxldGUgYSBCb29rXG5Cb29rLmRlbGV0ZUJvb2sgPSBmdW5jdGlvbihpc2JuKSB7XG4gICAgaWYoQm9vay5jb2xsZWN0aW9uW2lzYm5dKSB7XG4gICAgICAgIGRlbGV0ZSBCb29rLmNvbGxlY3Rpb25baXNibl07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQm9vayBcIiArIGlzYm4gKyBcIiBoYXMgYmVlbiBkZWxldGVkLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgYm9vayBcIiArIGlzYm4gKyBcIiBkb2VzIG5vdCBleGlzdC5cIik7XG4gICAgfVxufTtcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgbm9kZTogdHJ1ZSovXG5cbnZhciBCb29rID0gcmVxdWlyZShcIi4uL21vZGVsL2Jvb2tcIik7XG5cbm1vZHVsZS5leHBvcnRzLmxvYWRDb2xsZWN0aW9uID0ge1xuICAgIHZpZXdBbGxCb29rczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9va0xpc3QgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIjYm9vay1saXN0XCIpLFxuICAgICAgICAgICAgZW50cnkgPSBcIlwiLFxuICAgICAgICAgICAgZW50cnlMaXN0ID0gW10sXG4gICAgICAgICAgICBsaXN0SXRlbSA9IHt9O1xuXG4gICAgICAgIGVudHJ5TGlzdCA9IE9iamVjdC5rZXlzKEJvb2suY29sbGVjdGlvbik7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyeUxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGVudHJ5ID0gZW50cnlMaXN0W2ldO1xuICAgICAgICAgICAgdmFyIGJvb2tJbmZvID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudChcIjxsaT48L2xpPlwiKTtcbiAgICAgICAgICAgIHZhciBib29rRGV0YWlscyA9IGJvb2tJbmZvLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgICAgICAgIGJvb2tEZXRhaWxzLmNyZWF0ZVRleHROb2RlID0gQm9vay5jb2xsZWN0aW9uW2VudHJ5XS50aXRsZTtcbiAgICAgICAgICAgIGJvb2tEZXRhaWxzLmNyZWF0ZVRleHROb2RlID0gQm9vay5jb2xsZWN0aW9uW2VudHJ5XS55ZWFyO1xuICAgICAgICAgICAgYm9va0RldGFpbHMuY3JlYXRlVGV4dE5vZGUgPSBCb29rLmNvbGxlY3Rpb25bZW50cnldLmlzYm47XG5cbiAgICAgICAgICAgIGJvb2tEZXRhaWxzLmFwcGVuZENoaWxkKGJvb2tMaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJvb2sudmlld0FsbCgpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLm5ld0VudHJ5ID0ge1xuICAgIGVudHJ5TGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNhdmVFbnRyeSA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIiNzYXZlLWVudHJ5XCIpO1xuICAgICAgICBzYXZlRW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2F2ZUVudHJ5SGFuZGxlciwgZmFsc2UpO1xuXG4gICAgICAgIC8qd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBCb29rLnNhdmVFbnRyeSgpO1xuICAgICAgICB9KTsqL1xuICAgIH0sXG5cbiAgICBzYXZlRW50cnlIYW5kbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbnRyeUZvcm0gPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIjbmV3LWJvb2tcIiksXG4gICAgICAgICAgICBuZXdCb29rID0ge1xuICAgICAgICAgICAgICAgIGlzYm46IGVudHJ5Rm9ybS5pc2JuLnZhbHVlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBlbnRyeUZvcm0udGl0bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgeWVhcjogZW50cnlGb3JtLnllYXIudmFsdWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgQm9vay5zYXZlRW50cnkuY2FsbCh0aGlzLCBuZXdCb29rKTtcbiAgICAgICAgZW50cnlGb3JtLnJlc2V0KCk7XG4gICAgfVxufTtcbiJdfQ==

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY3RybC9hcHAuanMiLCJzcmMvbW9kZWwvYm9vay5qcyIsInNyYy92aWV3L3VpLWN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlLCBicm93c2VyOiB0cnVlLCBub2RlOiB0cnVlKi9cbnZhciBVSUN0cmwgPSByZXF1aXJlKFwiLi4vdmlldy91aS1jdHJsXCIpO1xuXG52YXIgTGlicmFyeSA9IHtcbiAgICBtb2RlbDoge30sXG4gICAgdmlldzoge30sXG4gICAgY3RybDoge31cbn07XG5cblxud2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgIFVJQ3RybC5sb2FkQ29sbGVjdGlvbi52aWV3QWxsQm9va3MoKTtcbn0pO1xuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlLCBicm93c2VyOiB0cnVlLCBub2RlOiB0cnVlKi9cblxuLypEcmFmdCB0aGUgZGF0YSBzdHJ1Y3R1cmUgZm9yIGEgYm9vayovXG5mdW5jdGlvbiBCb29rKGVudHJ5KSB7XG4gICAgdGhpcy5pc2JuID0gZW50cnkuaXNibjtcbiAgICB0aGlzLnRpdGxlID0gZW50cnkudGl0bGU7XG4gICAgdGhpcy55ZWFyID0gZW50cnkueWVhcjtcbn1cblxuQm9vay5jb2xsZWN0aW9uID0ge307XG5cblxuLypEZWZpbmUgbWV0aG9kcyB0byBpbnRlcmFjdCB3aXRoIHRoZSBzdG9yYWdlIChcImxpYnJhcnlcIikqL1xuLy9TdG9yZSBib29rcyBpbiBDb2xsZWN0aW9uXG5Cb29rLnNhdmVFbnRyeSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2xsZWN0aW9uID0gXCJcIixcbiAgICAgICAgaXNFcnJvciA9IGZhbHNlLFxuICAgICAgICBuZXdFbnRyeSA9IE9iamVjdC5rZXlzKEJvb2suY29sbGVjdGlvbikubGVuZ3RoO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29sbGVjdGlvbiA9IEpTT04uc3RyaW5naWZ5KEJvb2suY29sbGVjdGlvbik7XG4gICAgICAgIGxvY2FsU3RvcmFnZVtcImJvb2tzXCJdID0gY29sbGVjdGlvbjtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hpbGUgc2F2aW5nIGVudHJ5IHRvIGNvbGxlY3Rpb25cXG5cIiArIGVycm9yKTtcbiAgICAgICAgaXNFcnJvciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYoIWlzRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2cobmV3RW50cnkgKyBcImJvb2sgc2F2ZWQuXCIpO1xuICAgIH1cbn07XG5cbi8vSGVscGVyIHVzZWQgdG8gY29udmVydCBlbnRyaWVzIHRvIG9iamVjdFxuQm9vay5jb252ZXJ0RW50cmllcyA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgdmFyIGJvb2sgPSBuZXcgQm9vayhlbnRyeSk7XG4gICAgcmV0dXJuIGJvb2s7XG59O1xuXG4vL0FkZCBuZXcgYm9vayB0byBCb29rLmNvbGxlY3Rpb25cbkJvb2suYWRkTmV3ID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICB2YXIgYm9vayA9IG5ldyBCb29rKGVudHJ5KTtcbiAgICBCb29rLmNvbGxlY3Rpb25bZW50cnkuaXNibl0gPSBib29rO1xuICAgIGNvbnNvbGUubG9nKFwiTmV3IGJvb2sgXCIgKyBlbnRyeS50aXRsZSArIFwiIGNyZWF0ZWQuXCIpO1xufTtcblxuXG4vL1ZpZXcgYWxsIGJvb2tzIHN0b3JlZCBpbiBCb29rLmNvbGxlY3Rpb25cbkJvb2sudmlld0FsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2xsZWN0aW9uID0gXCJcIixcbiAgICAgICAgYm9va3MgPSB7fSxcbiAgICAgICAgZW50cnkgPSBcIlwiLFxuICAgICAgICBlbnRyeUxpc3QgPSBbXTtcblxuXG4gICAgdHJ5IHtcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlW1wiYm9va3NcIl0pIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBsb2NhbFN0b3JhZ2VbXCJib29rc1wiXTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVhZGluZyBsb2NhbCBzdG9yYWdlXFxuXCIgKyBlcnJvcik7XG4gICAgfVxuXG5cbiAgICBpZihjb2xsZWN0aW9uKSB7XG4gICAgICAgIGJvb2tzID0gSlNPTi5wYXJzZShjb2xsZWN0aW9uKTtcbiAgICAgICAgZW50cnlMaXN0ID0gT2JqZWN0LmtleXMoYm9va3MpO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbnRyeUxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGVudHJ5ID0gZW50cnlMaXN0W2ldO1xuICAgICAgICAgICAgQm9vay5jb2xsZWN0aW9uW2VudHJ5XSA9IEJvb2suY29udmVydEVudHJpZXMoYm9va3NbZW50cnlMaXN0XSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhlbnRyeUxpc3QubGVuZ3RoICsgXCIgVmlld2luZyBhbGwgYm9va3MuXCIpO1xuICAgIH1cbn07XG5cblxuLy9VcGRhdGUgYSBCb29rXG5Cb29rLmVkaXRCb29rID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICB2YXIgYm9vayA9IEJvb2suY29sbGVjdGlvbltlbnRyeS5pc2JuXSxcbiAgICAgICAgeWVhciA9IHBhcnNlSW50KGVudHJ5LnllYXIpO1xuXG4gICAgaWYoYm9vay50aXRsZSAhPT0gZW50cnkudGl0bGUpIHtcbiAgICAgICAgYm9vay50aXRsZSA9IGVudHJ5LnRpdGxlO1xuICAgIH1cblxuICAgIGlmKGJvb2sueWVhciAhPT0gZW50cnkueWVhcikge1xuICAgICAgICBib29rLnllYXIgPSBlbnRyeS55ZWFyO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwiQm9vayBcIiArIGVudHJ5LmlzYm4gKyBcIiBoYXMgYmVlbiBtb2RpZmllZC5cIik7XG59O1xuXG5cbi8vRGVsZXRlIGEgQm9va1xuQm9vay5kZWxldGVCb29rID0gZnVuY3Rpb24oaXNibikge1xuICAgIGlmKEJvb2suY29sbGVjdGlvbltpc2JuXSkge1xuICAgICAgICBkZWxldGUgQm9vay5jb2xsZWN0aW9uW2lzYm5dO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJvb2sgXCIgKyBpc2JuICsgXCIgaGFzIGJlZW4gZGVsZXRlZC5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGJvb2sgXCIgKyBpc2JuICsgXCIgZG9lcyBub3QgZXhpc3QuXCIpO1xuICAgIH1cbn07XG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUsIGJyb3dzZXI6IHRydWUsIG5vZGU6IHRydWUqL1xuXG52YXIgQm9vayA9IHJlcXVpcmUoXCIuLi9tb2RlbC9ib29rXCIpO1xuXG5tb2R1bGUuZXhwb3J0cy5sb2FkQ29sbGVjdGlvbiA9IHtcbiAgICB2aWV3QWxsQm9va3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvb2tMaXN0ID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiI2Jvb2stbGlzdFwiKSxcbiAgICAgICAgICAgIGVudHJ5ID0gXCJcIixcbiAgICAgICAgICAgIGVudHJ5TGlzdCA9IFtdLFxuICAgICAgICAgICAgbGlzdEl0ZW0gPSB7fTtcblxuICAgICAgICBlbnRyeUxpc3QgPSBPYmplY3Qua2V5cyhCb29rLmNvbGxlY3Rpb24pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW50cnlMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBlbnRyeSA9IGVudHJ5TGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBib29rSW5mbyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoXCI8bGk+PC9saT5cIik7XG4gICAgICAgICAgICB2YXIgYm9va0RldGFpbHMgPSBib29rSW5mby5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICBib29rRGV0YWlscy5jcmVhdGVUZXh0Tm9kZSA9IEJvb2suY29sbGVjdGlvbltlbnRyeV0udGl0bGU7XG4gICAgICAgICAgICBib29rRGV0YWlscy5jcmVhdGVUZXh0Tm9kZSA9IEJvb2suY29sbGVjdGlvbltlbnRyeV0ueWVhcjtcbiAgICAgICAgICAgIGJvb2tEZXRhaWxzLmNyZWF0ZVRleHROb2RlID0gQm9vay5jb2xsZWN0aW9uW2VudHJ5XS5pc2JuO1xuXG4gICAgICAgICAgICBib29rRGV0YWlscy5hcHBlbmRDaGlsZChib29rTGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIEJvb2sudmlld0FsbCgpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLm5ld0VudHJ5ID0ge1xuICAgIGVudHJ5TGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNhdmVFbnRyeSA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIiNzYXZlLWVudHJ5XCIpO1xuICAgICAgICBzYXZlRW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2F2ZUVudHJ5SGFuZGxlciwgZmFsc2UpO1xuXG4gICAgICAgIC8qd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBCb29rLnNhdmVFbnRyeSgpO1xuICAgICAgICB9KTsqL1xuICAgIH0sXG5cbiAgICBzYXZlRW50cnlIYW5kbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbnRyeUZvcm0gPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIjbmV3LWJvb2tcIiksXG4gICAgICAgICAgICBuZXdCb29rID0ge1xuICAgICAgICAgICAgICAgIGlzYm46IGVudHJ5Rm9ybS5pc2JuLnZhbHVlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBlbnRyeUZvcm0udGl0bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgeWVhcjogZW50cnlGb3JtLnllYXIudmFsdWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgQm9vay5zYXZlRW50cnkuY2FsbCh0aGlzLCBuZXdCb29rKTtcbiAgICAgICAgZW50cnlGb3JtLnJlc2V0KCk7XG4gICAgfVxufTsiXX0=

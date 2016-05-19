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

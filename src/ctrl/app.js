/*jshint esnext: true, browser: true, node: true*/
var UICtrl = require("../view/ui-ctrl");

document.addEventListener("load", function() {
    UICtrl.loadCollection.viewAllBooks();
});

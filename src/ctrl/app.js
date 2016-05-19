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

/// <reference path="jquery-1.7.2.js" />
/// <reference path="knockout-2.1.0.js" />

function ToDoViewModel() {
    var self = this;

    function ToDoItem(root, title, finished) {
        var self = this;

        self.title = ko.observable(title);
        self.finished = ko.observable(finished);

        self.remove = function () {
            root.items.remove(self);
        };
    };

    self.addItemTitle = ko.observable("");
    self.items = ko.observableArray([
        new ToDoItem(self, "Spread the word about ASP.NET Web API", false),
        new ToDoItem(self, "Wash the car", false),
        new ToDoItem(self, "Get a haircut", true)
    ]);

    self.add = function () {
        self.items.push(new ToDoItem(self, self.addItemTitle(), false));
        self.addItemTitle("");
    };
};

$(function () {
    var viewModel = new ToDoViewModel();

    ko.applyBindings(viewModel);
});

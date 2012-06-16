/// <reference path="jquery-1.7.2.js" />
/// <reference path="knockout-2.1.0.js" />

function ToDoViewModel() {
    var self = this;

    function ToDoItem(root, id, title, finished) {
        var self = this;

        self.id = id;
        self.title = ko.observable(title);
        self.finished = ko.observable(finished);

        self.remove = function () {
            root.sendDelete(self);
        };

        self.finished.subscribe(function () {
            root.sendUpdate(self);
        });
    };

    self.addItemTitle = ko.observable("");
    self.items = ko.observableArray();

    self.add = function (id, title, finished) {
        self.items.push(new ToDoItem(self, id, title, finished));
    };

    self.remove = function (id) {
        self.items.remove(function (item) { return item.id === id; });
    };

    self.sendCreate = function () {
        $.ajax({
            url: "/api/todo",
            data: { 'Title': self.addItemTitle(), 'Finished': false },
            type: "POST",
            statusCode: {
                201: function (data) {
                    self.add(data.ID, data.Title, data.Finished);
                }
            }
        });

        self.addItemTitle("");
    };

    self.sendDelete = function (item) {
        $.ajax({
            url: "/api/todo/" + item.id,
            type: "DELETE",
            success: function (data) {
                self.remove(item.id);
            }
        });
    }

    self.sendUpdate = function (item) {
        $.ajax({
            url: "/api/todo/" + item.id,
            data: { 'Title': item.title(), 'Finished': item.finished() },
            type: "PUT"
        });
    };
};

$(function () {
    var viewModel = new ToDoViewModel();

    ko.applyBindings(viewModel);

    $.get("/api/todo", function (items) {
        $.each(items, function (idx, item) {
            viewModel.add(item.ID, item.Title, item.Finished);
        });
    }, "json");
});

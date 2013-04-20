define(['durandal/plugins/router', 'services/dataservice'], function (router,dataservice) {
    var bookmarks = ko.observableArray();

    var activate = function () {
        // go get local data, if we have it
        return dataservice.getBookmarksPartials(bookmarks);
    };

    var refresh = function () {
        return dataservice.getBookmarksPartials(bookmarks);
    };

    var bookmarkadd = function () {
        router.navigateTo('#/bookmarkadd');
    };

    var gotoDetails = function (selectedIssue) {
        if (selectedIssue && selectedIssue.id()) {
            var url = '#/bookmarkdetail/' + selectedIssue.id();
            router.navigateTo(url);
        }
    };

    var viewAttached = function (view) {
        bindEventToList(view, '.bookmark-brief', gotoDetails);
    };

    var bindEventToList = function (rootSelector, selector, callback, eventName) {
        var eName = eventName || 'click';
        $(rootSelector).on(eName, selector, function () {
            var issue = ko.dataFor(this);
            callback(issue);
            return false;
        });
    };

    var vm = {
        activate: activate,
        bookmarks: bookmarks,
        title: 'Bookmarks',
        viewAttached: viewAttached,
        bookmarkadd: bookmarkadd,
        refresh: refresh
    };

    return vm;
});
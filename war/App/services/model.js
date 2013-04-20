define(['config', 'durandal/system', 'services/logger'],
    function (config, system, logger) {
    
    var BookmarksPartial = function (dto) {
        // Map to observables and add computeds
        return mapToObservable(dto);
    };

    var Bookmark = function (dto) {
        return mapToObservable(dto);
    };

    var BookmarkItem = function () {
       
        //var self = this;
        this.id = ko.observable();
        this.title = ko.observable();
        this.url = ko.observable();
        this.description = ko.observable();
        return this;
    };

    var model =
    {
        BookmarkItem: BookmarkItem,
        BookmarksPartial: BookmarksPartial,
        Bookmark: Bookmark
    };

    return model;

    //#region Internal Methods
    function mapToObservable(dto) {
        var mapped = {};
        for (prop in dto) {
            if (dto.hasOwnProperty(prop)) {
                mapped[prop] = ko.observable(dto[prop]);
            }
        }
        return mapped;
    };
        
    function log(msg, data, showToast) {
        logger.log(msg, data, system.getModuleId(model), showToast);
    }
    //#endregion
});